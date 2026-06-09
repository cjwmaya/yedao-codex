// 日志详情页渲染
(function () {
  'use strict';

  const LONG_CONTENT = {
    'log-001': `
      <p>Most people generate images. A few build worlds.</p>
      <p>The difference is not talent or taste or even time. It is <strong>structure</strong>. A world has gravity — rules you can feel even when nobody explains them, a history that existed before you arrived, a visual logic that holds together across a hundred outputs the same way it holds together across one.</p>
      <p>An image without structure is decoration. An image with structure is a doorway.</p>
      <h3>Why prompts fail</h3>
      <p>Prompts are a one-line transaction. You type, you receive. There is no memory of what came before, no requirement that what comes next is consistent, no inheritance.</p>
      <p>Worlds are different. A world is a <strong>commitment</strong>. Once you decide the Black Sun has neon, every image that follows must negotiate with that decision.</p>
      <h3>What to do instead</h3>
      <p>Stop writing one-shot prompts. Start writing <strong>constitutions</strong>. A constitution is a small set of rules — thesis, lore, archetypes, palette, anchor sref — that every subsequent image must obey.</p>
      <p>You can break a constitution. But you have to know you broke it.</p>
    `,
    'log-002': `
      <p>A 100-output series doesn't fall apart because of bad images. It falls apart because of <strong>drift</strong> — small visual decisions that accumulate until the world no longer feels like one world.</p>
      <h3>Three forces</h3>
      <p>Consistency comes down to three forces: <strong>anchor</strong> (the small set of unchanging parameters), <strong>rhythm</strong> (when and how you vary them), and <strong>selection</strong> (the discipline of choosing which outputs survive).</p>
      <h3>The three fixes</h3>
      <p>1. <strong>Lock the anchor</strong>. Pick one sref, one profile, one stylize value. Don't change them across 80% of the series. The 20% you vary, vary on purpose.</p>
      <p>2. <strong>Build a rhythm</strong>. Plan the variation. Don't let it happen by accident. A series that drifts is a series without a rhythm.</p>
      <p>3. <strong>Edit ruthlessly</strong>. The output that doesn't belong — even if it's beautiful — has to go. The first 10% of cuts will be painful. After that, you get faster.</p>
    `,
    'log-003': `
      <p>The kinetic workflow rewards <strong>momentum</strong>, not perfection. It is the opposite of endless tweaking.</p>
      <h3>Why perfectionism kills</h3>
      <p>Perfection is a moving target. The longer you sit with one output, the more flaws you see. Eventually you delete it — and you've spent 4 hours on zero outputs.</p>
      <h3>The kinetic rule</h3>
      <p>Generate 10, keep 2, post 1. Move on. The next 10 will be better than the first 10, because you just learned something in the act of generation. Sitting on one output teaches you nothing.</p>
      <h3>How to know when to stop</h3>
      <p>Stop when the world stops surprising you. Stop when the outputs feel like a feed. Stop when the rhythm breaks. Then start a new series.</p>
    `,
    'log-004': `
      <p>The blank canvas is the enemy of every world builder. The first 10 minutes of a session are the most dangerous — that's when you decide whether you're going to ship or stall.</p>
      <h3>The 7-day warm-up</h3>
      <p>Before starting a new world, spend 7 days on a structured warm-up. Day 1-2: collect 30 reference images. Day 3-4: write the world brief. Day 5-6: generate 50 throwaway outputs. Day 7: cut the 50 down to 10. Now you have a pre-loaded world.</p>
      <h3>Why this works</h3>
      <p>The blank canvas is empty because you haven't loaded it. The warm-up loads it. By Day 7, you have vocabulary, references, and 10 keepers. Starting a series with a loaded canvas is the difference between shipping and stalling.</p>
    `,
    'log-005': `
      <p>There are four stages of world-builder maturity. Most people stop at stage 2. The masters are at stage 4.</p>
      <h3>Stage 1: Experimenter</h3>
      <p>You try things. You don't know what works. Output is random.</p>
      <h3>Stage 2: Stylist</h3>
      <p>You find a look you like. You repeat it. Output is consistent but predictable.</p>
      <h3>Stage 3: World-builder</h3>
      <p>You have a thesis, lore, archetypes, and a system. Output coheres across many frames.</p>
      <h3>Stage 4: Director</h3>
      <p>You ship. You have an audience. You know which decisions are reversible and which aren't. Output is intentional.</p>
    `,
    'log-008': `
      <p>Codex Vol. II was the hardest of the three to write. The methodology kept slipping — the moment I tried to make it explicit, it stopped working.</p>
      <h3>What got cut</h3>
      <p>40 pages of detailed prompt engineering guides. The truth: the prompts are the least interesting part. The thinking is the interesting part.</p>
      <h3>What stayed</h3>
      <p>The 7+5+4 decision framework. The "workflow as worldview" essay. The "anchor + rhythm + selection" model. The diary of building.</p>
    `,
    'log-011': `
      <p>In 2026, decision-making is the only skill that can't be outsourced. Generation is commoditized. Curation is the moat.</p>
      <h3>The Director's Moment</h3>
      <p>Every world builder reaches a moment where the question stops being "how do I make this?" and becomes "should I make this, and why?" That moment is the Director's Moment.</p>
      <h3>What the Director does</h3>
      <p>Not makes. Directs. Decides. Curates. The Director's output is a sequence of intentions, not a pile of artifacts.</p>
    `,
    'log-016': `
      <p>30 worlds in a single drop. Here's the postmortem.</p>
      <h3>What worked</h3>
      <p>Locking one sref per world. Writing the thesis first. Cutting without mercy. Posting in pairs.</p>
      <h3>What didn't</h3>
      <p>3 of the 30 worlds had to be redone because I didn't write the lore first. The aesthetic was good but the world didn't cohere. Lesson: lore before palette, always.</p>
      <h3>What I'd do differently</h3>
      <p>Pre-write all 30 theses in a single day before generating. Don't generate until the writing is done.</p>
    `
  };

  const defaultBody = `
    <p>This is one of the founding logs of the Codex. Each log is a long-form reflection on the practice of world building — the things the formal theory can't quite say.</p>
    <p>The full version of this log lives on the VVSVS Substack and on the original site. The replica preserves the structure and the framing so you can use it as a reference.</p>
    <h3>Why logs exist</h3>
    <p>Tools change. Models evolve. Features disappear. Logs are the place where the <em>practice</em> of building gets recorded — the part that doesn't fit into a numbered principle.</p>
    <h3>How to read them</h3>
    <p>Read them after you've read the corresponding volume. The logs are the diary; the codex is the system. Both are useful. They speak to different parts of the work.</p>
  `;

  function render() {
    const D = window.YEDAO_DATA;
    if (!D || !D.LOGS) return;
    const slug = (location.hash || '#log-001').slice(1);
    const log = D.LOGS.find(l => l.slug === slug) || D.LOGS[0];
    document.getElementById('logEyebrow').innerHTML = 'LOG ' + log.num + ' · ' + log.tag + '<br><span class="eyebrow-sub">日志 ' + log.num + ' · ' + log.tag + '</span>';
    document.getElementById('logTitle').textContent = log.title;
    document.getElementById('logTitleCn').textContent = log.cn;
    document.getElementById('logDate').innerHTML = log.date + '<br><span class="cn-sub">' + log.cn + '</span>';
    document.getElementById('logBody').innerHTML = LONG_CONTENT[slug] || defaultBody;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
  window.addEventListener('hashchange', render);
})();
