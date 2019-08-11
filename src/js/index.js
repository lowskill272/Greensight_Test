import Inputmask from "inputmask";
import $ from 'jquery';
import '../scss/style.scss';

//
var im = new Inputmask("+7(999)999-99-99");
im.mask('#phone');

$(document).ready(function() {

  var mql = window.matchMedia('screen and (max-width: 768px)');

  $('#first-form').submit(function(e) {
    e.preventDefault();
    var fio = $('#fio').val();
    var phone = $('#phone').val();
    var adress = $('#adress').val();

    $(".error").remove();

    if (adress.length< 1) {
      $('#adress').after('<span class="error">Error message</span>');
      $('#adress').css('border-color', 'red');
    } else {
      $('#adress').css('border-color', '#dadef0');
    }
    if (phone.length< 1) {
      $('#phone').after('<span class="error">Error message</span>');
      $('#phone').css('border-color', 'red');
    } else {
      $('#phone').css('border-color', '#dadef0');
    }
    if (fio.length< 1) {
      $('#fio').after('<span class="error">Error message</span>');
      $('#fio').css('border-color', 'red');
    } else {
      var regEx = /^[а-яА-ЯёЁ]/;
      var validfio = regEx.test(fio);
      if (!validfio) {
        $('#fio').after('<span class="error">Error message</span>');
        $('#fio').css('border-color', 'red');
      } else {
        $('#fio').css('border-color', '#dadef0');
      }
    }
  });

  ymaps.ready(init);
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.76474533, 37.47631356],
            zoom: 10
        },{
          searchControlProvider: 'yandex#search'
        }),


        objectManager = new ymaps.ObjectManager({
            gridSize: 32,
        });


        objectManager.objects.options.set({
          iconLayout: 'default#image',
          iconImageHref: './src/images/custom_placemark.png',
          iconImageSize: [40, 40],
          iconImageOffset: [-20, -40]
        });

        // myMap.setBounds(objectManager.getBounds());

        $.ajax({
          url: "data.json"
        }).done(function(data) {
          objectManager.add(data);
        });
        myMap.geoObjects.add(objectManager);

        function adaptive_map(mql){
          if (mql.matches) {
            myMap.behaviors.disable('scrollZoom');
            myMap.behaviors.disable('drag');
          } else {
            myMap.behaviors.enable('scrollZoom');
            myMap.behaviors.enable('drag');
          }
        }

        mql.addListener(adaptive_map);

        adaptive_map(mql);

    }

    $(window).on('resize', function(){
          var win = $(this);
          if (win.width() < 768) {
            if ($("#tab2").prop("checked")){
              $('#tab2-mobile').prop('checked', 'checked');
            }
          }

          if (win.width() >= 768) {
            if ($("#tab2-mobile").prop("checked")){
              $('#tab2-mobile').prop('checked', false);
              $("#tab2").prop('checked', 'checked');
            }
          }
    });

  function adaptive_tabs(mql){
    if (mql.matches) {
      $('#label1').click(function(e){
        e.preventDefault();
        var $check = $(this).prev();
        if($check.prop('checked'))
          $check.prop( "checked", false );
          else
          $check.prop( "checked", true );
        });

        $('#label2-mobile').click(function(e){
          e.preventDefault();
          var $check = $(this).prev();
        if($check.prop('checked'))
          $check.prop( "checked", false );
          else
          $check.prop( "checked", true );
        });
      } else {
        $('#label1').off('click');
        $('#label2-mobile').off('click');
      }
    }

    mql.addListener(adaptive_tabs);

    adaptive_tabs(mql);

});
