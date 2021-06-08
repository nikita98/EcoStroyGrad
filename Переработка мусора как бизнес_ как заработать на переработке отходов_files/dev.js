$( document ).ready(function() {
    
    changeTabUrl();  
    
    //Баннер в личном кабинете
    $('.single-item').slick({
      infinite: true,
      dots: true
    });
    
    $('.area-search-period .search-from, .area-search-period .search-to').change(function(){
        changeTabUrl();            
    });

    // restore/remove tender
        $('.btn_tender_del_res').click(function(){
            var btn            = $(this);
            var btn_container  = btn.closest('.btn');
            var item_container = btn.closest('.tender-item');
            var mode           = btn.data('mode');
            var item           = btn.data('item');
            var key            = btn.data('key');
            
             $.ajax({
                type: "POST",
                url: '/tenders/?nc_ctpl=431&isNaked=1',
                data: {item: item, mode: mode, key: key },
                dataType: 'json',
                cash: true,
                beforeSend: function(){
                    btn_container.html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
                },
                fail: function(){                    
                    btn_container.html('Ошибка выполнения');                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    btn_container.html('Некорректный ответ');                    
                },
                success: function(data){
                    msg = '';
                    if (typeof data.msg !== "undefined") {
                        msg = data.msg;
                    }  
                    
                    if (typeof data.error !== "undefined") {
                        if(data.error == 1){
                            btn_container.html(msg);
                        } else {                            
                            item_container.html(msg);
                            setTimeout(function() { item_container.remove(); }, 2000);
                        }
                    }
                }
            });
            return false;
        });
    //
    
    
    // subscribe
    $('.btn-subscribe').click(function(){
        var el  = $(this);
        var url = el.attr('href');
        
        $.ajax({
            type: "GET",            
            url: url,
            dataType: 'json',
            success: function(data) {
                el.remove();
                if (typeof data.success !== "undefined") {
                    $(".msg-subscribe").html('<span class="subscr-success">'+data.success+'</span>');
                } else {
                    if (typeof data.error !== "undefined") {
                        $(".msg-subscribe").html('<span class="subscr-error">'+data.error+'</span>');
                    }
                }
                
            },
            error: function() {}
        });
        return false;
    });

    // subscribe
    $('body').on('click', '.cookie_pop span', function() {
        $(".cookie_pop").slideToggle();
        $.cookie('cookie_pop', 'hide', { expires: 365, path: '/'});
        return false;
    });

    //Табуляция новинок в каталоге
    $("#NewEquipCatalogue").delegate("span", "click", function(){
        var img  = $(this).data("img");
        $(".box__catalog-new").css("background-image", 'url(' + img + ')');
        $(".line__catalog-tabs li span").removeClass("active");
        $(this).addClass("active");
        return false;
    })

    //Показать еще категории
    $('.category__list_item .show_more').click(function(){
        var wrapper=$(this).parent(".category__list_item");
        
        $(this).prev().toggleClass("hide_cat")
		
		$(this).toggleClass('active');
        if ($(this).hasClass("active")) {
	        $(this).html("<span>Скрыть</span>");
	    } else {
	        $(this).html("<span>Показать еще</span>");
	    }
        return false;
    })
    
    $('[multiple="multiple"]').multipleSelect({
        placeholder: "Выберите",
        selectAll: false,
        countSelected: "Выбрано: # из %",
        filter: true
    });

    // answer comment show form
    $('.btn-answer-to-comment').click(function(){
        $('.btn-answer-to-comment').html('Ответить');
        $('.form-answer-comment-area form').removeClass('hidden');        
        $('.error-news-message').html('');
        $('.success-news-message').html('');
        
        if($(this).hasClass('commented')){ 
            $(this).removeClass('commented');
            $('.form-answer-comment-area').addClass('hidden');
            $('.form-answer-comment-area form').trigger('reset');
        } else {
            $('.btn-answer-to-comment').removeClass('commented');
            $(this).addClass('commented');
            $(this).html('Отмена');
            var comment_id = $(this).data('comment-id');
            $('.form-answer-comment-area form input[name="f_Parent_Message_ID"]').val(comment_id);

            $('#form-area-'+comment_id).append($('.form-answer-comment-area'));
            $('.form-answer-comment-area').removeClass('hidden');
          
        }
        return false;
    });
    
    // Ã²Ã Ã¡Ã» ÃªÃ®Ã¬Ã¬Ã¥Ã­Ã²Ã Ã°Ã¨Ã¥Ã¢
    $('.c__add').click(function(){
        var selector = $(this).attr('href');
        $('.tab-comment').addClass('hidden');
        $(selector).removeClass('hidden');
        
        return false;
    });
    //Show RightMenu
    $('body').on('click', '.area-load-right-catalog-mnu ul strong', function() {
        
        $(this).siblings("ul").slideToggle('');        
        $(this).slideToggle('');
        
        if($(this).text() == '+'){            
            $(this).toggle(function() { $(this).text('+'); }, function() { $(this).text('—'); });        
        } else {            
            $(this).toggle(function() { $(this).text('-'); }, function() { $(this).text('+'); });
        }
        
        
        if($(this).parent("li").find("ul")){ 
            $(this).find("strong").hide();
        }

        return false;
    });
    
    
    $('.btn__rate-less').click(function(){
        var comment_id = $(this).closest('.comment-item').data('comment-id');
        setVote(comment_id, '-1');
        return false;
    });
    
    $('.btn__rate-more').click(function(){
        var comment_id = $(this).closest('.comment-item').data('comment-id');
        setVote(comment_id, '+1');
        return false;
    }); 

    $('.board-buy-info a').click(function(){
        $.fancybox.close(true);
    }); 
    
    //Переключение табов
    $('.link_reg').click(function(){
        $(".nav-tabs li").toggleClass("active");
    }); 
    
    //Регистрация
    function register_form(){
      $('#regModal').find('#adminFormRegister').ajaxForm( {success: registerShowResponse} ); 
      function registerShowResponse(responseText, statusText, xhr, $form)  { 
        if(responseText.indexOf('registation_ok')==-1){
            $('#regModal').html(responseText);
        }else{
            $('#thanx').modal('show') ;
            $('#auth').modal('hide') ;
            setTimeout('window.location.reload()', 3000);
        }
        register_form();
      };
    };
    
    register_form();
    
    (function($) {
    $(document).ready(function() {
        window.pulse_image = $('.pulse_image');
        window.pulse_continue_loop = true;
        //PulseAnimation(); // start the loop
    });

})(jQuery);

    //add new comment
    $( ".form-new-news-comment" ).submit(function( event ) {
        var form = $(this);
        form.closest('.form-answer-comment-area').find('.error-news-message').html('');
        form.closest('.form-answer-comment-area').find('.success-news-message').html('');
        
        $.ajax({
            type: form.attr('method'),
            url:  form.attr('action')+'?isNaked=1&ajax=1',
            data: form.serialize()
        
        }).done(function(data) {
            if(data.indexOf('nc_error')+1 > 0){
                form.find('.error-news-message').html(data);
                form.closest('.form-answer-comment-area').find('.error-news-message').html(data);
            } else {
                $('.js-box__answer > .title').after(data);
                form.find('.success-news-message').html('Комментарий успешно отправлен.');
                form.closest('.form-answer-comment-area').find('.success-news-message').html('Комментарий успешно отправлен.');
                form.trigger('reset');
                $('.btn-answer-to-comment').removeClass('commented');
                //$('.form-answer-comment-area').addClass('hidden');
                
                form.filter('.form-answer').addClass('hidden');
                $('.btn-answer-to-comment').html('Ответить');
                $('.btn-answer-to-comment').removeClass('commented');
                
                setTimeout(function(){
                    $.fancybox.close();
                    $('.error-news-message').html('');
                    $('.success-news-message').html('');
                }, 2000);
                
                grecaptcha.reset(); 
            }            
        }).fail(function() {
            console.log('fail');        
        });
        
        
        event.preventDefault();
    });
    $('.btn__show-coment').on('click', function () {
        $('.news__comment-box-hide').slideToggle('fast');
        return false;
    })
    $("#share").jsSocials({
      showLabel: false,
      shareIn: "popup",
      shares: ["vkontakte", "twitter", "googleplus"]
  });

//Hide City
$(".toggle__location-js").click(function(){
    $.cookie('location', 'hide', { expires: 365, path: '/'});
});

//Hide City
$(".toggle__location-js.active").click(function(){
    $.cookie('location', 'show', { expires: 365, path: '/'});
});

//Hide Push
$(".subscribe__wrap .btn__close").click(function(){
    $.cookie('push', 'hide', { expires: 14, path: '/'});
    $(".subscribe__wrap").fadeOut('fast');
    return false;
});
$(".sp_notify_prompt").click(function(){
    $.cookie('push', 'hide', { expires: 14, path: '/'});
});

$('.link_reg_open_modal').click(function(){
    $(".nav-tabs li").toggleClass("active");
    $(".tab-pane").toggleClass("active");
    
}); 

//Popup image biz

$(".highslide").fancybox();
$(".company_logo_link").fancybox();

//Ограничить количество симовлов до100
$('.max_100').keyup( function() {
    var $this = $(this);
    if($this.val().length > 100)
    $this.val($this.val().substr(0, 100));           
});


//Phone Mask
$("input.phone").mask('+7 (999) 999-99-99')

//Feedback form
$("#advForm").ajaxForm(function() {
    $.ajax({
        type: "POST",
        data: jQuery("#advForm").serialize(),
        url: "/netcat/add.php",
        beforeSend: function() {
            $.fancybox.close( true );$.fancybox.open('<div class="message" style="text-align:center"><img src="/tm/assets/dev/check.svg" width="100px" height="100px" /><h3>Спасибо!</h3><p>Ваше сообщение отправлено.</p></div>'),$("#feddbackForm button").val("Идет отправка...").attr("disabled", "disabled")
        },
        success: function() {
            $("#advForm").trigger('reset');
            $("#advForm button").val("Отправить").removeAttr("disabled", "disabled");
        },
        error: function() {}
    });
});

// 24.04.2019 // в группе "#feddbackForm, #feddbackForAd, #feddbackForApp" некорректно работает
$('#feddbackForFirm').submit(function(e){
    var form = $(this);
    var btn = form.find('button');
    console.log(1);
    $.ajax({
                type: "POST",
                data: form.serialize(),
                url: "/netcat/add.php",
                beforeSend: function() {
                    $.fancybox.close( true );$.fancybox.open('<div class="message"><h2>Спасибо!</h2><p>Ваше сообщение отправлено.</p></div>'),btn.val("Идет отправка...").attr("disabled", "disabled")
                },
                success: function(date) {
                    form.trigger('reset');                    
                    btn.val("Отправить").removeAttr("disabled", "disabled");
                },
                error: function() {}
    });    
    event.preventDefault();    
});


//KAA 24.02.18
$("#feddbackForm, #feddbackForAd, #feddbackForApp").each(function(index, obj)
    {
    $(obj).ajaxForm(function(obj)
        {
        return function ()
            {
            
            $.ajax({
                type: "POST",
                data: $(obj).serialize(),
                url: "/netcat/add.php",
                beforeSend: function() {
                    $.fancybox.close( true );$.fancybox.open('<div class="message"><h2>Спасибо!</h2><p>Ваше сообщение отправлено.</p></div>'),$("#"+$(obj).attr('id')+" button").val("Идет отправка...").attr("disabled", "disabled")
                },
                success: function(date) {
                    $(obj).trigger('reset');
                    console.log($("#"+$(obj).attr('id')+" button"));
                    $("#"+$(obj).attr('id')+" button").val("Отправить").removeAttr("disabled", "disabled");
                },
                error: function() {}
            });

            }
        }(obj));
    });



//авторизация
    $('body').on('keydown', 'input[type=text],input[type=password]', function() {
        $(this).parents('form').find('input[type=text],input[type=password]').parent().removeClass('error');
        $("p.error").css("display","none");
    });
    $('body').on('click', '.button-auth', function() {
        console.log($(this).parents('form').serialize());
        var definePath = $(this).parents('form').attr('action');
        var needVerify = $(this).parents('form').hasClass('makeAuth');
        var myForm = $(this).parents('form');
        
        var isConfirm = 0;
        var from_url  = myForm.find('input[name="REQUESTED_FROM"]').val();
       	if(from_url.indexOf('confirm.php') + 1) {
            isConfirm = 1;
        } 
        
        
        //обнуляем статусы для полей
        $('.sendletter').parents('form').find('input,textarea').each(function() {
            $(this).parent().removeClass('error');
        });

        //считаем поля
        var getCountofElems = $(this).parents('form').find('input[type=text],input[type=password]').length;
        var startcounter = 0;

        //подсвечиваем поля, из числа незаполненных
        $(this).parents('form').find('input[type=text],input[type=password]').each(function() {
            if ($(this).attr('id') == 'login') {
                if (!$(this).val() && !$(this).hasClass('notreq')) {
                    $(this).parent().addClass('error');
                } else {
                    startcounter++;
                }
            } else {
                if (!$(this).val() && !$(this).hasClass('notreq')) {
                    $(this).parent().addClass('error');
                } else {
                    startcounter++;
                }
            }
        });

        //проверяем все ли были поля заполнены
        if (startcounter == getCountofElems) {
            window.getUrl = $(this).parents('form').attr('action');
            $.ajax({
                type: "POST",
                url: definePath,
                data: $(this).parents('form').serialize(),
                beforeSend: function() {
                    $(".button-auth").html("Авторизоваться").attr("disabled", "disabled");
                },
                success: function(data) {
                    if ($(data).find('#topinfo').length > 0) {                        
                        if(isConfirm == 1){
                            window.location.href = "/";
                        } else {
                            window.location.reload();
                        }
                    } else {
                        $('form#logins input[type=text], form#logins input[type=password]').parent().addClass('error');
                        $("p.error").css("display","block");
                        $(".button-auth").html("Авторизоваться").removeAttr("disabled", "disabled")
                        return false
                    }
                },
                error: function() {
                    window.location.reload()
                }
            })
        }
        return false
    });

});

function setVote(comment_id, type){
    var url      = $('#comment-area').data('vote-url');
    var el_votes = $('#votes-'+comment_id);
    var el_com   = el_votes.closest('.comment-item');
    $('.error-msg').html('');
    
    $.ajax({
      method: "POST",
      url: url,
      dataType: 'json',
      data: { comment_id: comment_id, type: type }
    }).done(function( data ) {
        if (typeof data.error !== "undefined") {
            el_votes.closest('.box__rate').find('.error-msg').html(data.error);           
        } else {
            console.log(1);
            cur_votes = parseInt(el_votes.html());           
            if(type == '-1'){ el_votes.html(cur_votes-1); }
            if(type == '+1'){ el_votes.html(cur_votes+1); } 
            el_com.find('.btn__rate-more').remove();
            el_com.find('.btn__rate-less').remove();             
        }       
    });
    
}

//Подсказки КАА 09.06.2018
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// 09.09.2019
// ajax-форма поиска в каталоге оборудования
    $( document ).ready(function() {
        loadFormSearchContent();
        
        $('body').on('change', '#c', function() {
            setCityPlaseholder();
        });
        
        
        $('body').on('submit', '.form-search', function() {        
            if($('#r').val() == '')       { $('#r').remove(); }
            if($('#c').val() == '')       { $('#c').remove(); }
            if($('#p1').val() == '')      { $('#p1').remove(); }
            if($('#p2').val() == '')      { $('#p2').remove(); }
            if($('#search-t').val() == ''){ $('#search-t').remove(); }
            if($('#mode').val() == '')    { $('#mode').remove(); }
        });
        
        
        
        $('body').on('change', '#r', function() { 
            var href = $('.btn-show-map').attr('href');
            href = href.split('&r=')[0];
            href = href + '&r=' + $(this).val();
            $('.btn-show-map').attr('href', href);
        });
        
        
        
        
        
    });
    
    function loadFormSearchContent(){
    
        if($('.area-form-search-content').length < 1){
            return false; 
        }
        
        var url = $('.area-form-search-content').data('url');
        
        $.ajax( {
            url: url            
        }).done(function( data ) {
            $('.area-form-search-content').html(data);
            $('.js-select').styler();
            
            $('.js-multiple').multipleSelect({
                placeholder: "Выберите",
                selectAll: false,
                countSelected: "Выбрано: # из %",
                filter: true
            });
            
            initAutocompleteText();
            setCityPlaseholder();            
            loadSubSelect();
            
            if($('#r').val() != ''){
                var href = $('.btn-show-map').attr('href');
                href = href.split('&r=')[0];
                href = href + '&r=' + $('#r').val();
                $('.btn-show-map').attr('href', href);
            }
            
        }); 
    }
    
    
    function loadSubSelect(){
        var sub_id = $('#r').val();
        if(sub_id < 1){ return false; }
        get_rubric_search(sub_id, 0);
        
        var selected_rubric_2 = $('.area-form-search-content form').data('selected_rubric_2');
        
        if(selected_rubric_2 > 0){
            setTimeout(function() {                 
                $('#r2').val(selected_rubric_2);
                $('#r2').trigger('change');  
            }, 1100); 
        }
        
        
    }
    
    // поиск по фразе
    function initAutocompleteText(){
        $( "#search-t" ).autocomplete({
            source: function( request, response ) {      
                var r = $("#r option:selected").val();
                var c = $("#c option:selected").val();
                var p1 = $('input[name="p1"]').val();
                var p2 = $('input[name="p2"]').val();
                
                var url = $('.area-form-search-content').data('autocomplete-text');
                
                
                $.ajax( {
                    url: url,
                        dataType: "json",
                        data: {
                            text: request.term,
                            r:r,
                            c:c,
                            p1:p1,
                            p2:p2
                    },
                    success: function( data ) {              
                        response( data );
                    }
                });
            },
            minLength: 2,
            select: function( event, ui ) {      
            }
        
        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        
            // backlighting
            var term = this.term.replace(/(^\s*)|(\s*$)/,"");            
            term = term.split(' ').join('|');        
            var re = new RegExp("(" + term + ")", "gi") ;
            var t = item.label.replace(re,"<b>$1</b>");
    
            return $( "<li>" )
                        .append( "<div class='main__tips'><p>" + t + "&nbsp;&nbsp;<a href='"+item.url+"' class='lnk' title='Перейти' >&rarr;</a><br /><span>в категории " + item.rubric + " ← " + item.parent_rubric + "</span></p></div>" )
                        .appendTo( ul );
        };   
    }
    
    
    function setCityPlaseholder(){
        setTimeout(function() {  
            $('#c').next('.js-multiple').find('.placeholder').html('--город--'); 
        }, 1); 
    }
    
    
    // Выбран раздел
    function get_rubric_search(id, turn){
        $('#r2').prop('disabled', true);
        $.ajax({
            method: 'GET',
            url: '/ajax/get_rubric_items.php',
            data: { 'id' : id, 'turn' : turn }
        })
        .done(function( data ) {
            $('#area_sub_rubric select').html('');
            //$('#area_sub_rubric select').html(data);
            $('#area_sub_rubric select').html('<option value="">--подкатегория--</option>'+data);  
            $('.js-select').styler();
            
            setTimeout(function() {  
              $('select').trigger('refresh');  
            }, 1);
            
            $('#r2').prop('disabled', false);            
        });
    }

$(function () {
        var sub = $('#autocomplete-search').data('sub');
        $('#autocomplete-search').devbridgeAutocomplete({

            serviceUrl: sub+'?isNaked=1&nc_ctpl=526',
            onSelect: function(suggestion) {
                window.location = suggestion.data;
            }
        });
    });
$(function () {
        var sub = $('#autocomplete-search-hedaer').data('sub');
        $('#autocomplete-search-hedaer').devbridgeAutocomplete({
            serviceUrl: sub+'?isNaked=1&nc_ctpl=526',
            onSelect: function(suggestion) {
                window.location = suggestion.data;
            }
        });
    });