/* ---- Lottie registry --------------------------------------------------------------
   Shared by the picker (../index.html, "Lottie" tab) and the player (player.html).
   To add an animation: put its files in animations/<slug>/ and add one entry below.

   slug     folder name = file name, lowercase-kebab-case
   title    sentence case, short
   desc     one line: what happens in the animation
   json     Lottie JSON played by the player (relative to animations/<slug>/)
   lottie   optional .lottie (dotLottie) file kept for hand-off (not shown in the player)
   preview  still thumbnail shown on the picker (never an animation)
   intro    [start, end] frames, played once        } omit both for a one-shot
   loop     [start, end] frames, looped seamlessly  } animation (plays once, holds)
   success  coin-style two-part animation: `json` loops until "Show success",
            then this file plays once from the end of the current loop
   scale    optional, 0–1: size of the animation inside the stage (default 1)
   gsap     optional GSAP version of the same animation: ES module (inline SVG + timeline)
            exporting create…(container, { autoplay }) — shown under the player's "GSAP" tab
   gsapSuccess  GSAP module for the success part (coin-style animations)
*/
window.LOTTIES = [
  /* none yet — first animation goes here, e.g.
  {
    slug: 'credit-approved',
    title: 'Credit approved',
    desc: 'One line: what happens in the animation.',
    json: 'credit-approved.json', lottie: 'credit-approved.lottie', preview: 'preview.png',
    intro: [0, 36], loop: [36, 96]
  }
  */
];
