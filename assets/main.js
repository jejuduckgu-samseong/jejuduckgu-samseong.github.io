// Scroll motion for the home page. Content is fully visible without this file.
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('gsap');
  var mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', function () {
    // Pinned split: keep the menu title in view while the cards scroll past
    var split = document.querySelector('.split');
    if (split) {
      ScrollTrigger.create({ trigger: split, start: 'top 110px', end: 'bottom bottom', pin: '.pin-col', pinSpacing: false });
    }
    // Card stacking: each card recedes as the next one slides over it
    var cards = gsap.utils.toArray('.stack-card');
    cards.forEach(function (card, i) {
      if (i === cards.length - 1) return;
      gsap.to(card.querySelector('.stack-inner'), {
        scale: 0.94, opacity: 0.55, ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 120px', scrub: true }
      });
    });
  });
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
