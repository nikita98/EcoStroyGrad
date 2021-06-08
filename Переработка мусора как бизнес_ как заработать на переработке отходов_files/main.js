$(function() {
  
  $('.js-select').styler();

  $('.float__map').hide();

  $('#pell').trumbowyg({
    'svgPath': '/tm/assets/img/icons/icons.svg'
  });

  $("[name='phone']").mask('+7 (999) 999-99-99')

  $('.js__slider-xs').slick({
    'slidesToShow': 6,
    'slidesToScroll': 3,
    'dots': true,
    'responsive': [{
      'breakpoint': 991,
      'settings': {
        'slidesToShow': 4
      }
    },{
      'breakpoint': 767,
      'settings': {
        'slidesToShow': 2,
        'slidesToScroll': 2,
      }
    },{
      'breakpoint': 480,
      'settings': {
        'slidesToShow': 1,
        'slidesToScroll': 1,
        'centerMode': false
      }
    }]
  })

  $('.equip-slick').slick({
    'slidesToShow': 4,
    'slidesToScroll': 1,
    'responsive': [{
      'breakpoint': 991,
      'settings': {
        'slidesToShow': 3
      }
    },{
      'breakpoint': 767,
      'settings': {
        'slidesToShow': 2,
      }
    },{
      'breakpoint': 480,
      'settings': {
        'slidesToShow': 1,
      }
    }]
  })

	$('.equip__review-slick').slick({
		'slidesToShow': 1,
		'slidesToScroll': 1,
    'adaptiveHeight': true
	})

  $('.fancy').fancybox();

  $('.toggle__location-js').on('click', function() {
    $('.location__list').toggle('blind', 300);
    $(this).toggleClass('active');
    return false;
  })

  $('.box__nav').on('click', 'li > a', function(e) {
    var b = 'div';

    if($(this).next(b).length > 0) {
      $('.ul__subnav').hide('blind', 200);
      $(this).next(b).slideDown(300);
      $(this).toggleClass('active');
      $(this).closest('[class^="col"]').siblings('[class^="col"]').find('.box__nav li a').removeClass('active')
      $(this).closest('[class^="col"]').siblings('[class^="col"]').find('.ul__subnav').hide('blind', 200);
      $('.cabinet__dropdown').hide(0);
     return false;
    }

  })

  $(document).mouseup(function (e){ // событие клика по веб-документу
    var div = $(".ul__subnav"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
      div.hide('blind', 200);
    }
  });

  $('.box__nav').on('click', 'i', function(e) {
      $(this).closest('li').nextAll('li').find('.subnav__sub').hide('blind', 200)
      $(this).closest('li').prevAll('li').find('.subnav__sub').hide('blind', 200)
      $(this).closest('li').nextAll('li').find('a').removeClass('active')
      $(this).closest('li').prevAll('li').find('a').removeClass('active')
      $(this).closest('a').toggleClass('active');
      $(this).closest('li').find('.subnav__sub').toggle('blind', 200);
      $('.cabinet__dropdown').hide(0);
      return false;
  })

  $('.btn__menu').on('click', function() {
    $('menu').toggle('slide', {'direction': 'right'}, 300);
    /*$('.btn__menu img').toggle(function() {
        $('.btn__menu img').attr('src','/tm/assets/img/ic/ic_menu.png');
    }, function() {
        $('.btn__menu img').attr('src','/tm/assets/dev/ic_menu_close.png');
    });*/

    return false
  })

  $('nav, header, main, footer').on('click', function() {
    $('menu').hide('slide', {'direction': 'right'}, 300);
  })

  if($(window).width() < 768) {
    $('.slick__mobile').slick({
      'centerMode': true,
      'centerPadding': '30px',
      'slidesToShow': 1,
      'arrows': false,
      'dots': true,
      'adaptiveHeight': true
    })
  }

  $('.js-category__list').on('click', function() {
    $(this).toggleClass('active').next('ul').toggle('blind', 300)
    return false;
  })

  $('.list__rate').on('click', 'a', function() {
    $(this).closest('.list__rate').find('li').removeClass('active')
    $(this).closest('li').addClass('active').end().closest('li').prevAll('li').addClass('active')
    return false
  })

  $('[data-provide="datepicker"]').datepicker({
    'language': 'ru'
  })

  $('.card__image').on('click', 'li > a', function() {
    _attr = $(this).find('img').attr('src');
    $('.card__image-main').find('a').attr('href', _attr).end().find('img').attr('src', _attr);
    return false;
  })

  $('.btn__add-coment').on('click', function () {
    $('.news__comment-box').show('blind', {'direction': 'up'}, 300)
    return false
  })

  $('.js-btn__answer').on('click', function () {
    $(this).closest('.js-box__answer').find('.equip__form').show('blind', {'direction': 'up'}, 300)
    return false
  })

  $('.show__tags-all').on('click', function() {
    $(this).closest('ul').find('.tags__none').css('display', 'inline-block');
    $(this).remove()
    return false
  })

  $('.js-auth').on('click', function() {
    $('.cabinet__dropdown').toggle('blind', 300)
    return false
  })

  $('.btn__menu-cabinet').on('click', function() {
    $(this).closest('.cabinet__nav-mobile').find('.cabinet__nav').toggle('slide', {'direction': 'left'}, 300);
    $(this).toggleClass('float__right');
    return false;
  })

  $('.js-p__show').on('click', function() {
    $(this).closest('.pos__relative').siblings('.pos__relative').find('.float__box').hide()
    $(this).next('.float__box').toggle()
    return false;
  })

  var checkClass = function(cls) {
    return cls == 'js-p__show'
  }

  $('body').on('click', function(e) {
    var __arr = Object.values($(e.target)[0].classList);
    if(!__arr.every(checkClass)) {
      $('.float__box').hide(0)
    }
  })

  /*$("#share").jsSocials({
      showLabel: false,
      shares: ["email", "twitter", "googleplus"]
  });*/

})

$(window).on('load resize', function() {
  $('menu').height($(window).height())
})