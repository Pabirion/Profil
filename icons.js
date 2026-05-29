// Pixel icons for the competency slots. Each draws inside a 16x16 grid.
(function () {
  "use strict";
  const I = {
    ink:"#3b2517", gold:"#ecb74a", goldHi:"#fbe39b", coral:"#e2614a", coralHi:"#ffd9cf",
    teal:"#3e8e8e", sage:"#6a9a82", cream:"#f5ecd6", line:"#bca98a",
    pink:"#ec9c87", purple:"#9a6fb0", blue:"#5081c0", green:"#5e9c5b", red:"#cf564a",
    white:"#fdfaf4", grip:"#33424a", lav:"#cdbfe0",
  };
  function P(ctx){ return (x,y,w,h,c)=>{ ctx.fillStyle=c; ctx.fillRect(x,y,w,h); }; }

  const ICONS = {
    vision(ctx){ const p=P(ctx); // north star
      p(7,2,2,12,I.gold); p(2,7,12,2,I.gold); p(6,6,4,4,I.goldHi);
      p(11,3,1,1,I.white); p(3,11,1,1,I.white); p(12,11,1,1,I.white);
    },
    comms(ctx){ const p=P(ctx); // speech bubble
      p(2,3,12,8,I.teal); p(4,11,3,3,I.teal);
      p(4,5,8,1,I.cream); p(4,7,6,1,I.cream);
    },
    leadership(ctx){ const p=P(ctx); // crown
      p(3,9,11,4,I.gold);
      p(3,5,2,5,I.gold); p(8,5,2,5,I.gold); p(12,5,2,5,I.gold);
      p(3,4,2,1,I.goldHi); p(8,4,2,1,I.goldHi); p(12,4,2,1,I.goldHi);
      p(5,10,1,1,I.red); p(8,10,1,1,I.red); p(11,10,1,1,I.red);
    },
    mentorship(ctx){ const p=P(ctx); // heart + sparkle
      p(4,4,3,2,I.coral); p(9,4,3,2,I.coral); p(3,6,10,3,I.coral);
      p(4,9,8,2,I.coral); p(6,11,4,1,I.coral); p(7,12,2,1,I.coral);
      p(5,5,2,1,I.coralHi);
      p(12,2,1,1,I.gold); p(13,4,1,1,I.gold); p(11,3,1,1,I.goldHi);
    },
    research(ctx){ const p=P(ctx); // magnifying glass
      p(3,2,7,7,I.ink); p(4,3,5,5,I.blue); p(5,3,2,1,I.white);
      p(9,8,2,2,I.ink); p(10,9,2,2,I.ink); p(11,10,3,3,I.ink);
    },
    wireframe(ctx){ const p=P(ctx); // browser wireframe
      p(2,3,12,10,I.ink); p(3,4,10,8,I.cream); p(3,4,10,2,I.teal);
      p(4,7,3,4,I.lav); p(8,7,5,1,I.line); p(8,9,4,1,I.line); p(8,11,3,1,I.line);
    },
    figma(ctx){ const p=P(ctx); // design-tool quad
      p(3,3,5,5,I.coral); p(9,3,4,5,I.purple); p(3,9,5,4,I.teal); p(9,9,4,4,I.green);
      p(4,4,2,1,I.coralHi);
    },
    designsystems(ctx){ const p=P(ctx); // token grid
      const cs=[I.sage,I.gold,I.coral,I.teal,I.purple,I.gold,I.coral,I.sage,I.blue];
      let k=0; for(let j=0;j<3;j++) for(let i=0;i<3;i++){ p(2+i*4,2+j*4,3,3,cs[k++]); }
    },
    interaction(ctx){ const p=P(ctx); // cursor + spark
      p(4,3,1,1,I.ink); p(4,4,2,1,I.ink); p(4,5,3,1,I.ink); p(4,6,4,1,I.ink);
      p(4,7,5,1,I.ink); p(4,8,3,1,I.ink); p(4,9,1,1,I.ink);
      p(7,9,1,3,I.ink); p(8,10,1,2,I.ink);
      p(11,3,1,1,I.gold); p(13,5,1,1,I.gold); p(12,2,1,1,I.goldHi);
    },
    usability(ctx){ const p=P(ctx); // clipboard + check
      p(3,2,10,12,I.ink); p(4,4,8,9,I.cream); p(6,1,4,3,I.ink);
      p(5,8,1,1,I.green); p(6,9,1,1,I.green); p(7,10,1,1,I.green);
      p(8,9,1,1,I.green); p(9,8,1,1,I.green); p(10,7,1,1,I.green);
      p(5,5,6,1,I.line);
    },
    accessibility(ctx){ const p=P(ctx); // person in ring
      p(4,2,8,1,I.teal); p(4,13,8,1,I.teal); p(2,4,1,8,I.teal); p(13,4,1,8,I.teal);
      p(3,3,1,1,I.teal); p(12,3,1,1,I.teal); p(3,12,1,1,I.teal); p(12,12,1,1,I.teal);
      p(3,3,10,10,I.cream); p(4,4,8,8,I.cream);
      p(7,4,2,2,I.blue); p(4,6,8,1,I.blue); p(7,7,2,3,I.blue);
      p(6,10,1,2,I.blue); p(9,10,1,2,I.blue);
    },
    ia(ctx){ const p=P(ctx); // sitemap
      p(6,2,4,3,I.sage); p(7,5,1,2,I.ink); p(3,7,9,1,I.ink);
      p(3,7,1,2,I.ink); p(11,7,1,2,I.ink);
      p(2,9,4,3,I.sage); p(9,9,4,3,I.sage);
    },
    figjam(ctx){ const p=P(ctx); // sticky notes
      p(2,3,7,7,I.gold); p(7,6,7,7,I.pink);
      p(4,5,3,1,I.ink); p(4,7,2,1,I.ink); p(9,8,3,1,I.ink); p(9,10,2,1,I.ink);
    },
    empathy(ctx){ const p=P(ctx); // big heart
      p(4,4,3,2,I.red); p(9,4,3,2,I.red); p(3,6,10,3,I.red);
      p(4,9,8,2,I.red); p(6,11,4,1,I.red); p(7,12,2,1,I.red);
      p(5,5,2,1,I.coralHi);
    },
    pen(ctx){ const p=P(ctx); // fountain pen diagonal
      p(12,2,2,2,I.gold); p(13,1,1,1,I.goldHi);
      for(let k=0;k<7;k++){ p(10-k,4+k,2,2,I.coral); }
      p(11,3,1,1,I.coralHi);
      p(4,10,2,2,I.grip);
      p(14,3,1,1,I.white);
    },
    sketchbook(ctx){ const p=P(ctx); // open notebook + pencil
      p(2,4,12,9,I.ink); p(3,5,5,7,I.cream); p(8,5,5,7,I.cream); p(7,4,2,9,I.ink);
      p(4,7,3,1,I.line); p(4,9,3,1,I.line); p(9,7,3,1,I.line); p(9,9,3,1,I.line);
      p(2,2,7,1,I.gold); p(8,2,1,1,I.coral);
    },
  };

  // makeIcon(key) -> a 16x16 canvas with the icon drawn (transparent bg)
  function makeIcon(key) {
    const c = document.createElement("canvas");
    c.width = 16; c.height = 16;
    c.className = "pix-icon";
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    (ICONS[key] || ICONS.figma)(ctx);
    return c;
  }

  window.SkillIcons = { ICONS, makeIcon, PAL: I };
})();
