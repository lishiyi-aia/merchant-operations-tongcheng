(() => {
  'use strict';
  const project = document.currentScript.dataset.project;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const node = (tag, className, html) => {
    const element = document.createElement(tag);
    element.className = className;
    if (html) element.innerHTML = html;
    return element;
  };
  const section = (id, heading, lead) => {
    const element = node('section', 'section', `<div class="section-head"><div><p class="kicker"></p><h2>${heading}</h2></div><p class="lead section-lead">${lead}</p></div>`);
    element.id = id;
    return element;
  };
  function bindTabs(buttons, callback) {
    function select(index) {
      buttons.forEach((button, i) => {
        button.setAttribute('aria-selected', String(index === i));
        button.tabIndex = index === i ? 0 : -1;
      });
      callback(index);
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(index));
      button.addEventListener('keydown', event => {
        const delta = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 0;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : delta ? (index + delta + buttons.length) % buttons.length : null;
        if (next === null) return;
        event.preventDefault();
        select(next);
        buttons[next].focus();
      });
    });
    select(0);
    return select;
  }
  function explorer(target, id, label, items) {
    target.classList.add('project-explorer');
    target.innerHTML = `<div class="explorer-tabs" role="tablist" aria-label="${label}" aria-orientation="vertical">${items.map((item, i) => `<button type="button" role="tab" id="${id}-tab-${i}" aria-controls="${id}-detail"><span class="mono">0${i + 1}</span><span>${item.label}</span>${icon('arrow-right')}</button>`).join('')}</div><div class="explorer-detail" id="${id}-detail" role="tabpanel" tabindex="0"></div>`;
    const panel = $('.explorer-detail', target);
    bindTabs($$('.explorer-tabs button', target), i => {
      panel.setAttribute('aria-labelledby', `${id}-tab-${i}`);
      panel.innerHTML = `<p class="explorer-eyebrow">${items[i].eyebrow || label}</p><h3>${items[i].title}</h3><p class="explorer-copy">${items[i].copy}</p>${items[i].body || ''}`;
    });
  }
  const main = $('main');
  if (project === 'partnership') {
    $('.topbar').classList.add('nav');
    $('.topnav').classList.add('nav-links');
    $('.confidential').classList.add('disclosure');
    $('.confidential-inner').classList.add('disclosure-inner');
    $$('.index').forEach(item => item.classList.add('kicker'));
    $$('.section-intro').forEach(item => item.classList.add('lead'));
    $('.hero').after(node('div', 'snapshot', '<div class="metric-row"></div>'));
  }
  // Keep section IDs and existing tab listeners while moving content into the workflow.
  const sections = {};
  const ids = project === 'partnership' ? ['overview', 'journey', 'collaboration', 'followup', 'evidence', 'outcome'] : ['overview', 'research', 'content', 'review', 'results'];
  ids.forEach(id => {
    const original = document.getElementById(id);
    if (original.classList.contains('band')) {
      const inner = $('.section', original);
      original.removeAttribute('id');
      inner.id = id;
      sections[id] = inner;
    } else sections[id] = original;
  });
  let config;
  if (project === 'zus') {
    config = {
      title: 'ZUS Coffee', subtitle: '渠道协同与周度复盘', number: '03', eyebrow: 'CHANNEL COORDINATION / WEEKLY REVIEW',
      ownership: '用户洞察 · 新品卖点<br>英文内容 · 信息核对<br>渠道协同 · 周度复盘',
      note: '内部后台明细不公开。账号截图与产品资料不代表个人全部作品。',
      steps: [
        { id: 'research', title: '新品调研', sub: '将用户偏好转成卖点', icon: 'scan-search', sections: ['research', 'overview'] },
        { id: 'content', title: '社媒内容', sub: '围绕卖点制作与发布', icon: 'images', sections: ['content'] },
        { id: 'channels', title: '渠道协同', sub: '线上首发与门店信息一致', icon: 'network', sections: ['channels'] },
        { id: 'review', title: '周度复盘', sub: '反馈回到下一轮执行', icon: 'chart-no-axes-combined', sections: ['review', 'results'] }
      ],
      metrics: [ ['50', '条 Instagram 内容', '参与制作与发布', 'content'], ['15+', '次内容复盘', '累计完成', 'review'], ['1.1w+', '账号粉丝增长', '项目期账号整体结果', 'results'] ]
    };
    const evidence = $('.evidence', sections.content);
    const production = node('details', 'evidence-drawer production-drawer', `<summary>${icon('clapperboard')}<span>内容制作与发布工作</span>${icon('chevron-down')}</summary>`);
    const productionItems = [...sections.content.children].filter(item => item !== evidence && !item.classList.contains('section-head'));
    evidence.before(production);
    production.append(...productionItems);
    $('.section-head h2', sections.content).textContent = '内容发布与素材展示';
    const source = $('.hero-source');
    if (source) { source.classList.add('asset-source'); sections.content.append(source); }
    const channelLead = $('.lead p', sections.review).textContent;
    sections.channels = section('channels', '把门店、物料和排期对齐', channelLead);
    sections.channels.append($('.channel-steps', sections.review));
    $('.section-head h2', sections.review).textContent = '每周复盘，持续补齐信息';
    $('.section-head .lead', sections.review).textContent = '每周跟踪内容表现，累计完成15+次复盘，并根据互动反馈调整后续选题、内容形式与发布节奏。';
    $('.section-head h2', sections.research).textContent = '先决定这条内容要讲什么';
    const researchItems = $$('.research-item', sections.research);
    const topics = researchItems.map((item, i) => ({
      label: ['用户偏好', '竞品表达', '本次选题'][i], title: $('h3', item).textContent,
      copy: $('p', item).textContent,
      body: `<p class="explorer-takeaway">${$('small', item).textContent}</p>`
    }));
    explorer($('.research-grid', sections.research), 'zus-research', '调研与选题', topics);
    const productProof = node('figure', 'research-product', '<img src="evidence/coffizz-product.png" alt="COFFIZZ 产品资料图" width="1080" height="1080"><figcaption>产品资料图 · 非个人摄影作品</figcaption>');
    $('.research-grid', sections.research).after(productProof);
    const researchBody = node('div', 'research-body');
    $('.research-grid', sections.research).before(researchBody);
    researchBody.append($('.research-grid', sections.research), productProof);
    const channelExplorer = node('div', 'channel-explorer');
    $('.channel-steps', sections.channels).before(channelExplorer);
    explorer(channelExplorer, 'zus-channel', '渠道传播', [
      { label: '线上首发', title: '产品信息、文案与发布时间一致', copy: '配合产品线上首发，协助整理宣传素材与发布排期，让产品画面、英文文案和发布信息相互对应。', body: '<dl class="explorer-rows"><div><dt>准备内容</dt><dd>产品素材、英文文案与发布排期。</dd></div><div><dt>核对重点</dt><dd>产品名称、发布主题、链接与时间安排。</dd></div></dl>' },
      { label: 'FamilyMart', title: '让感兴趣的人知道去哪里购买', copy: '配合 FamilyMart 线下渠道传播，协助整理宣传素材、门店信息与发布排期。', body: '<dl class="explorer-rows"><div><dt>准备内容</dt><dd>已确认的门店与渠道说明、对应产品资料。</dd></div><div><dt>核对重点</dt><dd>门店范围、购买信息与发布安排是否一致。</dd></div></dl>' }
    ]);
    setupZusGallery(evidence);
  } else {
    config = {
      title: 'AI 教育合作', subtitle: '合作方运营与履约跟进', number: '02', eyebrow: 'PARTNER OPERATIONS / DELIVERY FOLLOW-UP',
      ownership: '合作需求 · 台账维护<br>协议核验 · 资料流转<br>交付跟进 · AI与SOP',
      note: '职责与时间对应简历。台账字段、流程及检查结构为工作方法整理，内部原始资料不公开。',
      steps: [
        { id: 'journey', title: '合作需求', sub: '确认条件并建立台账', icon: 'scan-search', sections: ['journey', 'overview'] },
        { id: 'followup', title: '协议核验', sub: '核对关键约定与版本', icon: 'notebook-pen', sections: ['followup'] },
        { id: 'collaboration', title: '履约跟进', sub: '演示试点与问题闭环', icon: 'presentation', sections: ['collaboration'] },
        { id: 'evidence', title: '过程材料', sub: '沟通记录与文件流转', icon: 'images', sections: ['evidence'] },
        { id: 'outcome', title: '流程沉淀', sub: '复盘形成SOP和清单', icon: 'chart-no-axes-combined', sections: ['outcome'] }
      ],
      metrics: [['建档', '合作需求与台账', '需求 / 条件 / 推进节点', 'journey'], ['核验', '协议与关键资料', '主体 / 范围 / 分工 / 付款节点', 'followup'], ['跟进', '交付与使用问题', '负责人 / 期限 / 周度进展', 'collaboration'], ['SOP', 'AI与流程沉淀', '清单 / 模板 / 重复工作', 'outcome']]
    };
    const stages = $$('.stage', sections.journey).map(stage => ({
      label: $('h3', stage).textContent, title: $('h3', stage).textContent, copy: $('p', stage).textContent,
      body: `<p class="explorer-takeaway">${$('.stage-output strong', stage).textContent}</p>${$('a', stage).outerHTML}`
    }));
    const timeline = $('.timeline', sections.journey);
    const timelineExplorer = node('div', 'partnership-stages');
    timeline.replaceWith(timelineExplorer);
    explorer(timelineExplorer, 'partnership-stage', '合作需求与履约闭环', stages);
    const handoffNotes = ['需求与条件确认 → 台账记录 → 下一节点。', '条款差异汇总 → 版本确认 → 审批盖章 → 归档。', '人员与账号确认 → 培训材料准备 → 演示与会议。', '任务负责人及期限 → 使用问题跟进 → 周度进展。'];
    const teamItems = $$('.team', sections.collaboration).map((team, i) => ({ label: $('h4', team).textContent, title: $('h4', team).textContent, copy: $('p', team).textContent, body: `<p class="explorer-takeaway">${handoffNotes[i]}</p>` }));
    const teamExplorer = node('div', 'team-explorer');
    $('.collaboration-map', sections.collaboration).replaceWith(teamExplorer);
    explorer(teamExplorer, 'partnership-team', '合作执行与跨团队协同', teamItems);
    const rows = $$('.followup-row:not(.header)', sections.followup).map(row => ({
      label: $('h3', row).textContent.replace(/^\d+\s*/, ''), title: $('h3', row).textContent.replace(/^\d+\s*/, ''),
      copy: $$('p > span:last-child', row)[0].textContent,
      body: `<dl class="explorer-rows"><div><dt>我的工作</dt><dd>${$$('p > span:last-child', row)[1].textContent}</dd></div></dl>`
    }));
    const followupExplorer = node('div', 'followup-explorer');
    $('.followup-table', sections.followup).replaceWith(followupExplorer);
    explorer(followupExplorer, 'partnership-file', '协议与资料核验', rows);
  }

  const totalSteps = config.steps.length;
  const totalLabel = String(totalSteps).padStart(2, '0');
  const resultId = project === 'partnership' ? 'outcome' : 'results';
  const workspace = node('div', 'workspace report');
  workspace.id = 'workspace';
  workspace.innerHTML = `<aside class="workspace-rail"><p class="rail-label">PROJECT WORKFLOW <span>05 STEPS</span></p><div class="workflow-tabs" role="tablist" aria-label="项目工作流程" aria-orientation="vertical">${config.steps.map((step, i) => `<button type="button" role="tab" id="step-${step.id}" aria-controls="panel-${step.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-step="${i}"><span class="step-number">0${i + 1}</span><span class="step-text"><strong>${step.title}</strong><small>${step.sub}</small></span>${icon(step.icon)}</button>`).join('')}</div><div class="rail-ownership"><span>我的职责</span><p>${config.ownership}</p></div><p class="rail-note">${config.note}</p></aside><div class="workspace-body"><div class="workspace-toolbar"><span class="workspace-breadcrumb"></span><div class="workspace-actions"><button type="button" class="read-mode" aria-pressed="false">${icon('rows-3')}<span>完整阅读</span></button><a href="#results" class="tool-link">${icon('clipboard-check')}<span>工作结果</span>${icon('arrow-up-right')}</a></div></div><div class="workspace-panels"></div><nav class="workflow-footer" aria-label="流程翻页"><button type="button" class="step-prev" aria-label="上一步">${icon('arrow-left')}<span>上一步</span></button><span class="step-position" aria-live="polite"></span><button type="button" class="step-next"><span></span>${icon('arrow-right')}</button></nav></div>`;
  $('.rail-label span', workspace).textContent = `${totalLabel} STEPS`;
  $('.tool-link', workspace).href = `#${resultId}`;
  const disclosure = $('.disclosure');
  const snapshot = $('.snapshot');
  snapshot.after(disclosure);
  disclosure.after(workspace);
  const panels = config.steps.map((step, i) => {
    const panel = node('div', 'workflow-panel');
    panel.id = `panel-${step.id}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', `step-${step.id}`);
    panel.tabIndex = 0;
    step.sections.forEach(id => {
      const content = sections[id];
      content.classList.remove('wrap');
      if (id === 'overview') {
        const details = node('details', 'evidence-drawer responsibilities-drawer', `<summary>${icon('briefcase-business')}<span>项目背景与我的职责</span>${icon('chevron-down')}</summary>`);
        details.append(content);
        panel.append(details);
      } else panel.append(content);
    });
    const firstHeading = $('.section-head .kicker', panel);
    firstHeading.textContent = `0${i + 1} / ${step.title}`;
    $('.workspace-panels', workspace).append(panel);
    return panel;
  });
  $$('main > .band').forEach(band => band.remove());
  document.body.classList.add('interactive-case', 'companion-case', `project-${project}`);
  $('.nav').classList.add('site-nav');
  $('.brand').classList.add('nav-brand');
  $('.brand > span:last-child').textContent = '李世怡｜同程旅行｜商家运营';
  $('.brand').setAttribute('aria-label', '返回李世怡同程旅行商家运营作品集');
  $('.hero-inner').classList.add('report');
  $('.eyebrow').textContent = `PROJECT ${config.number} / ${config.eyebrow}`;
  $('h1').textContent = config.title;
  $('h1').after(node('p', 'project-subtitle', config.subtitle));
  $('.hero-foot')?.remove();
  $$('.lead').forEach(lead => lead.classList.add('section-lead'));
  const evidenceId = project === 'partnership' ? 'evidence' : 'materials';
  $('.nav-links').innerHTML = `<a href="#${config.steps[0].id}">项目工作</a><a href="#${evidenceId}">${project === 'partnership' ? '过程材料' : '素材展示'}</a><a href="#${resultId}">工作结果</a>`;
  $('.metric-row').className = 'metric-strip companion-metrics';
  $('.metric-strip').innerHTML = config.metrics.map(([value, title, note, target]) => `<a class="summary-stat" href="#${target}"><strong>${value}</strong><span>${title}<small>${note}</small></span>${icon('arrow-up-right')}</a>`).join('');

  const resultMetrics = node('div', 'result-metrics');
  resultMetrics.innerHTML = config.metrics.slice(0, 3).map(([value, title, note]) => `<div><strong>${value}</strong><h3>${title}</h3><p>${note}</p></div>`).join('');
  if (project !== 'partnership') $('.section-head', sections.results).after(resultMetrics);
  const resultLoop = node('a', 'review-loop', `${icon('corner-up-left')}<span><strong>${project === 'zus' ? '将复盘带回下一条内容' : '将跟进经验沉淀为流程'}</strong><small>${project === 'zus' ? '核对信息 → 调整选题与表达 → 发布后继续观察' : '需求建档 → 资料核验 → 协同交付 → 问题跟进 → 流程沉淀'}</small></span>${icon('arrow-right')}`);
  resultLoop.href = `#${config.steps[0].id}`;
  if (project === 'partnership') resultLoop.querySelector('span').innerHTML = '<strong>将执行经验带回下一次合作</strong><small>需求建档 → 协议核验 → 协同交付 → 问题跟进 → SOP与清单</small>';
  sections[resultId].append(resultLoop);

  let active = 0;
  let fullRead = false;
  const tabs = $$('.workflow-tabs button', workspace);
  const motion = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  function selectStep(index, { scroll = false, hash = true } = {}) {
    active = index;
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; panels[i].hidden = !fullRead && i !== index; });
    $('.workspace-breadcrumb').innerHTML = `<b>0${index + 1}</b> / ${totalLabel} <span>${config.steps[index].title}</span>`;
    $('.step-position').textContent = `0${index + 1} / ${totalLabel}`;
    $('.step-prev').disabled = index === 0;
    $('.step-next span').textContent = index === totalSteps - 1 ? `回到${config.steps[0].title}` : `下一步：${config.steps[index + 1].title}`;
    if (hash) history.pushState(null, '', `#${config.steps[index].id}`);
    if (scroll) {
      (fullRead ? panels[index] : workspace).scrollIntoView({ behavior: motion(), block: 'start' });
      panels[index].focus({ preventScroll: true });
    }
    if (matchMedia('(max-width: 900px)').matches) {
      const rail = $('.workflow-tabs');
      const tabBox = tabs[index].getBoundingClientRect();
      const railBox = rail.getBoundingClientRect();
      if (tabBox.left < railBox.left || tabBox.right > railBox.right) {
        rail.scrollTo({ left: rail.scrollLeft + tabBox.left - railBox.left, behavior: motion() });
      }
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectStep(index, { scroll: true }));
    tab.addEventListener('keydown', event => {
      const delta = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 0;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? totalSteps - 1 : delta ? (index + delta + totalSteps) % totalSteps : null;
      if (next === null) return;
      event.preventDefault(); selectStep(next); tabs[next].focus({ preventScroll: true }); tabs[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });
  $('.step-next').addEventListener('click', () => selectStep((active + 1) % totalSteps, { scroll: true }));
  $('.step-prev').addEventListener('click', () => selectStep(Math.max(0, active - 1), { scroll: true }));
  $('.read-mode').addEventListener('click', () => {
    fullRead = !fullRead;
    workspace.classList.toggle('is-full-read', fullRead);
    $('.read-mode').setAttribute('aria-pressed', String(fullRead));
    $('.read-mode span').textContent = fullRead ? '分步阅读' : '完整阅读';
    selectStep(active, { hash: false });
    workspace.scrollIntoView({ behavior: motion(), block: 'start' });
  });
  function showTarget(id, scroll = true) {
    const target = document.getElementById(id);
    if (!target) return false;
    const index = panels.findIndex(panel => panel.contains(target));
    if (index < 0) return false;
    selectStep(index, { hash: false });
    const drawer = target.closest('details');
    if (drawer) drawer.open = true;
    if (target.matches('.panel, .decision-panel')) {
      const nestedTab = $(`[aria-controls="${target.id}"]`);
      nestedTab?.click();
    }
    if (scroll) (id === config.steps[index].id ? panels[index] : drawer || target).scrollIntoView({ behavior: motion(), block: 'start' });
    return true;
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!showTarget(link.hash.slice(1))) return;
    event.preventDefault(); history.pushState(null, '', link.hash);
  });
  function followHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) selectStep(0, { hash: false, scroll: true });
    else showTarget(id);
  }
  window.addEventListener('hashchange', followHash);
  window.addEventListener('popstate', followHash);
  const narrow = matchMedia('(max-width: 900px)');
  function orientations() {
    $('.workflow-tabs').setAttribute('aria-orientation', narrow.matches ? 'horizontal' : 'vertical');
    $$('.explorer-tabs').forEach(list => list.setAttribute('aria-orientation', getComputedStyle(list).display === 'flex' ? 'horizontal' : 'vertical'));
  }
  orientations();
  narrow.addEventListener('change', orientations);
  matchMedia('(max-width: 600px)').addEventListener('change', orientations);
  if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 1.6, 'aria-hidden': 'true' } });
  selectStep(0, { hash: false });
  if (location.hash) requestAnimationFrame(followHash);

  function setupZusGallery(evidence) {
    const feed = $('.feed', evidence);
    const materials = $$('.product-materials figure', evidence);
    const sourceImages = [feed, ...materials].map(figure => ({
      src: $('.photo-link', figure).getAttribute('href'), alt: $('img', figure).alt,
      caption: $('figcaption', figure).textContent
    }));
    sourceImages.push({ src: 'evidence/coffizz-launch.jpg', alt: 'COFFIZZ 产品发布资料图', caption: 'COFFIZZ 产品发布资料图 · 非个人摄影作品' });
    const labels = ['账号内容', '产品资料', '包装资料', '发布资料'];
    const notes = [
      ['Instagram 账号内容', '账号截图呈现产品、生活场景与活动内容。', '参与选题、拍摄剪辑、英文文案与发布配合；截图不代表其中全部作品由本人制作。'],
      ['COFFIZZ 产品资料', '用于核对产品名称、包装与内容需要说明的信息。', '产品资料图不作为个人摄影或设计作品展示。'],
      ['COFFIZZ 包装资料', '配合整理产品与传播素材时，用于核对对应产品信息。', '包装资料图不作为个人设计作品展示。'],
      ['COFFIZZ 发布资料', '呈现新品发布时的产品与品牌信息。', '品牌资料仅提供背景，不代表本人独立负责整个新品上市。']
    ];
    const gallery = node('div', 'asset-gallery', `<div class="asset-tabs" role="tablist" aria-label="ZUS 资料类型">${labels.map((label, i) => `<button type="button" role="tab" id="asset-tab-${i}" aria-controls="asset-detail">${label}</button>`).join('')}</div><div id="asset-detail" role="tabpanel" tabindex="0"><figure class="asset-visual"><img alt=""><button type="button" class="asset-zoom" aria-label="放大查看资料" title="放大查看资料">${icon('expand')}</button></figure><div class="asset-caption"><p class="asset-count mono"></p><h3></h3><p data-asset-context></p><p data-asset-credit class="asset-credit"></p><a class="asset-original" target="_blank" rel="noopener noreferrer">查看原图 ${icon('arrow-up-right')}</a></div></div>`);
    gallery.id = 'materials';
    evidence.replaceWith(gallery);
    let current = 0;
    bindTabs($$('.asset-tabs button', gallery), i => {
      current = i;
      $('#asset-detail', gallery).setAttribute('aria-labelledby', `asset-tab-${i}`);
      $('.asset-visual img', gallery).src = sourceImages[i].src;
      $('.asset-visual img', gallery).alt = sourceImages[i].alt;
      $('.asset-count', gallery).textContent = `0${i + 1} / 04`;
      $('.asset-caption h3', gallery).textContent = notes[i][0];
      $('[data-asset-context]', gallery).textContent = notes[i][1];
      $('[data-asset-credit]', gallery).textContent = notes[i][2];
      $('.asset-original', gallery).href = sourceImages[i].src;
    });
    const dialog = node('dialog', 'asset-lightbox', `<header><h2 id="asset-lightbox-title">资料原图</h2><button type="button" class="asset-close" aria-label="关闭资料" title="关闭资料" autofocus>${icon('x')}</button></header><div class="asset-lightbox-body"><img alt=""></div><p class="asset-lightbox-note"></p>`);
    dialog.setAttribute('aria-labelledby', 'asset-lightbox-title');
    document.body.append(dialog);
    let previousOverflow = '';
    $('.asset-zoom', gallery).addEventListener('click', () => {
      $('img', dialog).src = sourceImages[current].src;
      $('img', dialog).alt = sourceImages[current].alt;
      $('h2', dialog).textContent = notes[current][0];
      $('.asset-lightbox-note', dialog).textContent = sourceImages[current].caption;
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
    });
    $('.asset-close', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.documentElement.style.overflow = previousOverflow;
      $('.asset-zoom', gallery).focus({ preventScroll: true });
    });
  }
})();
