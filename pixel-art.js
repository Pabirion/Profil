// Pixel-art renderer for Janette + her dachshund companion.
// Drawn at logical resolution and scaled up crisply with image-rendering: pixelated.

(function () {
  "use strict";

  const PAL = {
    out:    "#3b2517", // outline
    hair:   "#6f4327", hairLt: "#8c5a37", hairDk: "#4d2d18", hairHi: "#a06b42",
    skin:   "#f6c894", skinSh: "#e3a06d", skinDk: "#cc8753",
    blush:  "#ec9c87",
    white:  "#fdfaf4", iris: "#7a4a2a", irisLt: "#a06b42", eyeline: "#2c1b12",
    mark:   "#7c4a2b",
    mouth:  "#c4685a", mouthDk: "#a8513f",
    card:   "#e8c84e", cardSh: "#c8a52f", cardHi: "#f6e188", // yellow sweater
    shirt:  "#f5ecd6", shirtSh: "#e2d4b4",                    // cream knit collar
    skirt:  "#2e3a66", skirtSh: "#1f2747", skirtHi:"#46568c", // navy skirt
    tights: "#f6c894", tightsSh:"#e3a06d",
    boot:   "#5c3a23", bootSh:"#46291690", bootHi:"#754a2e",
    penA:   "#e2614a", penASh:"#bd4631", penHi:"#ffd9cf",     // pen barrel coral
    penGold:"#ecb74a", penGoldHi:"#fbe39b", penGrip:"#33424a",
    spark:  "#fff6c8",
    // dog (black & tan dachshund)
    dBlk:   "#241c18", dBlkLt:"#3a2c24", dTan:"#a45f2f", dTanLt:"#c07c40", dTanSh:"#7e4521",
    dNose:  "#15100d", dEye:"#0c0908", dMouth:"#8a4a2a",
    shadow: "#00000022",
  };

  function pxr(ctx) {
    return function (x, y, w, h, c) {
      ctx.fillStyle = c;
      ctx.fillRect(x, y, w, h);
    };
  }
  // pixel-snapped ellipse fill
  function discr(ctx) {
    return function (cx, cy, rx, ry, c) {
      ctx.fillStyle = c;
      for (let y = -ry; y <= ry; y++) {
        for (let x = -rx; x <= rx; x++) {
          if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) {
            ctx.fillRect(cx + x, cy + y, 1, 1);
          }
        }
      }
    };
  }

  // ---- CHARACTER ----
  // Authored on a ~120 wide x 150 tall logical grid. Girl centered near x=58.
  function drawCharacter(ctx) {
    const p = pxr(ctx);
    const disc = discr(ctx);
    const cx = 58;

    // ===== HAIR (back layer) =====
    disc(cx, 38, 25, 24, PAL.hair);
    // long side locks falling to shoulders
    p(34, 38, 9, 38, PAL.hair);
    p(73, 38, 9, 38, PAL.hair);
    p(35, 70, 8, 8, PAL.hairDk);
    p(73, 70, 8, 8, PAL.hairDk);
    // hair shading on the back
    disc(cx, 40, 25, 23, PAL.hair);
    p(34, 50, 6, 26, PAL.hairDk);   // left shadow lock
    p(76, 50, 6, 26, PAL.hairDk);   // right shadow lock

    // ===== FACE =====
    disc(cx, 46, 15, 16, PAL.skin);
    // jaw / chin taper
    p(cx - 6, 60, 12, 3, PAL.skin);
    p(cx - 4, 62, 8, 2, PAL.skinSh);
    // neck
    p(cx - 4, 60, 8, 6, PAL.skin);
    p(cx - 4, 64, 8, 2, PAL.skinSh);
    // face soft shading
    p(44, 50, 2, 8, PAL.skinSh);
    p(70, 50, 2, 8, PAL.skinSh);

    // ===== HAIR (front: curtain bangs, higher hairline) =====
    // top crown
    disc(cx, 32, 23, 12, PAL.hair);
    p(cx - 22, 29, 44, 5, PAL.hair);
    // expose the forehead in the centre between the curtain pieces
    p(cx - 10, 34, 20, 10, PAL.skin);
    // left curtain bang (side piece, sweeps down then curls inward)
    p(cx - 16, 33, 7, 5, PAL.hair);
    p(cx - 17, 38, 7, 7, PAL.hair);
    p(cx - 16, 44, 6, 5, PAL.hair);
    p(cx - 13, 48, 5, 3, PAL.hair);   // inward curl tip
    // right curtain bang (mirror)
    p(cx + 9, 33, 7, 5, PAL.hair);
    p(cx + 10, 38, 7, 7, PAL.hair);
    p(cx + 10, 44, 6, 5, PAL.hair);
    p(cx + 8, 48, 5, 3, PAL.hair);    // inward curl tip
    // side hair continuing down beside the cheeks
    p(40, 44, 5, 18, PAL.hair);
    p(72, 44, 5, 18, PAL.hair);
    // highlights along the curtain sweep
    p(cx - 16, 35, 2, 8, PAL.hairLt);
    p(cx + 10, 35, 2, 8, PAL.hairLt);
    p(48, 26, 8, 2, PAL.hairHi);
    p(73, 45, 2, 13, PAL.hairDk);

    // ===== FACE FEATURES =====
    // eyebrows (short, soft, well separated)
    p(49, 40, 4, 2, PAL.hair);
    p(64, 40, 4, 2, PAL.hair);
    // eyes — medium lids, eyeliner on top
    // left eye
    p(48, 44, 6, 4, PAL.white);
    p(48, 44, 6, 1, PAL.eyeline);   // eyeliner top
    p(47, 44, 1, 1, PAL.eyeline);   // outer flick
    p(49, 45, 3, 3, PAL.iris);
    p(50, 45, 1, 1, PAL.irisLt);
    p(51, 46, 1, 1, PAL.white);     // catchlight
    // right eye
    p(63, 44, 6, 4, PAL.white);
    p(63, 44, 6, 1, PAL.eyeline);
    p(68, 44, 1, 1, PAL.eyeline);   // outer flick
    p(64, 45, 3, 3, PAL.iris);
    p(65, 45, 1, 1, PAL.irisLt);
    p(66, 46, 1, 1, PAL.white);
    // nose hint
    p(58, 51, 1, 1, PAL.skinSh);
    // mouth — small, petit
    p(56, 54, 5, 1, PAL.mouth);
    p(57, 55, 3, 1, PAL.mouthDk);
    // blush
    p(51, 50, 3, 2, PAL.blush);
    p(62, 50, 3, 2, PAL.blush);
    // beauty mark on the cheek
    p(53, 53, 1, 1, PAL.mark);

    // ===== BODY: cozy yellow sweater =====
    // shoulders + torso
    disc(cx, 84, 19, 16, PAL.card);
    p(cx - 18, 70, 36, 22, PAL.card);
    // shoulder shaping
    p(cx - 19, 72, 5, 16, PAL.cardSh);
    p(cx + 14, 72, 5, 16, PAL.cardSh);
    // knit highlight & shadow down the body
    p(cx - 16, 74, 2, 15, PAL.cardHi);
    p(cx + 13, 74, 2, 15, PAL.cardSh);
    // ribbed hem
    p(cx - 18, 89, 36, 3, PAL.cardSh);
    // crew-neck collar (cream knit)
    p(cx - 6, 68, 12, 3, PAL.shirt);
    p(cx - 5, 70, 10, 1, PAL.shirtSh);

    // ===== SKIRT (sage) =====
    p(cx - 16, 92, 32, 12, PAL.skirt);
    p(cx - 18, 100, 36, 6, PAL.skirt);   // flare
    p(cx - 18, 104, 36, 2, PAL.skirtSh);
    // pleats
    p(cx - 10, 94, 1, 11, PAL.skirtSh);
    p(cx - 1, 94, 1, 11, PAL.skirtSh);
    p(cx + 8, 94, 1, 11, PAL.skirtSh);
    p(cx - 14, 93, 2, 8, PAL.skirtHi);

    // ===== LEGS (tights) + BOOTS =====
    p(cx - 9, 106, 7, 16, PAL.tights);
    p(cx + 2, 106, 7, 16, PAL.tights);
    p(cx - 9, 106, 2, 16, PAL.tightsSh);
    p(cx + 2, 106, 2, 16, PAL.tightsSh);
    // boots
    p(cx - 10, 122, 9, 9, PAL.boot);
    p(cx + 1, 122, 9, 9, PAL.boot);
    p(cx - 10, 129, 11, 2, PAL.boot);   // left toe
    p(cx + 1, 129, 11, 2, PAL.boot);    // right toe
    p(cx - 10, 122, 2, 9, PAL.bootHi);
    p(cx + 1, 122, 2, 9, PAL.bootHi);

    // ===== ARMS =====
    // screen-right arm (her left) resting down
    p(cx + 15, 74, 6, 18, PAL.card);
    p(cx + 15, 74, 2, 18, PAL.cardSh);
    p(cx + 15, 90, 6, 5, PAL.skin);      // hand
    // screen-left arm (her right) resting down
    p(cx - 21, 74, 6, 18, PAL.card);
    p(cx - 17, 74, 2, 18, PAL.cardSh);
    p(cx - 21, 90, 6, 5, PAL.skin);      // hand

  }

  // ---- DACHSHUND (black & tan), sitting in profile, facing the character ----
  function drawDog(ctx) {
    const p = pxr(ctx);
    const disc = discr(ctx);
    // positioned to screen-right of the girl, on the floor
    const bx = 86; // body left
    const by = 116; // body top

    // long low body (black back)
    p(bx, by, 26, 9, PAL.dBlk);
    p(bx + 2, by - 1, 22, 1, PAL.dBlk);
    p(bx, by + 8, 26, 2, PAL.dBlkLt); // belly line lighter
    // tan chest/belly
    p(bx, by + 6, 8, 4, PAL.dTan);
    // chest highlight
    p(bx + 1, by + 6, 2, 3, PAL.dTanLt);

    // head (facing left toward girl), tan
    const hx = bx - 9, hy = by - 4;
    disc(hx + 5, hy + 5, 6, 5, PAL.dTan);
    // long snout
    p(hx - 4, hy + 5, 6, 4, PAL.dTan);
    p(hx - 5, hy + 6, 2, 2, PAL.dNose);  // nose
    p(hx - 1, hy + 8, 5, 1, PAL.dTanSh); // mouth line
    // cheek highlight
    p(hx + 2, hy + 3, 5, 2, PAL.dTanLt);
    // floppy black ear
    p(hx + 4, hy - 1, 6, 9, PAL.dBlk);
    p(hx + 5, hy + 6, 5, 3, PAL.dBlkLt);
    // eye
    p(hx + 1, hy + 4, 2, 2, PAL.dEye);
    p(hx + 1, hy + 4, 1, 1, PAL.white);
    // eyebrow tan dots (classic black & tan marking)
    p(hx + 2, hy + 2, 2, 1, PAL.dTanLt);

    // front legs (tan), sitting
    p(bx + 1, by + 9, 3, 8, PAL.dTan);
    p(bx + 1, by + 15, 4, 2, PAL.dTanSh); // paw
    // back leg folded
    p(bx + 18, by + 8, 7, 6, PAL.dBlk);
    p(bx + 19, by + 12, 5, 4, PAL.dTan);
    p(bx + 19, by + 15, 5, 2, PAL.dTanSh); // back paw

    // tail (up, happy)
    p(bx + 25, by - 4, 2, 6, PAL.dBlk);
    p(bx + 26, by - 7, 2, 4, PAL.dBlk);
    p(bx + 27, by - 9, 2, 3, PAL.dTan);
  }

  window.PixelArt = {
    PAL,
    drawCharacter,
    drawDog,
    // draws the full scene (character + dog) onto a transparent canvas of size W x H
    renderScene(canvas) {
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCharacter(ctx);
      drawDog(ctx);
    },
  };
})();
