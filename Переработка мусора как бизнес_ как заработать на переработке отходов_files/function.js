// загружает боковое меню каталога
function load_right_catalog_menu(sub_id, el){
    //return false;
    var url  = el.data('url');
    var dest = $('.area-load-right-catalog-mnu');
    dest.html('').hide();

    console.log(sub_id, url);
    $.ajax({
        type: "GET",
        url: url,
        cash: true,
        data: {'sub_id':sub_id},
        success: function(html){
            dest.html(html).fadeIn('slow');            
        }
    });
}

// добавляет параметры поиска к табам
function changeTabUrl(){
        var from      = $('.area-search-period').find('.search-from').val();
        var to        = $('.area-search-period').find('.search-to').val();        
        var get_param = '?start='+from+'&end='+to;
        var tabs      = $('.list-tab-types a');
        
        $.each( tabs, function( key, el ) {            
            $(el).attr('href', $(el).attr('data-clearhref')+get_param);            
        }); 
}

//Загрузка последнего оборудования в доске объявлений
function get_last_equip_page() {
      var user = $('#lastEquip').data('user');
      $.ajax({
          type: "GET",
          url: '/russia/catalog/?nc_ctpl=337&isNaked=1',
          cash: true,
          beforeSend: function(){
            $("#lastEquip").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#lastEquip").html(html);
          }
      });
};

//Загрузка последнего оборудования
function get_equip_company_interview() {
      var user = $('#HitEquipCompany').data('user');
      $.ajax({
          type: "GET",
          url: '/russia/catalog/?nc_ctpl=349&isNaked=1',
          cash: true,
          data: "user="+user,
          beforeSend: function(){
            $("#HitEquipCompany").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#HitEquipCompany").html(html);
          }
      });
};

//Загрузка похожих объявлений
function get_smilar_ads(razdel,id) {   
    //var razdel = $('#SimilarAds').data('razdel');
    //id = $('#SimilarAds').data('id');
    $.get('/board/?nc_ctpl=338&isNaked=1',{ razdel: razdel, id: id},
        function(data){
            $('#SimilarAds').html(data);
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
    });    
};

// ЛК: Ваши объявления
function get_my_board(type, page, container_id){
    $.get('/board/?nc_ctpl=368&isNaked=1',{ type: type, curPos:page},
        function(data){
            $('#'+container_id).html(data);
    });   
}

//Загрузка оборудования "Хиты" на главной
function get_equip_main_page_hit() {
      $.ajax({
        type: "GET",
        url: '/russia/catalog/?nc_ctpl=365&isNaked=1',
        cash: true,
        beforeSend: function(){
          $("#loadEquipHit").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
        },
        success: function(html){
           $("#loadEquipHit").html(html);
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
        }
    });
    /*$.get('/russia/catalog/?nc_ctpl=365&isNaked=1',
        function(data){
            $('#loadEquipHit').html(data);
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
    });
    */ 
};

//Загрузка оборудования "Последние" на главной
function get_equip_main_page_last() {
      $.ajax({
          type: "GET",
          url: '/russia/catalog/?nc_ctpl=366&isNaked=1',
          cash: true,
          beforeSend: function(){
            $("#loadEquipLast").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#loadEquipLast").html(html);
          }
      });

    /*
    $.get('/russia/catalog/?nc_ctpl=366&isNaked=1',
        function(data){
            //$('#loadEquipLast').html(data);

    });
    */  
};

//Загрузка объявлений
function get_equip_page() {
  $.ajax({
          type: "GET",
          url: '/board/?nc_ctpl=340&isNaked=1',
          cash: true,
          beforeSend: function(){
            $("#loadAds").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#loadAds").html(html);
          }
      });

    /*
    $.get('/board/?nc_ctpl=340&isNaked=1',
        function(data){
            $('#loadAds').html(data);
        });
    */ 
};


//Загрузка популярного оборудование в каталоге
function get_equip_hit_catalogue() {
  $.ajax({
          type: "GET",
          url: '/russia/catalog/?nc_ctpl=342&isNaked=1',
          cash: true,
          beforeSend: function(){
            $("#loadHitCatalogue").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#loadHitCatalogue").html(html);
          }
      });
};

//Загрузка популярного оборудование в каталоге(баннеры)
function get_equip_new_catalogue() {
     var rubric = $('#NewEquipCatalogue').data('rubric');
     $.ajax({
          type: "GET",
          url: '/russia/catalog/?nc_ctpl=345&isNaked=1',
          data: "rubric="+rubric,
          cash: true,
          beforeSend: function(){
            $("#NewEquipCatalogue").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#NewEquipCatalogue").html(html);
          }
      });
};

//Загрузка похожего оборудование в карточке оборудования
function get_equip_similar_item() {
     var rubric = $('#SimilarEquipment').data('rubric');
         item = $('#SimilarEquipment').data('item');
     $.ajax({
          type: "GET",
          url: '/russia/catalog/?nc_ctpl=350&isNaked=1',
          data: "rubric="+rubric+"&item="+item,
          cash: true,
          beforeSend: function(){
            $("#SimilarEquipment").html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
          },
          success: function(html){
             $("#SimilarEquipment").html(html);
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
          }
      });
};


//Загрузка оборудования компании
function get_equip_company(item, company) {
    var item = $('#equipCompany').data('item');
        company = $('#equipCompany').data('company');
    $.get('/russia/catalog/?nc_ctpl=351&isNaked=1',{ item: item, company: company},
        function(data){
            $('#equipCompany').html(data);
    });    
};

// load compaly equip more. Similar "get_equip_company"
function companyEquipLoadMore(item, company, curPos){            
    $.ajax({
        type: "GET",
        url: '/russia/catalog/?nc_ctpl=351&isNaked=1&isMore=1',
        data: {item: item, company: company, curPos: curPos },
        cash: true,
        beforeSend: function(){
            $('.company-area-preloader').html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
        },
        success: function(data){
            $('.company-area-preloader').after(data).remove();            
        }
    });
    return false;
}


// load compaly board more
function companyBoardLoadMore(user_id, curPos){            
    $.ajax({
        type: "GET",
        url: '/board/?nc_ctpl=387&isNaked=1&isMore=1',
        data: {user_id: user_id, curPos: curPos },
        cash: true,
        beforeSend: function(){
            $('.board-company-area-preloader').html('<img src="/tm/assets/dev/preloader.svg" class="preloader"/>');
        },
        success: function(data){
            $('.board-company-area-preloader').after(data).remove();            
        }
    });
    return false;
}



//Ленивая загрухprf
window.addEventListener("load", function(event) {
    lazyload();
});