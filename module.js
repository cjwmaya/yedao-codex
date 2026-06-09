// 学院模块数据
(function () {
  'use strict';

  const MODULES = [
    { id:'thesis', num:1, title:'Thesis & Lore', cn:'主张与隐藏历史',
      intro:'Before you generate a single image, you need a thesis — a position the world argues for. This module is about finding it. Then we layer in the lore that gives it weight.',
      cn_intro:'在你生成第一张图之前，你需要一个主张——一个世界为之辩护的立场。本模块关于如何找到它。然后我们叠加上赋予它重量的隐藏历史。',
      lessons:[
        ['1.1','What a thesis is (and isn\'t)','什么是主张（以及什么不是）','The difference between a theme, a vibe, and a position. How to test your thesis against a single image.'],
        ['1.2','The 5 thesis archetypes','5 种主张原型','Argument, mystery, ritual, elegy, satire. Pick one as a starting point.'],
        ['1.3','Lore vs. backstory','隐藏历史 vs. 背景故事','Why the unseen part of a world carries more weight than the explained part.'],
        ['1.4','The lore interview','隐藏历史访谈法','A 30-minute exercise that surfaces a world\'s invisible rules.'],
        ['1.5','Writing your world\'s brief','写下你的世界简介','A one-page document that anchors everything downstream.'],
        ['1.6','Testing the thesis','检验主张','3 quick tests to know whether your thesis actually holds.'],
        ['1.7','Iterating the lore','迭代隐藏历史','The lore evolves with the world. How to keep it coherent.'],
        ['1.8','Module 1 deliverable','模块 1 交付物','A one-page world brief with thesis + 3 lore rules.']
      ]
    },
    { id:'archetype', num:2, title:'Archetypes & Visual Language', cn:'原型与视觉语言',
      intro:'Once you have a thesis, you need a vocabulary. The archetypes are the recurring figures; the visual language is the consistent style. Both have to be chosen with intent.',
      cn_intro:'有了主张之后，你需要一套词汇。原型是反复出现的形象；视觉语言是一致风格。两者都必须有目的地选择。',
      lessons:[
        ['2.1','Picking your archetype set','挑选原型组合','3 to 5 archetypes is the right number. How to choose them.'],
        ['2.2','Visual language components','视觉语言的构成','Color, material, light, texture, form. How to make decisions in each.'],
        ['2.3','Building a palette','构建色板','5-color palettes that survive 100 outputs.'],
        ['2.4','Material and texture','材质与纹理','The world\'s weight comes from its materials.'],
        ['2.5','Light and atmosphere','光线与氛围','Why a single lighting choice can hold a series together.'],
        ['2.6','The reference archive','参考图档案','Curating 20-30 reference images that anchor your world.'],
        ['2.7','Documenting visual language','记录视觉语言','The 1-page doc you\'ll return to for every future output.'],
        ['2.8','Module 2 deliverable','模块 2 交付物','3 archetypes + 1-page visual language doc.']
      ]
    },
    { id:'sref', num:3, title:'The Sref Toolkit', cn:'Sref 工具箱',
      intro:'The Midjourney sref code is the most powerful single tool for visual consistency. This module is about how to find, farm, and lock one for a series.',
      cn_intro:'Midjourney sref 风格码是视觉一致性最强大的单一工具。本模块关于如何寻找、培育和锁定一个用于整个系列。',
      lessons:[
        ['3.1','What sref actually does','sref 究竟做了什么','The mechanics, demystified.'],
        ['3.2','Farming sref codes','培育 sref 风格码','A repeatable method to generate many codes in a session.'],
        ['3.3','Testing sref for coherence','测试 sref 的连贯性','The 5-image test that tells you whether a code is reliable.'],
        ['3.4','Combining multiple sref codes','组合多个 sref','How to layer two codes for nuance.'],
        ['3.5','Profile parameters','个人参数','Stylize, weird, chaos, quality — what each does.'],
        ['3.6','Locking the sref for a series','为系列锁定 sref','How to commit. The discipline of not changing it.'],
        ['3.7','Sref across models','跨模型使用 sref','What survives the move to V7, what doesn\'t.'],
        ['3.8','Module 3 deliverable','模块 3 交付物','1 locked sref + 1 profile for your world.']
      ]
    },
    { id:'series', num:4, title:'Building a 100-Output Series', cn:'构建 100 张输出系列',
      intro:'A single image is a test. A series is a world. This module walks through how to plan, generate, and curate a 100-output series without losing coherence.',
      cn_intro:'单张图是测试，系列是世界。本模块讲解如何规划、生成和策展一个 100 张输出的系列。',
      lessons:[
        ['4.1','Series planning','系列规划','Plotting the 100 outputs in advance. Why this saves time.'],
        ['4.2','The first 10 outputs','前 10 张输出','How to use them. Why most of them will get cut.'],
        ['4.3','Generation rhythm','生成节奏','Daily volume, weekly curation, monthly review.'],
        ['4.4','Prompt structure','提示词结构','The skeleton that holds 100 outputs together.'],
        ['4.5','Reference image pairing','参考图配对','How to use --cref, --sref, and image references together.'],
        ['4.6','Seed strategy','种子策略','When to use --seed, when not to.'],
        ['4.7','Variation budget','变化预算','How much variation is too much? A practical rule.'],
        ['4.8','Module 4 deliverable','模块 4 交付物','100 outputs, of which 60+ survive curation.']
      ]
    },
    { id:'editing', num:5, title:'Editing & Direction', cn:'剪辑与方向',
      intro:'The most underrated skill. Editing turns a feed into a world. This module is about the discipline of curation — what stays, what goes, and how to know.',
      cn_intro:'最被低估的技艺。剪辑把信息流变成世界。本模块关于策展的纪律。',
      lessons:[
        ['5.1','The two-pass edit','两轮剪辑法','First pass: technical. Second pass: thesis.'],
        ['5.2','Killing your darlings','杀死你的心头好','The output that doesn\'t belong — even if it\'s beautiful.'],
        ['5.3','Sequencing for story','为故事排序','How the order of outputs changes the meaning.'],
        ['5.4','Pacing the reveal','控制揭示节奏','What you show first. What you withhold.'],
        ['5.5','Repetition & variation','重复与变化','The same symbol, slightly different. The rhythm of recognition.'],
        ['5.6','Editing your archive','编辑你的档案','Maintaining a series over months, not days.'],
        ['5.7','The 80/20 cut','80/20 剪辑','A rule that makes editing faster.'],
        ['5.8','Module 5 deliverable','模块 5 交付物','A 60-output, sequenced, edited series.']
      ]
    },
    { id:'publishing', num:6, title:'Publishing & Building an Audience', cn:'发布与受众构建',
      intro:'A world that ships is a world. A world that doesn\'t is a hobby. This module is about the publishing cadence, the platform choices, and the audience loop.',
      cn_intro:'发布出去的世界才叫世界，没发布的只是爱好。本模块关于发布节奏、平台选择和受众循环。',
      lessons:[
        ['6.1','The publishing cadence','发布节奏','Daily? Weekly? Why the answer matters more than the volume.'],
        ['6.2','Platform-by-platform','逐平台策略','Instagram, X, Substack, TikTok — different rules.'],
        ['6.3','The audience loop','受众循环','Why shipping fast is the only way to find out what works.'],
        ['6.4','Building a body of work','构建作品集','The long game. Consistency beats virality.'],
        ['6.5','Monetization paths','变现路径','Shop, course, client work. Each has tradeoffs.'],
        ['6.6','Defending your thesis','捍卫你的主张','The pressure to pivot. When to resist, when to listen.'],
        ['6.7','The 12-month plan','12 个月计划','What a year of shipping actually looks like.'],
        ['6.8','Final project','毕业项目','A complete world, shipped publicly, with an audience loop.']
      ]
    }
  ];

  function render() {
    const m = (location.hash || '#thesis').slice(1);
    const mod = MODULES.find(x => x.id === m) || MODULES[0];
    document.getElementById('modEyebrow').innerHTML = 'Module ' + mod.num + ' of 6<br><span class="eyebrow-sub">第 ' + mod.num + ' 模块 / 共 6</span>';
    document.getElementById('modTitle').textContent = mod.title;
    document.getElementById('modTitleCn').textContent = mod.cn;
    document.getElementById('modIntro').innerHTML = '<h2>' + mod.title + '</h2><p>' + mod.intro + '</p><p class="cn-sub">' + mod.cn_intro + '</p>';
    document.getElementById('modLessons').innerHTML = mod.lessons.map(function (l) {
      return '<li><span class="lesson-num">' + l[0] + '</span><div class="lesson-body"><strong>' + l[1] + '</strong><p class="cn-sub" style="margin-bottom:6px">' + l[2] + '</p><p>' + l[3] + '</p></div></li>';
    }).join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
