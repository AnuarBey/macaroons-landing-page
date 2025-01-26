$(document).ready(function () {
    //burger
    $('#burger').click(function () {
        $('#menu').addClass('open');
    });

    $('#menu > *').click(function () {
        $('#menu').removeClass('open')
    });

    let name = $('#name');
    let productName = $('#product-name');
    let phoneInput = $('#phone-number');

    $('.macaroon__btn').click((e) => {
        productName.val($(e.target).parents('.macaroon').find('.macaroon__title').text().trim());
        $('#order')[0].scrollIntoView({behavior: "smooth"});
    })



    //маска для телефона
    phoneInput.inputmask({"mask": "(999) 999 - 99- 99"});

    //
    let loader = $('.loader');
    let form = $('#form');
    $('#submit').click(function (event) {
        event.preventDefault();

        let hasError = false;


        $('.error__input').hide();
        $('#product-name, #name, #phone-number').css('border-color', '');

        if (!productName.val()) {
            productName.next().show();
            productName.css('border-color', 'red');
            hasError = true;
        }
        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        }
        if (!phoneInput.val())  {
            phoneInput.next().show();
            phoneInput.css('border-color', 'red');
            hasError = true;
        }


    if(!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: { product_name: productName.val(), name: name.val(), phone_input: phoneInput.val() }
        })
            .done(function( msg ) {
                loader.hide();
                if(msg.success) {
                    $('#form').hide();
                    $('#success-message').css('display', 'flex').show();
                    form.trigger('reset');
                    setTimeout(function () {
                        $('#form').show();
                        $('#success-message').hide();
                    },10000);
                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ")
                    form.trigger('reset');
                }
                console.log(msg);
            });
    }
    })
});

