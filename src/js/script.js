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

// MODALS
// const buttons = document.querySelectorAll('[data-modal]');
// const overlay = document.querySelector('.overlay');
// const closeButtons = document.querySelectorAll('.modal__close');
// let currentModal;

// for (let button of buttons) {
//     button.addEventListener('click', () => {
//         overlay.classList.add('overlay_active');
//         currentModal = document.querySelector(button.getAttribute('data-modal'));
//         currentModal.style.display = "block";

//         for (let closeButton of closeButtons) {
//             document.addEventListener('click', (e) => {
//                 if (e.target == overlay || closeButton) {
//                     currentModal.style.display = "none";
//                     overlay.classList.remove('overlay_active');
//                 } else {
//                     console.log('ЖОПА');
//                 }
//             });
//         }
//     });
// } 
$('[data-modal]').on('click', (e) => {
    let modalCurr = $(e.target).data('modal');
    let parent = $(e.target).parent().siblings()[0];
    let itemName = $(parent).find('.catalog__name').text();
    $(`${modalCurr}, .overlay`).fadeIn('slow');

    if(modalCurr == "#order") {
        $(`${modalCurr} > .modal__subtitle`).text(itemName);
    }
});

$('.modal__close').on('click', () => {
    $('.overlay, #consultation, #order, #info').fadeOut('slow');
});

// VALIDATION 
function validateForm(form) {
    $(form).validate({
        rules: {
            name: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: "Обязательное поле для заполнения",
            phone: "Обязательное поле для заполнения",
            email: {
                required: "Обязательное поле для заполнения",
                email: "Некорректный почтовый адрес"
            }
        }
    });
}

validateForm('.consultation form');
validateForm('#consultation form');
validateForm('#order form');

// TELEPHONE MASK
$("[name = phone]").mask("+7 (999) 999-99-99");

// MAILER
$('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find('input').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #info').fadeIn('slow');
        $('form').trigger('reset');
    });
    return false;
});