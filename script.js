// ==========================================================
// 野岛社区 · 完整交互 + 数据渲染
// ==========================================================
(function () {
  'use strict';

  const D = window.YEDAO_DATA || { ARCHETYPES:[], FUNDAMENTALS:[], GLOSSARY:[], LOGS:[] };

  // ---------- 1. 滚动进度条 ----------
  const bar = document.getElementById('scrollBar');
  const backToTop = document.getElementById('backToTop');
  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + '%';
    if (backToTop) {
      if (h.scrollTop > 600) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // ---------- 2. Header 滚动加深 ----------
  const header = document.getElementById('siteHeader');
  if (header) {
    const update = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ---------- 3. 主题切换（深/浅） ----------
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const saved = localStorage.getItem('yedao-theme') || 'dark';
    document.documentElement.dataset.theme = saved;
    themeBtn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('yedao-theme', next);
    });
  }

  // ---------- 4. 移动端汉堡菜单 ----------
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
    // 点击菜单链接后关闭
    document.querySelectorAll('.primary-nav a').forEach(a => {
      a.addEventListener('click', () => document.body.classList.remove('menu-open'));
    });
  }

  // ---------- 5. 搜索 ----------
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchClose = document.getElementById('searchClose');

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput && searchInput.focus(), 50);
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }
  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchOverlay) {
    searchOverlay.addEventListener('click', e => {
      if (e.target === searchOverlay) closeSearch();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) { searchResults.innerHTML = ''; return; }
      const matches = [];
      D.ARCHETYPES.forEach(a => {
        if (a.name.toLowerCase().includes(q) || a.cn.includes(q) || a.summary.toLowerCase().includes(q) || a.cn_summary.includes(q))
          matches.push({ type:'原型', title:a.name + ' ' + a.cn, href:`archetypes.html#${a.id}`, sub:`Vol.${a.vol} · ${a.summary}` });
      });
      D.FUNDAMENTALS.forEach(f => {
        if (f.name.toLowerCase().includes(q) || f.cn.includes(q) || f.summary.toLowerCase().includes(q))
          matches.push({ type:'原理', title:f.name + ' ' + f.cn, href:`fundamentals.html#${f.id}`, sub:`${f.tier} · ${f.summary}` });
      });
      D.GLOSSARY.forEach(g => {
        if (g.term.toLowerCase().includes(q) || g.cn.includes(q) || g.def.toLowerCase().includes(q))
          matches.push({ type:'术语', title:g.term + ' ' + g.cn, href:`glossary.html#${g.term}`, sub:g.def });
      });
      if (matches.length === 0) {
        searchResults.innerHTML = '<div class="search-empty">没有匹配项</div>';
      } else {
        searchResults.innerHTML = matches.slice(0, 12).map(m => `
          <a class="search-result" href="${m.href}">
            <span class="search-type">${m.type}</span>
            <span class="search-title">${m.title}</span>
            <span class="search-sub">${m.sub}</span>
          </a>`).join('');
      }
    });
  }

  // ---------- 6. 原型网格（archetypes.html） ----------
  const archGrid = document.getElementById('archGrid');
  if (archGrid && D.ARCHETYPES.length) {
    archGrid.innerHTML = D.ARCHETYPES.map(a => `
      <article class="archetype-card ${a.tone} fade-in" data-vol="${a.vol}" data-name="${a.name.toLowerCase()}" id="${a.id}">
        <button class="arch-open" data-arch="${a.id}" aria-label="查看 ${a.name} 详情">
          <div class="arch-num">${String(D.ARCHETYPES.indexOf(a)+1).padStart(2,'0')}</div>
          <div class="arch-desc">${a.summary}</div>
          <div class="arch-desc-cn">${a.cn_summary}</div>
          <div class="arch-name">${a.name}<span class="arch-name-cn">${a.cn}</span></div>
        </button>
      </article>
    `).join('');

    // 过滤
    const chips = document.querySelectorAll('.chip');
    const filterInput = document.getElementById('archFilter');
    function applyFilter() {
      const activeVol = document.querySelector('.chip.active')?.dataset.filter || 'all';
      const q = (filterInput?.value || '').toLowerCase().trim();
      archGrid.querySelectorAll('.archetype-card').forEach(c => {
        const okVol = activeVol === 'all' || c.dataset.vol === activeVol;
        const okQ = !q || c.dataset.name.includes(q);
        c.style.display = (okVol && okQ) ? '' : 'none';
      });
    }
    chips.forEach(ch => ch.addEventListener('click', () => {
      chips.forEach(x => x.classList.remove('active'));
      ch.classList.add('active');
      applyFilter();
    }));
    if (filterInput) filterInput.addEventListener('input', applyFilter);

    // 详情弹层
    const modal = document.getElementById('archModal');
    const modalBody = document.getElementById('modalBody');
    function openModal(id) {
      const a = D.ARCHETYPES.find(x => x.id === id);
      if (!a || !modal) return;
      const paletteHtml = a.palette.map(c => `<span class="swatch" style="background:${c}" title="${c}"></span>`).join('');
      modalBody.innerHTML = `
        <div class="modal-hero ${a.tone}">
          <div class="modal-vol">Vol. ${a.vol} · ${a.vol===1?'第一卷':a.vol===2?'第二卷':'第三卷'}</div>
          <h2 class="modal-name">${a.name}<span class="cn-sub">${a.cn}</span></h2>
        </div>
        <div class="modal-section">
          <h3>What it is · 简介</h3>
          <p>${a.summary}</p>
          <p class="cn-sub">${a.cn_summary}</p>
        </div>
        <div class="modal-section">
          <h3>Midjourney Prompt · 提示词</h3>
          <pre class="code"><code>${a.prompt}</code></pre>
        </div>
        <div class="modal-section">
          <h3>Style Code · 风格码 (--sref)</h3>
          <p>使用此 sref 锁定风格：<code class="sref-code">${a.sref}</code></p>
        </div>
        <div class="modal-section">
          <h3>Palette · 配色</h3>
          <div class="palette">${paletteHtml}</div>
          <p class="palette-list">${a.palette.join(' · ')}</p>
        </div>
        <div class="modal-section">
          <h3>Best for · 适用场景</h3>
          <p>${a.use}</p>
        </div>
        <div class="modal-actions">
          <button class="btn-primary copy-btn" data-copy="${a.prompt}">复制提示词<br><span class="cn-sub">Copy Prompt</span></button>
          <a class="btn-secondary" href="volume-${a.vol}.html#${a.id}">在卷本中查看 →<br><span class="cn-sub">View in Volume</span></a>
        </div>
      `;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    }
    archGrid.addEventListener('click', e => {
      const btn = e.target.closest('.arch-open');
      if (btn) openModal(btn.dataset.arch);
    });
    if (modal) {
      modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
      });
    }
    // 复制按钮
    document.addEventListener('click', e => {
      const c = e.target.closest('.copy-btn');
      if (!c) return;
      const text = c.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        const orig = c.innerHTML;
        c.innerHTML = '已复制 ✓<br><span class="cn-sub">Copied!</span>';
        setTimeout(() => c.innerHTML = orig, 1500);
      });
    });

    // 直接 URL 锚点打开
    if (location.hash) {
      const id = location.hash.slice(1);
      if (D.ARCHETYPES.find(a => a.id === id)) setTimeout(() => openModal(id), 100);
    }
  }

  // ---------- 7. 14 原理渲染 ----------
  const fundContainer = document.getElementById('foundationList') || document.getElementById('craftList') || document.getElementById('directionList');
  function renderFundamentals(containerId, tier) {
    const el = document.getElementById(containerId);
    if (!el || !D.FUNDAMENTALS.length) return;
    el.innerHTML = D.FUNDAMENTALS
      .filter(f => f.tier === tier)
      .map(f => `
        <article class="fundamental-item" id="${f.id}">
          <div class="fund-num">${f.code}</div>
          <div class="fund-body">
            <h3>${f.name}<span class="cn-h-sub">${f.cn}</span></h3>
            <p>${f.summary}</p>
            <p class="cn-sub">${f.cn_summary}</p>
          </div>
        </article>
      `).join('');
  }
  if (document.getElementById('foundationList')) {
    renderFundamentals('foundationList', 'Foundation');
    renderFundamentals('craftList', 'Craft');
    renderFundamentals('directionList', 'Direction');
  }

  // ---------- 8. 术语表渲染 ----------
  const glossList = document.getElementById('glossaryList');
  if (glossList && D.GLOSSARY.length) {
    glossList.innerHTML = D.GLOSSARY.map(g => `
      <article class="glossary-item" id="${g.term}">
        <div class="glossary-term">${g.term}<span class="cn-sub">${g.cn}</span></div>
        <div class="glossary-def">${g.def}</div>
      </article>
    `).join('');
  }

  // ---------- 9. 世界库渲染 ----------
  const worldsGrid = document.getElementById('worldsGrid');
  if (worldsGrid) {
    const worlds = [
      { name:'The Black Sun', cn:'黑太阳', archetype:'cyberpunk',
        thesis:'When the body becomes a battleground between flesh and chrome, the world ends up arguing about what is human.',
        cn_thesis:'当身体成为血肉与铬合金的战场，世界最终在争论什么算"人"。',
        lore:'A century of augmentation created a class of "half-citizens" — beings whose legal personhood depends on a single removable chip.',
        cn_lore:'一个世纪的义体化，催生了一个"半公民"阶层——他们的法律人格取决于一颗可拆卸的芯片。',
        visual:'Neon, rain-slicked streets, prosthetic limbs that blur the line between upgrade and wound.',
        cn_visual:'霓虹、雨湿的街道、模糊了升级与创伤边界的义肢。',
        archetypes:['Cyberpunk','Vapor','Synesthesia'] },
      { name:'After The Wave', cn:'浪潮之后', archetype:'samurai',
        thesis:'Beauty is inseparable from discipline. The smallest gesture can carry the weight of a lifetime.',
        cn_thesis:'美与纪律不可分。最小的姿态也能承载一生的重量。',
        lore:'A post-collapse Kyoto where every action is governed by an ancient protocol — the rituals of the old world, repurposed for survival.',
        cn_lore:'崩溃后的京都，每个动作都被一套古老仪式支配——旧世界的礼节，被改造成了生存法。',
        visual:'Steaming bowls, tatami, robotic tattoo arms, late afternoon light.',
        cn_visual:'冒热气的饭碗、榻榻米、机械纹身臂、午后斜阳。',
        archetypes:['Samurai','Miramis','Harvest'] },
      { name:'A Quiet Catastrophe', cn:'一场安静的灾难', archetype:'afterglow',
        thesis:'Sometimes the most devastating events are the ones nobody noticed. The fog deletes the horizon and the world goes on.',
        cn_thesis:'最毁灭性的事件，有时是没人注意到的。雾把地平线抹去，世界照常继续。',
        lore:'A small town where the horizon vanished fifty years ago. People still commute. They just don\'t go far.',
        cn_lore:'五十年前地平线消失的小镇。人们照常通勤，只是不再走远。',
        visual:'Negative space, fog, desaturated palette, ordinary subjects rendered ominous.',
        cn_visual:'留白、雾、去饱和的色板、日常主体被渲染成不祥。',
        archetypes:['Afterglow','California','Reykjavik'] },
      { name:'A Crown Above The Pit', cn:'坑上之冠', archetype:'mechalodogrom',
        thesis:'We build machines. The machines outgrow us. The cycle is not tragedy — it is religion.',
        cn_thesis:'我们建造机器，机器超越我们。这不是悲剧——是宗教。',
        lore:'Giant mechas are piloted by families across generations. The machine is the family\'s soul, the family is the machine\'s hands.',
        cn_lore:'巨型机甲由家族世代驾驶。机甲是家族之魂，家族是机甲之手。',
        visual:'Massive scale, dust, arena lighting, chrome against skin.',
        cn_visual:'巨型尺度、尘埃、竞技场光、铬合金与皮肤的对照。',
        archetypes:['Mechalodogrom','Tetsuo','Synesthesia'] },
      { name:'The Memory Banquet', cn:'记忆的宴会', archetype:'decadence',
        thesis:'A society past its peak eats its own history. The menu is the world\'s autobiography.',
        cn_thesis:'走过巅峰的社会，正在吃自己的历史。菜单就是世界的自传。',
        lore:'A castle where every dish is a memory. Diners eat a stranger\'s first kiss. The chef remembers everything; no one else does.',
        cn_lore:'每道菜都是一段记忆的城堡。食客吃下陌生人的初吻。厨师记得一切，旁人什么都不记得。',
        visual:'Crumbling baroque, overripe fruit, candlelight, faded gold.',
        cn_visual:'坍塌的巴洛克、过熟的水果、烛光、褪色的金。',
        archetypes:['Decadence','Harvest','Magenta'] }
    ];
    worldsGrid.innerHTML = worlds.map(w => `
      <article class="world-card ${w.archetype}">
        <div class="world-head">
          <div class="world-num">Vol. ${worlds.indexOf(w)+1}</div>
          <h2>${w.name}<span class="cn-sub">${w.cn}</span></h2>
        </div>
        <div class="world-body">
          <div class="world-row">
            <span class="world-label">Thesis · 主张</span>
            <p>${w.thesis}</p>
            <p class="cn-sub">${w.cn_thesis}</p>
          </div>
          <div class="world-row">
            <span class="world-label">Lore · 隐藏历史</span>
            <p>${w.lore}</p>
            <p class="cn-sub">${w.cn_lore}</p>
          </div>
          <div class="world-row">
            <span class="world-label">Visual · 视觉语言</span>
            <p>${w.visual}</p>
            <p class="cn-sub">${w.cn_visual}</p>
          </div>
          <div class="world-row">
            <span class="world-label">Archetypes · 关联原型</span>
            <div class="world-archetypes">
              ${w.archetypes.map(x => `<a class="world-chip" href="archetypes.html">${x}</a>`).join('')}
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  // ---------- 10. 复制提示词（任意含 data-copy 的按钮） ----------
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-copy]');
    if (!c) return;
    const text = c.dataset.copy;
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      const orig = c.innerHTML;
      c.innerHTML = '已复制 ✓';
      c.classList.add('copied');
      setTimeout(() => { c.innerHTML = orig; c.classList.remove('copied'); }, 1500);
    });
  });

  // ---------- 11. 键盘导航：原型详情弹层用 ←/→ 切换 ----------
  const modal = document.getElementById('archModal');
  if (modal) {
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeBtn = archGrid?.querySelector('.arch-open:focus') || null;
        const buttons = Array.from(archGrid.querySelectorAll('.arch-open'));
        const idx = buttons.indexOf(activeBtn);
        if (idx < 0) return;
        const next = e.key === 'ArrowRight' ? (idx+1) % buttons.length : (idx-1+buttons.length) % buttons.length;
        const nextId = buttons[next].dataset.arch;
        const openModalFn = window.__openArchModal;
        if (openModalFn) openModalFn(nextId);
      }
    });
  }

  // ---------- 12. 平滑滚动锚点 ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const t = document.getElementById(id);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', '#' + id);
      }
    });
  });

  // ---------- 13. prefers-reduced-motion 尊重 ----------
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
  }

  // ---------- 14. 暴露给键盘导航用 ----------
  window.__openArchModal = function(id) {
    const btn = archGrid?.querySelector(`.arch-open[data-arch="${id}"]`);
    if (btn) btn.click();
  };

  // 初始化滚动
  onScroll();
})();
