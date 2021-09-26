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

// TABS
$(function() {    
  $('.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this).addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active');
    $(this).closest('.container').find('.catalog__wrap').removeClass('catalog__wrap_active').eq($(this).index()).addClass('catalog__wrap_active');
  });
});

// CARDS
function toggleSlide (item) {
  $(item).each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog__item-content').eq(i).toggleClass('catalog__item-content_active');
      $('.catalog__item-descr').eq(i).toggleClass('catalog__item-descr_active');
    });
  });
}

toggleSlide('.catalog__link');
toggleSlide('.catalog__link-back');