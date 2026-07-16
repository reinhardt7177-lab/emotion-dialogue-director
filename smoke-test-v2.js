/* eslint-disable no-console */
'use strict'

const path = require('path')
const fs = require('fs')
const root = __dirname
const storage = new Map()
let appHtml = ''
let clickHandler = null

global.window = {}
global.localStorage = {
  getItem: key => storage.get(key) || null,
  setItem: (key, value) => storage.set(key, value)
}
global.document = {
  body: { classList: { toggle: () => {} } },
  getElementById: () => ({
    set innerHTML (value) { appHtml = value },
    get innerHTML () { return appHtml },
    addEventListener: (type, handler) => { if (type === 'click') clickHandler = handler }
  }),
  createElement: () => {
    let value = ''
    return {
      set textContent (text) { value = String(text) },
      get innerHTML () { return value.replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]) }
    }
  },
  addEventListener: () => {}
}

require(path.join(root, 'data-v2.js'))
global.RELATIONSHIP_STUDIO_DATA = global.window.RELATIONSHIP_STUDIO_DATA
require(path.join(root, 'app-v2.js'))

function click (action, id) {
  const target = { dataset: { action, id }, classList: { contains: name => name === 'modal-x' }, closest: () => target }
  clickHandler({ target })
}

function expectText (text, stage) {
  if (!appHtml.includes(text)) throw new Error(`${stage}: 화면에서 '${text}'을 찾지 못했습니다.`)
}

function expectNoText (text, stage) {
  if (appHtml.includes(text)) throw new Error(`${stage}: 화면에 아직 나오면 안 되는 '${text}'이 표시됐습니다.`)
}

expectText('어울림 관계안전 스튜디오', '첫 화면')
expectText('관계 신호 탐정', '첫 화면')
click('open-module', 'signals')
expectText('도움이 필요한 신호를 찾아요', '학습관')
click('scenario', 'repeat-tease')
expectText('그림을 계속 놀려요', '장면 시작')
click('emotion', '반복됨')
click('emotion', '여럿이 한 명을 향함')
expectText('대처 방법 살펴보기', '감정 선택 단계')
expectNoText('결말', '감정 선택 단계')
click('step-next')
expectText('이 관계 신호에 어떻게 대처할까요?', '2단계')
expectText('선택 1', '2단계')
expectNoText('그림 찢기', '선택 전 분류 숨김')
expectNoText('서윤이의 마음과 작품이 더 다쳐요.', '선택 전 결과 숨김')
expectNoText('혼자가 아니며 어른의 보호가 시작돼요.', '선택 전 안전 답 숨김')
click('choice', 'safe')
expectText('안전한 결과', '선택 결과 팝업')
expectText('신호를 알리기', '선택 뒤 분류 공개')
expectText('혼자가 아니며 어른의 보호가 시작돼요.', '선택 뒤 결과 공개')
click('close-outcome')
click('step-next')
click('insight', 'blame')
expectText('마음과 안전을 충분히 살피기 어려워요', '잘못된 생각 피드백')
expectText('data-action="step-next" disabled', '잘못된 생각은 다음 단계 잠금')
click('insight', 'empathy')
expectText('마음과 안전까지 함께 살폈어요', '안전한 생각 피드백')
click('step-next')
expectNoText('연습할 한마디', '행동 선택 전 정답 문장 숨김')
click('action', 'attack')
expectText('마음이나 안전을 더 다치게 할 수 있어요', '안전하지 않은 행동 피드백')
expectNoText('연습할 한마디', '안전하지 않은 행동 뒤 정답 문장 숨김')
click('action', 'safe')
expectText('이제 연습할 한마디', '안전한 행동 뒤 연습 문장 공개')
click('finish')
expectText('관계와 안전의 결말을 바꿨어요!', '결과 화면')
expectText('나의 관계안전 약속', '결과 화면')

const data = global.window.RELATIONSHIP_STUDIO_DATA
const scenarioCount = data.modules.reduce((sum, module) => sum + module.scenarios.length, 0)
for (const module of data.modules.filter(item => item.id !== 'signals')) {
  const scenario = module.scenarios[0]
  click('home')
  click('open-module', module.id)
  click('scenario', scenario.id)
  click('emotion', scenario.emotions[0])
  click('emotion', scenario.emotions[1])
  click('step-next')
  click('choice', 'safe')
  click('close-outcome')
  click('step-next')
  click('insight', 'empathy')
  click('step-next')
  click('action', 'safe')
  click('finish')
  expectText('관계와 안전의 결말을 바꿨어요!', `${module.title} 결과 화면`)
}
for (const module of data.modules) {
  for (const scenario of module.scenarios) {
    for (const asset of [scenario.before, scenario.after]) {
      const absolute = path.resolve(root, asset)
      if (!fs.existsSync(absolute)) throw new Error(`누락된 이미지: ${asset}`)
    }
  }
}
console.log(`PASS: 4개 학습관, ${scenarioCount}개 장면, 처음→팝업→결과 흐름 정상`)

