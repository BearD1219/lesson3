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

const tabs = document.querySelectorAll('.catalog__tab');
for (let tab of tabs) {
  tab.addEventListener('click', function(e) {
    console.log(index);
    if (tab.classList.contains('catalog__tab_active')) {
      return;
    } else {
      for(let tab of tabs) {
        tab.classList.remove('catalog__tab_active');
      }
      this.classList.add('catalog__tab_active');
    };
  });
}