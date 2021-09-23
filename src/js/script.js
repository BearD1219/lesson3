// SWIPER
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    grabCursor: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
});
