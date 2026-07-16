(function () {
  'use strict'

  const app = document.getElementById('app')
  const DATA = window.RELATIONSHIP_STUDIO_DATA
  const STORAGE_KEY = 'relationship-safety-studio-v2'

  const fresh = () => ({
    screen: 'home', moduleId: null, scenarioId: null, step: 1,
    emotions: [], choice: null, insight: null, action: null,
    outcomeOpen: false, completed: []
  })

  let state = load()

  function load () {
    try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')) }
    catch (_) { return fresh() }
  }

  function save () { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
  function set (patch) { state = Object.assign({}, state, patch); save(); render() }
  function getModule (id = state.moduleId) { return DATA.modules.find(item => item.id === id) }
  function getScenario () {
    const module = getModule()
    return module && module.scenarios.find(item => item.id === state.scenarioId)
  }
  function esc (value) {
    const node = document.createElement('span')
    node.textContent = value == null ? '' : String(value)
    return node.innerHTML
  }
  function assetUrl (path) {
    const inlineAssets = window.RELATIONSHIP_STUDIO_ASSETS || {}
    return inlineAssets[path] || path
  }
  function choiceObjects (items) {
    return items.map(([id, icon, title, line, outcome]) => ({ id, icon, title, line, outcome, best: id === 'safe' }))
  }
  function simpleObjects (items) {
    return items.map(([id, text]) => ({ id, text, best: id === 'empathy' || id === 'safe' }))
  }
  function logo (compact = false) {
    return `<button class="brand ${compact ? 'compact' : ''}" data-action="home" aria-label="첫 화면으로">
      <span class="brand-mark">🎬</span><span><b>어울림 관계안전 스튜디오</b><small>마음·관계·안전을 장면으로 연습해요</small></span>
    </button>`
  }
  function credit () {
    return `<div class="credit"><a href="https://mumuclass.kr" target="_blank" rel="noreferrer">mumuclass.kr</a><span>·</span><b>Creator 불곰코끼리</b></div>`
  }

  function home () {
    const total = DATA.modules.reduce((sum, module) => sum + module.scenarios.length, 0)
    const done = state.completed.length
    return `<main class="home-shell" style="--hero-bg:url('${assetUrl('assets/classroom-bg.webp')}')">
      <section class="home-hero">
        <div class="hero-shade"></div>
        <header>${logo()}<div class="hero-actions"><span class="target-chip">초등 3~6학년 · 마음과 안전 연습</span></div></header>
        <div class="hero-copy">
          <span class="take-chip">관계안전 장면 연습소</span>
          <h1>마음을 읽고, 관계를 바꾸고,<br><em>안전을 선택하는 감독관</em>이 되어 보세요.</h1>
          <p>갈등을 무조건 참거나 혼자 해결하는 연습이 아니에요. 감정을 알아차리고, 위험 신호를 구별하고, 필요할 때 함께 도움을 요청하는 힘을 길러요.</p>
          <div class="value-row"><span>💛 공감</span><span>👂 의사소통</span><span>🛟 감정조절</span><span>🔎 인식·대처</span><span>🦸 방어 행동</span></div>
        </div>
        <div class="passport-mini"><span>나의 관계안전 여권</span><b>${done}<small> / ${total} 장면</small></b><i><em style="width:${Math.round(done / total * 100)}%"></em></i></div>
      </section>

      <section class="home-content">
        <div class="section-heading"><div><span>4개의 학습관</span><h2>오늘 연습할 힘을 골라요</h2><p>모든 장면을 자유롭게 선택하고, 카드의 추천 학년 표시는 참고로 활용해요.</p></div></div>
        <div class="module-grid">${DATA.modules.map(moduleCard).join('')}</div>
        <section class="learning-path">
          <div><span>1</span><b>장면을 봐요</b><small>표정과 상황 관찰</small></div><i>→</i>
          <div><span>2</span><b>마음을 찾아요</b><small>감정·몸·관계 신호</small></div><i>→</i>
          <div><span>3</span><b>선택 결과를 봐요</b><small>말과 행동의 영향 확인</small></div><i>→</i>
          <div><span>4</span><b>안전을 연습해요</b><small>존중·도움 행동</small></div>
        </section>
      </section>
      <footer class="site-footer"><p><b>기억해요.</b> 멈춰 달라고 했는데 계속되거나 무서운 상황은 혼자 해결하지 않아도 돼요.</p>${credit()}</footer>
    </main>`
  }

  function moduleCard (module) {
    const completed = module.scenarios.filter(s => state.completed.includes(`${module.id}:${s.id}`)).length
    const thumbs = module.scenarios.slice(0, 3).map((s, index) => `<img src="${assetUrl(s.before)}" alt="" style="--n:${index}">`).join('')
    return `<article class="module-card" style="--module:${module.color};--pale:${module.pale}">
      <div class="module-mosaic">${thumbs}<span>${module.order}관</span></div>
      <div class="module-card-body"><div class="module-icon">${module.icon}</div><span>${module.eyebrow}</span><h3>${module.title}</h3><p>${module.short}</p>
        <div class="competency-chips">${module.competencies.map(c => `<small>${c}</small>`).join('')}</div>
        <div class="module-meta"><b>${module.scenarios.length}<small>개 장면</small></b><span>완료 ${completed}/${module.scenarios.length}</span></div>
        <div class="module-buttons"><button data-action="open-module" data-id="${module.id}">학습관 들어가기 <b>→</b></button></div>
      </div>
    </article>`
  }

  function moduleLobby () {
    const module = getModule()
    return `<main class="lobby-shell" style="--module:${module.color};--pale:${module.pale}">
      <header class="topbar">${logo(true)}<button class="top-home" data-action="home">전체 학습관</button></header>
      <section class="lobby-hero"><span class="big-icon">${module.icon}</span><div><small>${module.order}관 · ${module.eyebrow}</small><h1>${module.title}</h1><p>${module.short}</p><div class="competency-chips large">${module.competencies.map(c => `<span>${c}</span>`).join('')}</div></div></section>
      <section class="scenario-section"><div class="section-heading"><div><span>SCENE SELECT</span><h2>연습할 장면을 골라요</h2><p>실제 경험을 말하지 않아도 괜찮아요. 이야기 속 인물의 선택을 함께 살펴봅니다.</p></div><button class="back-link" data-action="home">← 다른 학습관 보기</button></div>
        <div class="scenario-grid">${module.scenarios.map(s => scenarioCard(module, s)).join('')}</div>
      </section>
      <footer class="site-footer compact-footer"><p><b>안전 원칙</b> 위험하거나 반복되는 상황에서는 직접 맞서기보다 안전한 곳과 믿을 수 있는 어른을 찾아요.</p>${credit()}</footer>
    </main>`
  }

  function scenarioCard (module, scenario) {
    const done = state.completed.includes(`${module.id}:${scenario.id}`)
    return `<button class="scenario-card" data-action="scenario" data-id="${scenario.id}">
      <span class="scenario-image"><img src="${assetUrl(scenario.before)}" alt="${esc(scenario.title)} 장면"><em>${scenario.grade}학년 추천</em>${done ? '<i>✓ 완료</i>' : ''}</span>
      <span class="scenario-copy"><small>${scenario.place}</small><b>${scenario.icon} ${scenario.title}</b><p>${scenario.summary}</p><strong>${done ? '다시 연습하기' : '장면 시작하기'} →</strong></span>
    </button>`
  }

  function practice () {
    const module = getModule(); const scenario = getScenario()
    const body = [emotionStep, choiceStep, insightStep, actionStep][state.step - 1](module, scenario)
    return `<main class="practice-shell" style="--module:${module.color};--pale:${module.pale}">
      <header class="topbar practice-top">${logo(true)}${stepProgress(module)}<button class="top-home" data-action="back-module">장면 선택</button></header>
      <div class="practice-layout"><div class="practice-main">${sceneStage(module, scenario)}${body}</div>${coachPanel(module, scenario)}</div>
      ${outcomeModal(module, scenario)}
    </main>`
  }

  function stepProgress (module) {
    const labels = module.id === 'dialogue' ? ['마음 찾기','말 선택','입장 보기','안전한 대사']
      : module.id === 'pause' ? ['몸의 신호','멈춤 선택','생각 바꾸기','안전 계획']
        : module.id === 'signals' ? ['신호 찾기','대처 선택','위험 구별','도움 요청']
          : ['장면 살피기','도움 선택','친구 마음','방어 행동']
    return `<div class="step-progress">${labels.map((label, index) => `<div class="${state.step === index + 1 ? 'now' : ''} ${state.step > index + 1 ? 'done' : ''}"><b>${state.step > index + 1 ? '✓' : index + 1}</b><span>${label}</span></div>${index < 3 ? '<i></i>' : ''}`).join('')}</div>`
  }

  function sceneStage (module, scenario) {
    return `<section class="scene-stage"><img src="${assetUrl(scenario.before)}" alt="${esc(scenario.title)} 상황 장면"><div class="stage-gradient"></div><span class="scene-label">SCENE · ${scenario.place}</span>
      <div class="stage-caption"><small>${scenario.grade}학년 추천</small><h1>${scenario.icon} ${scenario.title}</h1><p>${scenario.summary}</p></div>
      <div class="dialogue-stack">${scenario.lines.map(([name,line]) => `<article><small>${name}</small><b>“${line}”</b></article>`).join('')}</div>
    </section>`
  }

  function taskHead (number, title, text, aside = '') {
    return `<div class="task-head"><span>STEP ${number}</span><div><h2>${title}</h2><p>${text}</p></div>${aside}</div>`
  }
  function taskActions (canNext, nextLabel, last = false) {
    return `<div class="task-actions"><button class="back-button" data-action="step-back">← 이전</button><button class="next-button" data-action="${last ? 'finish' : 'step-next'}" ${canNext ? '' : 'disabled'}>${nextLabel} <b>→</b></button></div>`
  }
  function emotionStep (module, scenario) {
    const nextLabels = {
      dialogue: '말과 표현 살펴보기',
      pause: '다음 행동 살펴보기',
      signals: '대처 방법 살펴보기',
      defender: '도움 방법 살펴보기'
    }
    return `<section class="task-panel">${taskHead(1, module.id === 'pause' ? '몸과 마음이 보내는 신호를 찾아요' : '이 장면에서 보이는 마음과 신호를 찾아요', '정답은 하나가 아니에요. 장면에서 근거를 찾으며 두 개 이상 골라 보세요.', `<b class="count">${state.emotions.length}/2+</b>`)}
      <div class="emotion-grid">${scenario.emotions.map((item, i) => `<button data-action="emotion" data-id="${esc(item)}" class="${state.emotions.includes(item) ? 'selected' : ''}"><span>${['💛','💭','👀','🫶','🧭','💡'][i]}</span><b>${item}</b><i>${state.emotions.includes(item) ? '✓' : '+'}</i></button>`).join('')}</div>
      <div class="learning-tip"><span>🎯</span><p><b>관찰 힌트</b> 인물의 표정뿐 아니라 반복 여부, 주변 친구, 말 뒤에 숨은 바람도 함께 살펴보세요.</p></div>
      ${taskActions(state.emotions.length >= 2, nextLabels[module.id])}
    </section>`
  }
  function choiceStep (module, scenario) {
    const choices = choiceObjects(scenario.choices)
    const copy = {
      dialogue: ['어떤 말로 표현할까요?', '말투와 표현을 고른 뒤, 친구의 마음과 관계가 어떻게 달라지는지 살펴보세요.'],
      pause: ['화가 커질 때 어떻게 행동할까요?', '몸과 말이 다치지 않도록 잠깐 멈춘 뒤 선택할 행동을 살펴보세요.'],
      signals: ['이 관계 신호에 어떻게 대처할까요?', '혼자 참거나 맞서기보다 안전과 도움을 연결하는 방법을 살펴보세요.'],
      defender: ['옆에서 본 나는 어떻게 도울까요?', '직접 맞서지 않아도 괜찮아요. 친구의 마음과 안전을 지키는 방법을 살펴보세요.']
    }[module.id]
    return `<section class="task-panel">${taskHead(2, copy[0], copy[1])}
      <div class="choice-grid">${choices.map((item, index) => `<button data-action="choice" data-id="${item.id}" class="choice-card ${state.choice === item.id ? 'selected' : ''}"><span>${index + 1}</span><small>선택 ${index + 1}</small><b>“${item.line}”</b><i>${state.choice === item.id ? '확인함' : '결과 보기'}</i></button>`).join('')}</div>
      ${state.choice ? `<div class="selected-note"><b>${choices.find(c => c.id === state.choice).icon} 선택 결과를 확인했어요. 다른 선택도 눌러 비교할 수 있어요.</b><button data-action="reopen-outcome">결과 다시 보기</button></div>` : ''}
      ${taskActions(Boolean(state.choice), '인물의 입장 살펴보기')}
    </section>`
  }
  function insightStep (module, scenario) {
    const insights = simpleObjects(scenario.insights)
    const selected = insights.find(item => item.id === state.insight)
    return `<section class="task-panel">${taskHead(3, module.id === 'defender' ? '옆 친구가 할 수 있는 일을 생각해요' : '행동 뒤의 마음과 위험을 살펴요', '겉으로 보이는 행동만 단정하지 않고, 안전에 도움이 되는 생각을 골라 보세요.')}
      <div class="insight-scene"><span>${module.icon}</span><div><small>감독관의 관찰</small><b>${scenario.lesson}</b></div></div>
      <div class="insight-list">${insights.map((item, index) => `<button data-action="insight" data-id="${item.id}" class="${state.insight === item.id ? 'selected' : ''}"><span>${index + 1}</span><b>${item.text}</b><i>${state.insight === item.id ? '선택됨' : '선택'}</i></button>`).join('')}</div>
      ${selected && !selected.best ? '<p class="try-note">이 생각만으로는 마음과 안전을 충분히 살피기 어려워요. 다른 생각을 한 번 더 찾아보세요.</p>' : ''}
      ${selected && selected.best ? '<p class="try-note success">좋아요! 행동만 단정하지 않고 다른 사람의 마음과 안전까지 함께 살폈어요.</p>' : ''}
      ${taskActions(Boolean(selected && selected.best), '안전한 다음 행동 만들기')}
    </section>`
  }
  function actionStep (module, scenario) {
    const actions = simpleObjects(scenario.actions)
    const selected = actions.find(item => item.id === state.action)
    return `<section class="task-panel">${taskHead(4, '나와 친구를 지키는 다음 행동을 골라요', '화해를 강요하거나 혼자 참지 않아요. 가장 안전하고 존중하는 행동을 찾아보세요.')}
      <div class="action-list">${actions.map((item, index) => `<button data-action="action" data-id="${item.id}" class="${state.action === item.id ? 'selected' : ''}"><span>${index + 1}</span><div><small>행동 ${index + 1}</small><b>${item.text}</b></div><i>${state.action === item.id ? '선택됨' : '선택'}</i></button>`).join('')}</div>
      ${selected && !selected.best ? '<p class="try-note danger">이 행동은 마음이나 안전을 더 다치게 할 수 있어요. 도움을 연결하는 선택을 다시 찾아보세요.</p>' : ''}
      ${selected && selected.best ? `<div class="safe-line"><span>${module.icon}</span><div><small>이제 연습할 한마디</small><b>“${scenario.safeLine}”</b></div></div>` : ''}
      ${taskActions(Boolean(selected && selected.best), '나의 관계안전 장면 완성', true)}
    </section>`
  }

  function coachPanel (module, scenario) {
    const flow = module.id === 'dialogue' ? ['상황 말하기','감정 말하기','바람 부탁하기']
      : module.id === 'pause' ? ['몸의 신호','잠깐 멈춤','거리·도움']
        : module.id === 'signals' ? ['반복·강요 확인','안전한 거리','사실 알리기']
          : ['친구에게 묻기','곁에 있기','함께 알리기']
    return `<aside class="coach-panel"><div class="coach-top"><span>${module.icon}</span><small>${module.competencies.join(' · ')}</small><h3>${module.title} 코치</h3><p>${scenario.lesson}</p></div>
      <div class="flow-card"><b>오늘의 안전 흐름</b>${flow.map((item,index) => `<div><span>${index + 1}</span><p>${item}</p></div>`).join('')}</div>
      <div class="safety-card"><b>🛟 꼭 기억해요</b><p>무섭거나 반복되는 행동, 강요, 여러 명의 괴롭힘, 온라인 확산은 혼자 해결하지 않아도 돼요.</p></div>
    </aside>`
  }

  function outcomeModal (module, scenario) {
    if (!state.outcomeOpen || !state.choice) return ''
    const item = choiceObjects(scenario.choices).find(c => c.id === state.choice)
    const image = item.best ? scenario.after : scenario.before
    const memoryTags = item.best ? ['잠깐 멈춤', '마음 존중', '도움 연결'] : ['결과 살피기', '마음 확인', '다시 선택']
    const memoryLine = item.best ? scenario.safeLine : '잠깐 멈추고, 이 선택 뒤에 남는 마음과 문제를 다시 살펴봐요.'
    return `<div class="modal-backdrop" data-action="close-outcome" role="presentation"><section class="outcome-modal ${item.id}" role="dialog" aria-modal="true" aria-label="선택 결과"><button class="modal-x" data-action="close-outcome" aria-label="닫기">×</button>
      <div class="outcome-art"><img src="${assetUrl(image)}" alt="${esc(item.title)}의 결과 장면"><span>${item.best ? '안전한 결과' : '다시 생각할 결과'}</span><b>표정 · 몸의 거리 · 주변 도움을 그림에서 찾아보세요</b></div>
      <div class="outcome-copy"><small>${item.icon} ${item.title}</small><h2>${item.outcome}</h2><p>${item.best ? '마음을 존중하면서 안전한 도움과 해결의 길을 열었어요.' : '이 선택 뒤에는 어떤 마음과 문제가 남는지 살펴보세요. 다시 선택해도 괜찮아요.'}</p>
        <div class="memory-block"><small>🧠 머리에 쏙! 기억 문장</small><strong>“${memoryLine}”</strong><div>${memoryTags.map(tag => `<span>${tag}</span>`).join('')}</div></div>
        <button data-action="close-outcome">다른 선택도 살펴보기</button></div>
    </section></div>`
  }

  function result () {
    const module = getModule(); const scenario = getScenario()
    return `<main class="result-shell" style="--module:${module.color};--pale:${module.pale}">
      <header class="topbar">${logo(true)}<div><button class="top-ghost" data-action="print">나의 약속 인쇄</button><button class="top-home" data-action="back-module">다른 장면</button></div></header>
      <section class="result-paper"><div class="result-heading"><span>${module.icon} ${module.title} · DIRECTOR'S CUT</span><h1>관계와 안전의 결말을 바꿨어요!</h1><p>${scenario.lesson}</p></div>
        <div class="compare-scenes"><article><span>처음 장면</span><img src="${assetUrl(scenario.before)}" alt="처음 ${esc(scenario.title)} 장면"><div>${scenario.lines.map(line => `<p>“${line[1]}”</p>`).join('')}</div></article><div class="result-arrow"><b>🎬</b><span>다시<br>연출하기</span><i>→</i></div><article class="safe-result"><span>안전한 결말</span><img src="${assetUrl(scenario.after)}" alt="안전하게 바뀐 ${esc(scenario.title)} 결말"><div><p>“${scenario.safeLine}”</p></div></article></div>
        <div class="earned-badges">${module.competencies.map((item,index) => `<article><span>${['💛','🛟','🤝'][index]}</span><div><small>어울림 역량</small><b>${item}</b></div></article>`).join('')}<article><span>🦸</span><div><small>안전한 선택</small><b>도움을 연결했어요</b></div></article></div>
        <div class="promise-card"><span>${module.icon}</span><div><small>나의 관계안전 약속</small><p>감정을 알아차리고, 상대를 존중하며, 혼자 해결하기 어려운 상황에서는 <b>믿을 수 있는 어른과 함께 안전한 도움을 찾겠습니다.</b></p><i></i><em>어울림 관계안전 감독관 서명</em></div></div>
        <div class="result-buttons"><button data-action="home">4개 학습관으로</button><button class="primary" data-action="back-module">${module.title} 다른 장면 →</button></div>
      </section>
      <footer class="site-footer compact-footer"><p><b>잘했어요!</b> 좋은 선택은 한 번의 정답이 아니라 반복해서 연습하는 힘이에요.</p>${credit()}</footer>
    </main>`
  }

  function render () {
    app.innerHTML = state.screen === 'home' ? home() : state.screen === 'module' ? moduleLobby() : state.screen === 'practice' ? practice() : result()
    document.body.classList.toggle('modal-open', Boolean(state.outcomeOpen))
  }

  app.addEventListener('click', event => {
    const target = event.target.closest('[data-action]')
    if (!target) return
    const action = target.dataset.action; const id = target.dataset.id
    if (action === 'home') return set({ screen:'home', moduleId:null, scenarioId:null, step:1, outcomeOpen:false })
    if (action === 'open-module') return set({ screen:'module', moduleId:id, scenarioId:null })
    if (action === 'scenario') return set({ screen:'practice', scenarioId:id, step:1, emotions:[], choice:null, insight:null, action:null, outcomeOpen:false })
    if (action === 'back-module') return set({ screen:'module', step:1, outcomeOpen:false })
    if (action === 'emotion') {
      const values = state.emotions.includes(id) ? state.emotions.filter(item => item !== id) : state.emotions.concat(id)
      return set({ emotions:values })
    }
    if (action === 'choice') return set({ choice:id, outcomeOpen:true })
    if (action === 'reopen-outcome') return set({ outcomeOpen:true })
    if (action === 'close-outcome') {
      if (event.target === target || target.classList.contains('modal-x')) return set({ outcomeOpen:false })
      return
    }
    if (action === 'insight') return set({ insight:id })
    if (action === 'action') return set({ action:id })
    if (action === 'step-back') return set({ step:Math.max(1, state.step - 1), outcomeOpen:false })
    if (action === 'step-next') return set({ step:Math.min(4, state.step + 1), outcomeOpen:false })
    if (action === 'finish') {
      const key = `${state.moduleId}:${state.scenarioId}`
      const completed = state.completed.includes(key) ? state.completed : state.completed.concat(key)
      return set({ screen:'result', completed, outcomeOpen:false })
    }
    if (action === 'print') window.print()
  })

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && state.outcomeOpen) set({ outcomeOpen:false })
  })

  render()
})()

