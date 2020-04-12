

$(document).ready(function () {
  var modal = $('.modal'),
      modalSuccess = $('.modal__success'),
      modalError = $('.modal__error'),
      modalForm = $('.modal__form'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      scrollMenu = $('.menu__scroll__flex-block'),
      scrollUpBtn = $('.button__scroll-up__flex-block'),
      modalBtnOK = $('.modal__button--OK');
  scrollMenu.addClass('menu__scroll__flex-block--hidden');
  scrollUpBtn.addClass('button__scroll-up__flex-block--hidden');
  
  modalBtn.on('click', function () {
    modal.addClass('modal--visibility');
  });

  modalBtnOK.on('click', function (evt) {
    modalSuccess.removeClass('modal--visibility');
    modalError.removeClass('modal--visibility');
  });

  /*Обработчик события click на кнопку закрытия модального окна.*/
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visibility');
  });

  $(document).on('click', function (evt) {
    if(evt.target.classList.contains('modal')) {
      modal.toggleClass('modal--visibility');
    }
  });

  $(document).on('keydown', function (evt) {
    if(!modal.is(':hidden') && evt.keyCode == 27) {
      modal.removeClass('modal--visibility');
    }
  });
// Модальное окно при успешной отправке
  $(document).on('click', function (evt) {
    if(evt.target.classList.contains('modal__success')) {
      modalSuccess.removeClass('modal--visibility');
    }
  });

  $(document).on('keydown', function (evt) {
    if(!modalSuccess.is(':hidden') && evt.keyCode == 27) {
      modalSuccess.removeClass('modal--visibility');
    }
  });

  // Модальное окно при ошибке отправки
  $(document).on('click', function (evt) {
    if(evt.target.classList.contains('modal__error')) {
      modalError.removeClass('modal--visibility');
    }
  });

  $(document).on('keydown', function (evt) {
    if(!modalError.is(':hidden') && evt.keyCode == 27) {
      modalError.removeClass('modal--visibility');
    }
  });

  $(window).on('scroll', function () {
    if($(window).scrollTop() > 100) {
      if($(window).width() > 992) { scrollMenu.removeClass('menu__scroll__flex-block--hidden');}
      scrollUpBtn.removeClass('button__scroll-up__flex-block--hidden');
    } else {
      scrollMenu.addClass('menu__scroll__flex-block--hidden');
      scrollUpBtn.addClass('button__scroll-up__flex-block--hidden');
    }
  });

  scrollUpBtn.on('click', function () {
    $("html,body").animate({scrollTop:0},500);
  });

  
  $('a[href*="#"]').click(function(evt) {
    $("html,body").animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    $('.burger-menu__line:nth-child(1)').removeClass('first');
    $('.burger-menu__line:nth-child(2)').removeClass('middle');
    $('.burger-menu__line:nth-child(3)').removeClass('last');
    $('.burger__menu').removeClass('menu-active');
    return false;
  });

  
  //Валидация форм
  // Форма модального окна
  $('.modal__form').validate({
    errorElement: "div",
    errorClass: "invalid--modal",
    validClass: "success",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 16,
        maxlength: 16
      }
    },
    messages: {
      userName: {
        required: "Пожалуйста, укажите имя",
        minlength: "Имя не должно быть короче двух символов",
        maxlength: "Имя не должно быть длиннее пятнадцати символов"
      },
      userPhone: {
        required: "Пожалуйста, укажите номер телефона",
        minlength: "Некорректный номер телефона",
        maxlength: "Некорректный номер телефона"
      }
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          modal.removeClass('modal--visibility');
          modalSuccess.addClass('modal--visibility');
          $(form)[0].reset();
        },
        error: function (response) {
          modal.removeClass('modal--visibility');
          modalError.addClass('modal--visibility');
          $(form)[0].reset();
        }
      });
    }
  });
  //Форма блока расчет стоимости
  $('.cost-calc__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    validClass: "success",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userEmail: {
        required: true,
        email: true
      },
      userSite: 'required',
      userMessage: 'required'
    },
    messages: {
      userName: {
        required: "Пожалуйста, укажите имя",
        minlength: "Имя не должно быть короче двух символов",
        maxlength: "Имя не должно быть длиннее пятнадцати символов"
      },
      userEmail: {
        required: "Пожалуйста, укажите E-mail",
        email: "Email ожидается в формате name@domain.com"
      },
      userSite: "Пожалуйста, укажите адрес сайта",
      userMessage: "Пожалуйста, заполните текст сообщения"
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          modal.removeClass('modal--visibility');
          modalSuccess.addClass('modal--visibility');
          $(form)[0].reset();
        },
        error: function (response) {
          modal.removeClass('modal--visibility');
          modalError.addClass('modal--visibility');
          $(form)[0].reset();
        }
      });
    }
  });


  //Валидация формы footer
  $('.question__form').validate({
    errorElement: "div",
    errorClass: "invalid",
    validClass: "success",
    rules: {
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userEmail: {
        required: true,
        email: true
      },
      userPhone: {
        required: true,
        minlength: 16,
        maxlength: 16
      },
      userMessage: "required"
    },
    messages: {
      userName: {
        required: "Пожалуйста, укажите имя",
        minlength: "Имя не должно быть короче двух символов",
        maxlength: "Имя не должно быть длиннее пятнадцати символов"
      },
      userEmail: {
        required: "Пожалуйста, укажите E-mail",
        email: "Email ожидается в формате name@domain.com"
      },
      userPhone: {
        required: "Пожалуйста, укажите номер телефона",
        minlength: "Некорректный номер телефона",
        maxlength: "Некорректный номер телефона"
      },
      userMessage: "Пожалуйста, напишите свой вопрос"
    },
    submitHandler: function (form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          modalSuccess.addClass('modal--visibility');
          $(form)[0].reset();
        },
        error: function (response) {
          modalError.addClass('modal--visibility');
          $(form)[0].reset();
        }
      });
    }
  });
// YouTube видеоплеер
  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '434',
      width: '100%',
      videoId: 'g8Oi3LaTD5s',
      events: {
        'onReady': onPlayerReady
      }
    });
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }
// слайдер блока cases
  var casesCountImg = $('.cases__slider__image__container')[0].childElementCount;
  var casesGallery = [];
  var i = 0;
  var casesCurrentImage = 0;
  $('.cases__slider__image').each(function () {
    casesGallery[i] = $(this);
    if(i != casesCurrentImage) {casesGallery[i].hide();}
    i++;
  });

  $('.cases__slider__button__left').on('click', function () {
    casesGallery[casesCurrentImage--].hide(0);
    if(casesCurrentImage < 0) { casesCurrentImage = casesCountImg - 1;}
    $(casesGallery[casesCurrentImage]).show(0);
  });

  $('.cases__slider__button__right').on('click', function () {
    casesGallery[casesCurrentImage++].hide(0);
    if(casesCurrentImage == casesCountImg) { casesCurrentImage = 0;}
    $(casesGallery[casesCurrentImage]).show(0);
  });
  
  // слайдер блока reviews
  var reviewsCountCard = $('.reviews__slider__card__container')[0].childElementCount;
  var reviewsList = [];
  var j = 0;
  var reviewsCurrentCard = 0;
  $('.reviews__slider__card').each(function () {
    reviewsList[j] = $(this);
    if(j != reviewsCurrentCard) {reviewsList[j].hide();}
    j++;
  });

  $('.reviews__slider__button__left').on('click', function () {
    reviewsList[reviewsCurrentCard--].hide(0);
    if(reviewsCurrentCard < 0) { reviewsCurrentCard = reviewsCountCard - 1;}
    $(reviewsList[reviewsCurrentCard]).show(0);
  });

  $('.reviews__slider__button__right').on('click', function () {
    reviewsList[reviewsCurrentCard++].hide(0);
    if(reviewsCurrentCard == reviewsCountCard) { reviewsCurrentCard = 0;}
    $(reviewsList[reviewsCurrentCard]).show(0);
  });

  // слайдер блока news
  var newsCountCard = $('.news__slider__card__container')[0].childElementCount;
  var newsList = [];
  var k = 0;
  var newsCurrentCard = 0;
  $('.news__slider__card').each(function () {
    newsList[k] = $(this);
    if(k != newsCurrentCard) {newsList[k].hide();}
    k++;
  });


  $('.news__slider__button__left').on('click', function () {
    newsList[newsCurrentCard--].hide(0);
    if(newsCurrentCard < 0) { newsCurrentCard = newsCountCard - 1;}
    $(newsList[newsCurrentCard]).show(0);
  });

  $('.news__slider__button__right').on('click', function () {
    newsList[newsCurrentCard++].hide(0);
    if(newsCurrentCard == newsCountCard) { newsCurrentCard = 0;}
    $(newsList[newsCurrentCard]).show(0);
  });
  // Маска для номера телефона
  $('[type=tel]').mask('+7 000 000-00-00');

  // Бургер-меню
  $('.burger-menu').click(function () {
    $('.burger-menu__line:nth-child(1)').toggleClass('first');
    $('.burger-menu__line:nth-child(2)').toggleClass('middle');
    $('.burger-menu__line:nth-child(3)').toggleClass('last');
  });
  $('.burger-menu').click(function(){
    $('.burger__menu').toggleClass('menu-active');
  });
});