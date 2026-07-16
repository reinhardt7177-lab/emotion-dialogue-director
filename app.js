(function () {
  'use strict'

  const app = document.getElementById('app')

  const scenarios = [
    {
      id:'pencils', title:'쏟아진 색연필', place:'미술 시간', scene:'scene-1', icon:'✏️',
      summary:'준호가 실수로 서윤이의 색연필 통을 넘어뜨렸어요.',
      first:'아, 내 색연필! 조심 좀 하지!', other:'일부러 그런 것도 아닌데 왜 화내?',
      girlFeeling:'속상함', boyFeeling:'당황함', need:'내 물건을 소중히 다뤄 주길', request:'다음에는 먼저 미안하다고 말해 주길',
      calm:'색연필이 쏟아져서 속상했어. 함께 주워 줄래?', reply:'미안해. 많이 놀랐지? 내가 같이 주울게.',
      lesson:'실수한 사람의 마음과 피해를 본 사람의 마음을 함께 살펴요.'
    },
    {
      id:'lunch', title:'혼자 먹는 점심', place:'급식 시간', scene:'scene-2', icon:'🍱',
      summary:'서윤이는 친구들 대화에 끼지 못해 혼자라고 느꼈어요.',
      first:'너희끼리만 얘기하고, 정말 너무해!', other:'네가 아무 말도 안 했잖아.',
      girlFeeling:'외로움', boyFeeling:'어리둥절함', need:'친구들과 함께하고 싶은 마음', request:'대화에 함께할 수 있게 물어봐 주길',
      calm:'나도 같이 이야기하고 싶었는데 혼자인 것 같아 서운했어.', reply:'그랬구나. 미처 몰랐어. 우리 옆에 앉아서 같이 이야기하자.',
      lesson:'겉으로 조용해 보여도 속으로는 함께하고 싶을 수 있어요.'
    },
    {
      id:'ball', title:'공은 누구 차례?', place:'점심시간 운동장', scene:'scene-3', icon:'🏀',
      summary:'공놀이 차례를 두고 준호와 서윤이의 생각이 달라졌어요.',
      first:'내가 먼저 잡았으니까 내 차례야!', other:'아니야, 아까도 네가 했잖아!',
      girlFeeling:'억울함', boyFeeling:'답답함', need:'공평한 차례', request:'순서를 함께 정해 주길',
      calm:'나도 기다렸는데 또 못 할까 봐 억울했어. 순서를 정할까?', reply:'네가 오래 기다렸구나. 번갈아 한 번씩 하자.',
      lesson:'서로의 기억이 다를 때는 규칙을 함께 정하면 갈등이 줄어요.'
    },
    {
      id:'group', title:'내 의견도 들어 줘', place:'모둠 활동 시간', scene:'scene-4', icon:'🖍️',
      summary:'친구들이 내 생각을 묻지 않고 포스터를 정하기 시작했어요.',
      first:'내 의견은 아무도 안 들어 줘!', other:'우리는 그냥 빨리 정하려고 했어.',
      girlFeeling:'서운함', boyFeeling:'당황', need:'내 생각을 말하고 존중받기', request:'포스터를 정하기 전에 내 생각도 들어 주길',
      calm:'내 의견도 말해 보고 싶었는데, 묻지 않고 정하니 서운했어. 내 그림도 같이 볼래?', reply:'미안해. 우리는 급하다고 생각했어. 네 생각도 듣고 같이 정하자.',
      lesson:'모둠에서는 빨리 정하는 것보다 모두의 생각을 듣는 것이 더 중요해요.'
    },
    {
      id:'promise', title:'약속을 잊은 친구', place:'도서관 짝 활동', scene:'scene-5', icon:'📚',
      summary:'함께 하기로 한 짝 활동 시간에 친구가 오지 않아 혼자 기다렸어요.',
      first:'약속했는데 왜 안 왔어? 나만 기다렸잖아!', other:'미안해. 내가 시간을 깜빡했어.',
      girlFeeling:'실망', boyFeeling:'미안함', need:'약속을 지키고 서로 알려 주기', request:'늦거나 못 올 때 먼저 알려 주길',
      calm:'혼자 기다리니 실망했고 걱정됐어. 다음에는 늦으면 먼저 알려 줄 수 있을까?', reply:'정말 미안해. 다음부터는 꼭 알려 줄게. 지금부터 같이 할까?',
      lesson:'약속을 잊었을 때는 변명보다 사과와 다시 지킬 방법을 함께 정해요.'
    }
  ]

  const responseOptions = [
    {id:'attack', badge:'불꽃 말투', icon:'🔥', tone:'attack', line:'됐어! 너랑 다시는 안 놀아!', impact:-2, result:'마음의 문이 더 닫혀요', ending:'말이 더 날카로워진 결말', explain:'상대를 탓하거나 관계를 끊는 말은 문제보다 상처를 크게 만들어요.'},
    {id:'avoid', badge:'꾹 참는 말투', icon:'🌫️', tone:'avoid', line:'아무것도 아니야. 그냥 됐어.', impact:0, result:'감정이 마음속에 남아요', ending:'마음이 남아 있는 결말', explain:'참기만 하면 내 마음과 필요한 도움이 상대에게 전달되지 않아요.'},
    {id:'i-message', badge:'마음 전달 말투', icon:'🌱', tone:'empathy', line:'무슨 일이 있었는지 말하고, 내 마음도 차분히 전할래.', impact:3, result:'서로의 마음을 들을 준비가 돼요', ending:'함께 정리하는 결말', explain:'상대를 탓하지 않고 상황·감정·바람을 말하면 대화를 이어 갈 수 있어요.'}
  ]

  const emotions = [
    ['😠','화남'],['😢','속상함'],['😟','걱정'],['😳','당황'],['😔','외로움'],['😣','억울함'],['🥺','서운함'],['😞','실망'],['🙏','미안함'],['😕','어리둥절함']
  ]

  const controlScenarios = [
    {icon:'🍽️',title:'줄이 끼어들어 화가 나요',place:'급식 줄',image:'scene-promise.webp'},
    {icon:'🖍️',title:'놀리는 말이 계속돼요',place:'쉬는 시간 교실',image:'scene-group.webp'},
    {icon:'🏀',title:'놀이에서 져서 화가 나요',place:'점심시간 운동장',image:'scene-ball.webp'}
  ]

  let state = load()
  function fresh(){return {screen:'intro',scenario:0,selfScenario:0,step:1,selectedEmotions:[],response:null,endingOpen:false,perspective:null,feeling:'',need:'',request:''}}
  function load(){try{return Object.assign(fresh(),JSON.parse(localStorage.getItem('emotion-director-v1')||'{}'))}catch(_){return fresh()}}
  function save(){localStorage.setItem('emotion-director-v1',JSON.stringify(state))}
  function set(patch){state=Object.assign({},state,patch);save();render()}
  function sc(){return scenarios[state.scenario]}
  function esc(value){const s=document.createElement('span');s.textContent=value||'';return s.innerHTML}

  function logo(){return `<div class="logo"><span>🎬</span><div><b>감정 대화 감독관</b><small>말 한마디로 장면을 바꿔요</small></div></div>`}

  function selfControlCard(){
    return `<div class="director-card control-card"><div class="clapper"><span>SCENE</span><b>자기조절 연습</b><i></i></div><h2>마음을 멈출 장면을 골라요</h2><div class="scene-select">${controlScenarios.map((s,i)=>`<button data-control-scenario="${i}" class="scene-option ${state.selfScenario===i?'selected':''}"><span class="scene-thumb control-thumb" style="background-image:url('../self-control-practice/assets/${s.image}')"></span><div><b>${s.icon} ${s.title}</b><small>${s.place}</small></div><i>${state.selfScenario===i?'✓':'→'}</i></button>`).join('')}</div><div class="control-focus"><b>어울림 연결</b><span>감정조절 · 의사소통 · 안전한 대처</span></div><a class="start control-start" href="../self-control-practice/index.html?scenario=${state.selfScenario}"><span>선택한 자기조절 연습하기</span><b>▶</b></a></div>`
  }

  function intro(){
    return `<main class="intro"><div class="intro-shade"></div><header>${logo()}<span class="curriculum">국어 × 인성교육 · 초등학교 3~6학년</span></header><section class="intro-content"><div class="intro-copy"><span class="take-chip">TAKE 1 · 마음을 읽는 연습</span><h1>갈등 장면의<br><em>대사를 다시 써 주세요!</em></h1><p>같은 상황도 어떤 말투를 고르느냐에 따라 결말이 달라져요. 감정을 알아차리고, 상대의 입장을 상상하고, 마음을 다치지 않게 전하는 감독이 되어 보세요.</p><div class="virtue-row"><span>💛 공감</span><span>👂 경청</span><span>🤝 존중</span><span>🌱 책임</span></div></div><div class="practice-cards"><div class="director-card dialogue-card"><div class="clapper"><span>SCENE</span><b>감정 대화 연습</b><i></i></div><h2>연출할 장면을 골라요</h2><div class="scene-select">${scenarios.map((s,i)=>`<button data-scenario="${i}" class="scene-option ${state.scenario===i?'selected':''}"><span class="scene-thumb ${s.scene}"></span><div><b>${s.icon} ${s.title}</b><small>${s.place}</small></div><i>${state.scenario===i?'✓':'→'}</i></button>`).join('')}</div><button id="start" class="start"><span>선택한 장면 연출하기</span><b>▶</b></button></div>${selfControlCard()}</div></section><footer class="intro-footer"><article><b>1</b><span>감정 포착</span></article><i>—</i><article><b>2</b><span>말투 비교</span></article><i>—</i><article><b>3</b><span>입장 바꾸기</span></article><i>—</i><article><b>4</b><span>화해 장면 완성</span></article><div class="site-credit"><a href="https://mumuclass.kr" target="_blank" rel="noreferrer">mumuclass.kr</a><span>·</span><b>Creator 불곰코끼리</b></div></footer></main>`
  }

  function progress(){return `<div class="progress">${[['1','감정 포착'],['2','말투 선택'],['3','입장 바꾸기'],['4','대사 완성']].map(([n,label],i)=>`<div class="${state.step>i?'active':''} ${state.step===i+1?'current':''}"><b>${state.step>i+1?'✓':n}</b><span>${label}</span></div>${i<3?'<i></i>':''}`).join('')}</div>`}

  function sceneStage(){
    const s=sc()
    return `<section class="stage"><div class="stage-scene ${s.scene}"><span class="scene-label">SCENE ${state.scenario+1} · ${s.place}</span><div class="scene-caption"><b>${s.title}</b><p>${s.summary}</p></div></div><div class="dialogue before"><div class="portrait girl-upset"></div><div class="bubble"><small>서윤</small><p>“${s.first}”</p></div></div><div class="dialogue right before"><div class="bubble"><small>준호</small><p>“${s.other}”</p></div><div class="portrait boy-upset"></div></div></section>`
  }

  function sideGuide(){
    const tips=[
      ['감정은 정답이 하나가 아니에요','표정, 몸짓, 상황을 함께 살펴보세요.'],
      ['말의 느낌을 비교해요','같은 마음도 공격·회피·마음 전달로 다르게 표현돼요.'],
      ['마음속 이유를 상상해요','행동에 동의하지 않아도 감정은 이해할 수 있어요.'],
      ['관찰-감정-바람 순서','“네가 문제야” 대신 내 경험을 구체적으로 말해요.']
    ]
    const t=tips[state.step-1]
    return `<aside class="guide"><div class="guide-avatar portrait girl-calm"></div><span class="guide-role">마음 연출 코치 · 하람 선생님</span><h3>${t[0]}</h3><p>${t[1]}</p><div class="director-note"><b>🎥 감독의 질문</b><p>${state.step===1?'두 친구의 얼굴과 몸은 어떤 마음을 말하고 있나요?':state.step===2?'이 말을 들은 상대의 마음은 어떻게 달라질까요?':state.step===3?'상대는 왜 그렇게 행동했을까요?':"내 마음을 솔직하지만 다정하게 전하려면?"}</p></div><div class="value-card"><span>오늘의 인성 키워드</span><b>${state.step===1?'자기이해':state.step===2?'존중':state.step===3?'공감':'책임 있는 표현'}</b></div></aside>`
  }

  function stepOne(){
    const s=sc()
    return `<div class="task"><div class="task-head"><span>STEP 1</span><div><h2>장면 속 감정을 포착해요</h2><p>장면에 나온 친구들이 느낄 것 같은 감정을 2개 이상 골라 보세요.</p></div><b>${state.selectedEmotions.length}/2+</b></div><div class="emotion-grid">${emotions.map(([icon,label])=>`<button data-emotion="${label}" class="${state.selectedEmotions.includes(label)?'selected':''}"><span>${icon}</span><b>${label}</b></button>`).join('')}</div><div class="emotion-hint"><span>💡</span><p><b>감정 아래에는 바람이 숨어 있어요.</b> ${s.lesson}</p></div><button id="next" class="next" ${state.selectedEmotions.length<2?'disabled':''}>말투 비교하러 가기 <b>→</b></button></div>`
  }

  function stepTwo(){
    const selected = responseOptions.find((option) => option.id === state.response)
    return `<div class="task"><div class="task-head"><span>STEP 2</span><div><h2>세 가지 말투의 결말을 비교해요</h2><p>감정이 생겼을 때 어떤 방식으로 말할지 골라 보세요.</p></div></div><div class="response-list">${responseOptions.map(r=>`<button data-response="${r.id}" class="response ${r.tone} ${state.response===r.id?'selected':''}"><span class="response-icon">${r.icon}</span><div><small>${r.badge}</small><b>“${r.line}”</b><p>${r.result}</p></div><i>${state.response===r.id?'✓':'선택'}</i></button>`).join('')}</div>${selected?`<div class="impact ${selected.id}"><b>${selected.icon} 선택한 말투의 영향</b><p>${selected.explain}</p><div class="heart-meter"><span>관계의 온도</span><i><b style="width:${selected.id==='attack'?22:selected.id==='avoid'?48:88}%"></b></i></div><button id="reopen-ending" class="reopen-ending">🎬 결말 장면 다시 보기</button></div>`:''}<div class="task-actions"><button id="back">← 이전</button><button id="next" class="next" ${!state.response?'disabled':''}>입장 바꿔 보기 <b>→</b></button></div></div>`
  }

  function endingModal(){
    const selected = responseOptions.find((option) => option.id === state.response)
    if (!selected || !state.endingOpen) return ''
    return `<div id="ending-modal" class="ending-modal" role="dialog" aria-modal="true" aria-label="선택한 말투의 결말"><section class="ending-modal-card ${selected.id}"><div class="ending-modal-top"><span>DIRECTOR'S CUT · 선택한 결말</span><b>한 번 더 누르면 닫혀요 ✕</b></div><img class="ending-modal-art" src="assets/dialogue-ending-${selected.id}.webp" alt="${selected.ending} 장면" /><div class="ending-modal-copy"><span>${selected.icon} ${selected.badge}</span><h2>${selected.ending}</h2><p>${selected.result}</p><small>두 친구의 표정과 서로의 거리가 어떻게 달라졌는지 살펴보세요.</small></div></section></div>`
  }

  function stepThree(){
    const s=sc()
    const otherFeeling=s.boyFeeling.endsWith('함')?`${s.boyFeeling.slice(0,-1)}했고`:`${s.boyFeeling}했고`
    const choices=[
      {id:'surface',icon:'💭',title:'“나를 싫어해서 그런 거야.”',text:'행동만 보고 마음까지 단정했어요.'},
      {id:'empathy',icon:'🔄',title:`“상대도 ${otherFeeling}, 어떻게 해야 할지 몰랐을 수도 있어.”`,text:'상대의 상황과 감정을 함께 상상했어요.'},
      {id:'excuse',icon:'🙈',title:'“그럴 수도 있으니 아무 문제도 없어.”',text:'상대의 속상한 마음을 놓쳤어요.'}
    ]
    return `<div class="task"><div class="task-head"><span>STEP 3</span><div><h2>카메라를 상대 마음으로 돌려요</h2><p>상대의 행동에 동의하지 않아도, 어떤 마음이었는지 상상할 수 있어요.</p></div></div><div class="perspective-scene"><div class="portrait boy-listen"></div><div><span>상대의 마음속에는?</span><b>${s.boyFeeling}</b><p>상대의 마음을 이해하는 것은 잘못을 무조건 괜찮다고 하는 것과 달라요.</p></div></div><div class="perspective-options">${choices.map(c=>`<button data-perspective="${c.id}" class="${state.perspective===c.id?'selected':''}"><span>${c.icon}</span><div><b>${c.title}</b><small>${c.text}</small></div><i>${state.perspective===c.id?'✓':''}</i></button>`).join('')}</div><div class="task-actions"><button id="back">← 이전</button><button id="next" class="next" ${state.perspective!=='empathy'?'disabled':''}>화해 대사 만들기 <b>→</b></button></div></div>`
  }

  function stepFour(){
    const s=sc()
    const feelings=[s.girlFeeling,'화남','당황함','외로움']
    const needs=[s.need,'내 말을 끝까지 들어 주길','공평하게 대해 주길','함께 해결하길']
    const requests=[s.request,'내 이야기를 먼저 들어 주길','함께 방법을 정해 주길','다음에는 미리 알려 주길']
    return `<div class="task"><div class="task-head"><span>FINAL CUT</span><div><h2>나 전달법으로 화해 대사를 완성해요</h2><p>상대를 평가하지 않고 상황·감정·바람을 차례로 전해요.</p></div></div><div class="i-message"><div class="formula"><span>상황</span><b>“${s.summary.replace('어요.','을 때')}”</b></div><i>＋</i><div class="formula"><span>내 감정</span><b>${state.feeling||'감정 고르기'}</b></div><i>＋</i><div class="formula"><span>내 바람</span><b>${state.need||'바람 고르기'}</b></div></div><div class="choice-row"><label><span>1. 나는 어떤 마음이었나요?</span><div>${feelings.map(v=>`<button data-feeling="${v}" class="${state.feeling===v?'selected':''}">${v}</button>`).join('')}</div></label><label><span>2. 무엇을 바랐나요?</span><div>${needs.map(v=>`<button data-need="${v}" class="${state.need===v?'selected':''}">${v}</button>`).join('')}</div></label><label><span>3. 다음에는 어떻게 해 주길 바라나요?</span><div>${requests.map(v=>`<button data-request="${v}" class="${state.request===v?'selected':''}">${v}</button>`).join('')}</div></label></div><div class="final-line"><div class="portrait girl-calm"></div><p>“나는 <b>${esc(state.feeling||'___')}</b>했어. 나는 <b>${esc(state.need||'___')}</b> 바랐어. 다음에는 <b>${esc(state.request||'___')}</b>.”</p></div><div class="task-actions"><button id="back">← 이전</button><button id="finish" class="next" ${!(state.feeling&&state.need&&state.request)?'disabled':''}>완성 장면 보기 <b>▶</b></button></div></div>`
  }

  function studio(){
    const body=state.step===1?stepOne():state.step===2?stepTwo():state.step===3?stepThree():stepFour()
    return `<main class="studio"><header>${logo()}${progress()}<button id="home" class="home">장면 선택</button></header><div class="studio-layout"><div class="left-column">${sceneStage()}${body}</div>${sideGuide()}</div>${endingModal()}</main>`
  }

  function result(){
    const s=sc()
    return `<main class="result"><header>${logo()}<div><button id="print">🖨️ 감독 인증서 인쇄</button><button id="new-scene">새 장면 연출</button></div></header><section class="result-paper"><div class="result-title"><span>DIRECTOR'S CUT</span><h1>대화의 결말이 바뀌었어요!</h1><p>감정을 알아차리고 상대를 존중하는 말로 장면을 다시 연출했습니다.</p></div><div class="compare"><article><span>바꾸기 전</span><div class="compare-scene ${s.scene}"></div><div class="mini-dialogue bad"><p>“${s.first}”</p><p>“${s.other}”</p></div><footer>관계의 온도 <b>💛🤍🤍🤍🤍</b></footer></article><div class="cut-arrow">🎬<b>대사<br>다시 쓰기</b>→</div><article class="after"><span>바꾼 후</span><img class="compare-ending" src="assets/ending-${s.id}.webp" alt="${s.title} 장면의 화해 결말" /><div class="mini-dialogue good"><p>“${s.calm}”</p><p>“${s.reply}”</p></div><footer>관계의 온도 <b>💛💛💛💛💛</b></footer></article></div><div class="director-awards"><article><span>💛</span><div><b>감정 탐정</b><small>${state.selectedEmotions.join(' · ')}</small></div></article><article><span>🔄</span><div><b>관점 전환</b><small>상대의 마음을 상상했어요</small></div></article><article><span>🌱</span><div><b>존중의 말</b><small>나 전달법을 완성했어요</small></div></article><article><span>🤝</span><div><b>평화로운 해결</b><small>함께 해결할 길을 열었어요</small></div></article></div><div class="character-promise"><div class="portrait girl-calm"></div><div><span>나의 인성 약속</span><p>갈등이 생기면 바로 탓하기 전에 <b>내 감정을 알아차리고, 상대의 이야기를 들은 뒤, 존중하는 말로 내 마음을 전하겠습니다.</b></p><i></i><small>감정 대화 감독관 서명</small></div><div class="portrait boy-smile"></div></div></section></main>`
  }

  function bind(){
    document.querySelectorAll('[data-scenario]').forEach(el=>el.onclick=()=>set({scenario:Number(el.dataset.scenario)}))
    document.querySelectorAll('[data-control-scenario]').forEach(el=>el.onclick=()=>set({selfScenario:Number(el.dataset.controlScenario)}))
    if(state.screen==='intro'){
      document.getElementById('start').onclick=()=>set({screen:'studio',step:1,selectedEmotions:[],response:null,perspective:null,feeling:'',need:'',request:''})
      return
    }
    if(state.screen==='result'){
      document.getElementById('print').onclick=()=>window.print()
      document.getElementById('new-scene').onclick=()=>set({screen:'intro'})
      return
    }
    document.getElementById('home').onclick=()=>set({screen:'intro'})
    document.querySelectorAll('[data-emotion]').forEach(el=>el.onclick=()=>{const v=el.dataset.emotion;set({selectedEmotions:state.selectedEmotions.includes(v)?state.selectedEmotions.filter(x=>x!==v):state.selectedEmotions.concat(v)})})
    document.querySelectorAll('[data-response]').forEach(el=>el.onclick=()=>set({response:el.dataset.response,endingOpen:true}))
    document.querySelectorAll('[data-perspective]').forEach(el=>el.onclick=()=>set({perspective:el.dataset.perspective}))
    document.querySelectorAll('[data-feeling]').forEach(el=>el.onclick=()=>set({feeling:el.dataset.feeling}))
    document.querySelectorAll('[data-need]').forEach(el=>el.onclick=()=>set({need:el.dataset.need}))
    document.querySelectorAll('[data-request]').forEach(el=>el.onclick=()=>set({request:el.dataset.request}))
    const back=document.getElementById('back');if(back)back.onclick=()=>set({step:Math.max(1,state.step-1)})
    const next=document.getElementById('next');if(next)next.onclick=()=>set({step:Math.min(4,state.step+1)})
    const finish=document.getElementById('finish');if(finish)finish.onclick=()=>set({screen:'result'})
    const endingModal=document.getElementById('ending-modal');if(endingModal)endingModal.onclick=()=>set({endingOpen:false})
    const reopenEnding=document.getElementById('reopen-ending');if(reopenEnding)reopenEnding.onclick=()=>set({endingOpen:true})
  }

  function render(){app.innerHTML=state.screen==='intro'?intro():state.screen==='studio'?studio():result();bind()}
  render()
})()
