// Prepare a function, that is being invoked every time user submits a form. This function validates any (solution is ment to be universal)form according to definition from server. Validation errors are displayed right after losing focus from the form field. Define AJAX call that submits the from data to server. It is not possible to submit the form when there are validation errors.

<script type="text/javascript">

$(document).ready(function() {
    $('inputName, inputEmail, textarea#message').unbind().blur(function() {
        var id = $(this).attr('id');
        var val = $(this).val();
        switch(id) {
            case 'name':
                var rv_name = /^[a-zA-Z]+$/; 
                if(val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('It is OK!')
                        .css('color','green')
                        .animate({'paddingLeft':'10px'},400)
                        .animate({'paddingLeft':'5px'},400);
                } else {
                 $(this).removeClass('not_error').addClass('error');
                 $(this).next('.error-box').html('The field "Name" is required,<br>the name must be at least 2 characters long,<br>the field must contain only latin letters.')
                        .css('color','red')
                        .animate({'paddingLeft':'10px'},400)
                        .animate({'paddingLeft':'5px'},400);
                }
                break;
            case 'email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if(val != '' && rv_email.test(val)) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('It is OK!')
                        .css('color','green')
                        .animate({'paddingLeft':'10px'},400)
                        .animate({'paddingLeft':'5px'},400);
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.error-box').html('The field "Name" is required,<br>the field must contain a valid email address.')
                        .css('color','red')
                        .animate({'paddingLeft':'10px'},400)
                        .animate({'paddingLeft':'5px'},400);
                }
                break;
            case 'message':
                if(val != '' && val.length < 5000) {
                    $(this).addClass('not_error');
                    $(this).next('.error-box').text('It is OK!')
                        .css('color','green')
                        .animate({'paddingLeft':'10px'},400)
                        .animate({'paddingLeft':'5px'},400);
                } else {
                    $(this).removeClass('not_error').addClass('error');
                    $(this).next('.error-box').html('The field "Textarea" is required.')
                        .css('color','red')
                        .animate({'paddingLeft':'10px'},400)
                        .animate({'paddingLeft':'5px'},400);
                }
                break;
        }
    });

    $('form#feedback-form').submit(function(e) {
        e.preventDefault();
        if($('.not_error').length == 3) {
            $.ajax({
                url: 'send.php',
                type: 'post',
                data: $(this).serialize(),
                beforeSend: function(xhr, textStatus) {
                    $('form#feedback-form :input').attr('disabled','disabled');
                },

                success: function(response) {
                    $('form#feedback-form :input').removeAttr('disabled');
                    $('form#feedback-form :text, textarea').val('').removeClass().next('.error-box').text('');
                    alert(response);
                }
            });
        } else {
            return false;
        }
    });
});

</script>