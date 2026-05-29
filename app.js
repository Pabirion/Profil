// App logic: build slots, tooltips, tabs, portrait, scaling.
(function () {
  "use strict";

  // ---------- DATA ----------
  // 7 left, 7 right, 2 weapons. quality: common|uncommon|rare|epic|legendary
  const LEFT = [
    { icon:"vision", name:"Product Vision", q:"epic", slot:"Head", ilvl:184, req:20,
      stats:["+24 Strategy","+16 Clarity"],
      equip:"Aligns the team on what matters before a single pixel moves.",
      flavor:"Knows where the product is going — and why." },
    { icon:"comms", name:"Stakeholder Communication", q:"rare", slot:"Neck", ilvl:163, req:14,
      stats:["+19 Influence","+11 Patience"],
      equip:"Turns a room of opinions into one shared decision.",
      flavor:"Speaks engineer, exec and customer fluently." },
    { icon:"leadership", name:"Design Leadership", q:"epic", slot:"Shoulder", ilvl:178, req:22,
      stats:["+22 Influence","+14 Vision"],
      equip:"Grows other designers instead of just shipping screens.",
      flavor:"Leads the critique, not the cursor." },
    { icon:"mentorship", name:"Mentorship", q:"uncommon", slot:"Back", ilvl:142, req:10,
      stats:["+13 Empathy","+9 Patience"],
      equip:"Junior designers level up twice as fast nearby.",
      flavor:"The best portfolios she's proudest of aren't her own." },
    { icon:"research", name:"User Research", q:"epic", slot:"Chest", ilvl:190, req:18,
      stats:["+26 Curiosity","+18 Rigor"],
      equip:"Replaces 'I think' with 'I watched 12 people struggle'.",
      flavor:"Falls in love with the problem, not the solution." },
    { icon:"wireframe", name:"Wireframing", q:"rare", slot:"Wrist", ilvl:165, req:12,
      stats:["+17 Speed","+12 Clarity"],
      equip:"Sketches ten ideas in the time it takes to defend one.",
      flavor:"Greyboxes first, pretties later." },
    { icon:"ia", name:"Information Architecture", q:"uncommon", slot:"Tabard", ilvl:150, req:16,
      stats:["+15 Structure","+10 Clarity"],
      equip:"Users find it without being told where it is.",
      flavor:"A place for everything, and a label that makes sense." },
  ];
  const RIGHT = [
    { icon:"designsystems", name:"Design Systems", q:"epic", slot:"Hands", ilvl:195, req:24,
      stats:["+27 Consistency","+15 Craft"],
      equip:"One token to rule them all; every screen falls in line.",
      flavor:"Build it once, ship it everywhere." },
    { icon:"interaction", name:"Interaction Design", q:"rare", slot:"Waist", ilvl:172, req:19,
      stats:["+18 Craft","+13 Delight"],
      equip:"Micro-interactions that feel right before you notice them.",
      flavor:"The motion is the message." },
    { icon:"usability", name:"Usability Testing", q:"rare", slot:"Legs", ilvl:168, req:17,
      stats:["+17 Rigor","+12 Humility"],
      equip:"Five users a week keeps the redesign away.",
      flavor:"You are not your user." },
    { icon:"accessibility", name:"Accessibility · WCAG", q:"rare", slot:"Feet", ilvl:160, req:15,
      stats:["+16 Empathy","+14 Rigor"],
      equip:"Contrast passes, focus rings glow, everyone gets in.",
      flavor:"Designed for the edges, better for the middle." },
    { icon:"figjam", name:"FigJam", q:"epic", slot:"Trinket", ilvl:182, req:21,
      stats:["+20 Facilitation","+15 Collaboration"],
      equip:"Use: Summons a productive workshop from pure chaos. (8 sticky charges)",
      flavor:"Where the stickiest ideas are born." },
    { icon:"empathy", name:"Empathy", q:"legendary", slot:"Trinket", ilvl:200, req:1,
      stats:["+30 Empathy","+20 Insight"],
      equip:"Equip: Feels the friction so the user never has to.",
      flavor:"The original superpower. No keyboard shortcut for this one." },
    { icon:"figma", name:"Figma", q:"legendary", slot:"Hands", ilvl:200, req:25,
      stats:["+30 Craft","+22 Speed","+15 Collaboration"],
      equip:"Use: Auto-layout bends reality to your will.",
      flavor:"Her main hand. 47,000 hours and counting." },
  ];
  const WEAPONS = [
    { icon:"pen", name:"The Pen of Clarity", q:"legendary", slot:"Main Hand", ilvl:204, req:27,
      stats:["+32 Craft","+24 Insight","+18 Influence"],
      equip:"Chance on hit: cut one confusing sentence into two clear ones.",
      flavor:"Mightier than the spec." },
    { icon:"sketchbook", name:"Sketchbook of Ideas", q:"rare", slot:"Off Hand", ilvl:170, req:13,
      stats:["+18 Creativity","+12 Curiosity"],
      equip:"Never runs out of pages. Half of them are dog drawings.",
      flavor:"The good ideas hide between the bad ones." },
  ];

  const REPS = [
    { name:"Figma Community", standing:"Exalted", q:"legendary", pct:100, val:"42 000 / 42 000" },
    { name:"The Research Guild", standing:"Revered", q:"epic", pct:78, val:"16 240 / 21 000" },
    { name:"Stakeholder Council", standing:"Honored", q:"rare", pct:54, val:"6 510 / 12 000" },
    { name:"Accessibility Order", standing:"Honored", q:"rare", pct:61, val:"7 320 / 12 000" },
    { name:"Dribbble Dribblers", standing:"Friendly", q:"uncommon", pct:33, val:"2 970 / 9 000" },
    { name:"The Snooze Button", standing:"Hated", q:"common", pct:8, val:"— grudgingly —" },
  ];

  const QCOL = {
    common:"var(--q-common)", uncommon:"var(--q-uncommon)", rare:"var(--q-rare)",
    epic:"var(--q-epic)", legendary:"var(--q-legendary)",
  };
  const QLABEL = { common:"", uncommon:"+", rare:"R", epic:"E", legendary:"★" };

  // ---------- SLOT BUILD ----------
  function buildSlot(data) {
    const el = document.createElement("div");
    el.className = "slot";
    el.style.setProperty("--q", QCOL[data.q]);
    const socket = document.createElement("div");
    socket.className = "socket";
    socket.appendChild(window.SkillIcons.makeIcon(data.icon));
    el.appendChild(socket);
    if (QLABEL[data.q]) {
      const b = document.createElement("div");
      b.className = "qbadge";
      b.textContent = QLABEL[data.q];
      el.appendChild(b);
    }
    attachTooltip(el, data);
    return el;
  }

  function render() {
    const L = document.getElementById("colLeft");
    const R = document.getElementById("colRight");
    const W = document.getElementById("weapons");
    LEFT.forEach((d) => L.appendChild(buildSlot(d)));
    RIGHT.forEach((d) => R.appendChild(buildSlot(d)));
    WEAPONS.forEach((d) => W.appendChild(buildSlot(d)));
  }

  // ---------- TOOLTIP ----------
  const tip = document.getElementById("tooltip");
  function tooltipHTML(d) {
    let s = "";
    s += `<div class="tt-name q-${d.q}">${d.name}</div>`;
    s += `<div class="tt-ilvl">Mastery Level ${d.ilvl}</div>`;
    s += `<div class="tt-bind">Soulbound</div>`;
    s += `<div class="tt-row"><span>${d.slot}</span><span>Competency</span></div>`;
    s += `<hr>`;
    d.stats.forEach((st) => { s += `<div class="tt-stat">${st}</div>`; });
    s += `<div class="tt-equip">${d.equip.startsWith("Use:") || d.equip.startsWith("Equip:") || d.equip.startsWith("Chance") ? "" : "Equip: "}${d.equip}</div>`;
    s += `<div class="tt-desc">"${d.flavor}"</div>`;
    s += `<div class="tt-req">Requires Level ${d.req}</div>`;
    return s;
  }
  function attachTooltip(el, d) {
    el.addEventListener("mouseenter", () => {
      tip.innerHTML = tooltipHTML(d);
      tip.style.setProperty("--q", QCOL[d.q]);
      tip.style.display = "block";
    });
    el.addEventListener("mousemove", (e) => positionTip(e.clientX, e.clientY));
    el.addEventListener("mouseleave", () => { tip.style.display = "none"; });
  }
  function positionTip(mx, my) {
    const pad = 16;
    const r = tip.getBoundingClientRect();
    let x = mx + 20, y = my + 18;
    if (x + r.width + pad > window.innerWidth) x = mx - r.width - 20;
    if (y + r.height + pad > window.innerHeight) y = my - r.height - 18;
    if (y < pad) y = pad;
    if (x < pad) x = pad;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }

  // ---------- REPUTATION ----------
  function buildRep() {
    const v = document.getElementById("repView");
    let h = `<div class="rep-title">Reputation — Factions &amp; Communities</div>`;
    REPS.forEach((r) => {
      h += `<div class="rep-row">
        <div class="rep-head">
          <span class="rep-name">${r.name}</span>
          <span class="rep-standing q-${r.q}">${r.standing}</span>
        </div>
        <div class="rep-bar">
          <div class="rep-fill" style="width:${r.pct}%;background:${repBarColor(r.q)};"></div>
          <div class="rep-val">${r.val}</div>
        </div>
      </div>`;
    });
    v.innerHTML = h;
  }
  function repBarColor(q) {
    const map = {
      common:"linear-gradient(180deg,#b9b09c,#8d8674)",
      uncommon:"linear-gradient(180deg,#7fd06a,#4e9c3e)",
      rare:"linear-gradient(180deg,#6fb0e8,#3a7fc4)",
      epic:"linear-gradient(180deg,#c79ae0,#9a5fc0)",
      legendary:"linear-gradient(180deg,#ffc06a,#e0892e)",
    };
    return map[q] || map.common;
  }

  // ---------- TABS ----------
  function initTabs() {
    const tabs = document.querySelectorAll(".tab");
    const body = document.getElementById("bodyGrid");
    const rep = document.getElementById("repView");
    tabs.forEach((t) => {
      t.addEventListener("click", () => {
        tabs.forEach((x) => x.classList.remove("active"));
        t.classList.add("active");
        tip.style.display = "none";
        if (t.dataset.tab === "reputation") {
          body.classList.add("rep");
          rep.classList.add("active");
        } else {
          body.classList.remove("rep");
          rep.classList.remove("active");
        }
      });
    });
  }

  // ---------- CHARACTER + PORTRAIT ----------
  function drawAll() {
    const c = document.getElementById("char");
    window.PixelArt.renderScene(c);
    // portrait orb: zoom in on the face
    const o = document.getElementById("orb");
    const ctx = o.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, o.width, o.height);
    ctx.save();
    ctx.translate(-38, -24);
    window.PixelArt.drawCharacter(ctx);
    ctx.restore();
  }

  function initRotate() {
    const c = document.getElementById("char");
    let flipped = false;
    document.getElementById("rotate").addEventListener("click", () => {
      flipped = !flipped;
      c.style.transform = flipped
        ? "translateX(-50%) scaleX(-1)"
        : "translateX(-50%) scaleX(1)";
      // keep the bob animation working with the flip baked into a wrapper transform
      c.style.animation = "none";
    });
  }

  // ---------- SCALING ----------
  function fit() {
    const stage = document.getElementById("stage");
    const s = Math.min(window.innerWidth / 1000, window.innerHeight / 1000);
    stage.style.transform = `scale(${s})`;
  }

  // ---------- INIT ----------
  function init() {
    render();
    buildRep();
    initTabs();
    drawAll();
    initRotate();
    fit();
    window.addEventListener("resize", fit);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
