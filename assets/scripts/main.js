'use strict';
function initialize() {
    var myLatlng = new google.maps.LatLng(6.218655, -75.594019);
    var myLatCenter = new google.maps.LatLng(6.218783, -75.597664);

    var mapProp = {
        center: myLatCenter,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
    };

    var map = new google.maps.Map(document.getElementById('content_map'), mapProp);
    var markerImage = new google.maps.MarkerImage('images/logo_ballon.png', new google.maps.Size(60, 60), new google.maps.Point(0, 0), new google.maps.Point(0, 60));

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!',
        icon: markerImage
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

function checkScroll () {
    if ($(window).width() > 800) {
        var x = $(this).scrollTop();
        $('#wrapper').css('background-position', parseInt(x) + 'px' + ' top');

        if ($(document).scrollTop() >= ($('#team').offset().top - 57) && !shown) {
            $('#container').addClass('cx-header-sticky');
            $('.cx-header-sticky > header').hide().slideDown('slow');
            shown = true;
        }

        if ($(document).scrollTop() <= ($('#team').offset().top - 57) && shown) {
            $('#container').removeClass('cx-header-sticky');
            shown = false;
        }
    } else {
        $('#container').removeClass('cx-header-sticky');

        shown = false;   
    }
} 

$(document).on('ready', function () {

    checkScroll();

    $(document).on('scroll', function () {
        checkScroll();
    });

    $(window).on('resize', function () {
        checkScroll();
    });


    $('a[href*=#]:not([href=#])').on('click', function () {

        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            //console.log(target.offset().top);
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 56
                }, 1000);

                return false;
            }
        }
    });


    $('#send_idea').on('submit', function (e) {
        e.preventDefault();

        var form = $(this);

        var data = {
            'email_idea': $('#email_idea').val(),
            'name_idea': $('#name_idea').val(),
            'description_idea': $('#description_idea').val()
        };

        form.find('input,textarea').prop('disabled', true);

        console.log('postin', data);

        $.post(form.prop('action'), data, function (data) {    
                console.log(data)        ;
                //do something with data/response returned by server
                form.find('input,textarea').prop('disabled', false);
                //if (data.status !== 'success') { return; }
                console.log('bienn');
                
                var msg = $('<div>').prop({
                    'style': 'display: none; text-align: center;',
                    'id': 'cx_idea_message'
                }).html('<h5>Ya recibimos tu idea!</h5>');
                $('#submit_wrapper').prepend(msg);
                //$('#submit_wrapper').append(msg);
                console.log($('#submit_wrapper'));
                msg.fadeIn(100);
                form.find('input[type="text"],textarea').val('');
                
                setTimeout(function () {
                    $('#cx_idea_message').fadeOut('slow', function () {
                        $('#cx_idea_message').remove();
                    });
                }, 5000);
            },
            'json'
            );


        
    });


    $('#contact_us').on('submit', function (e) {
        e.preventDefault();

        var form = $(this);

        var data = {
            'contact_email': $('#contact_email').val(),
            'contact_name': $('#contact_name').val(),
            'contact_message': $('#contact_message').val()
        };


        form.find('input,textarea').prop('disabled', true);

        $.post(form.prop('action'), data, function (data) {
                    //do something with data/response returned by server
                    form.find('input,textarea').prop('disabled', false);
                    //if (data.status !== 'success') { return; }

                    var msg = $('<div>').prop({
                        'style': 'text-align: center;',
                        'id': 'cx_contact_message'
                    }).html('<h5>Ya recibimos tu mensaje!</h5>');

                    $('#send_contact_us_info').before(msg);
                    //msg.fadeIn('slow');

                    form.find('textarea').val('');
                    
                    setTimeout(function () {
                        $('#cx_contact_message').fadeOut('slow', function () {
                            $('#cx_contact_message').remove();
                        });
                    }, 5000);
                }, 'json');
    });

});

var shown = false;        