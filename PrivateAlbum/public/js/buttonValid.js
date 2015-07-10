
 function buttonState(){
    $("input").each(function(){
        $('#loginButton').attr('disabled', 'disabled');
        if($(this).val() == "" ) return false;
        $('#loginButton').attr('disabled', '');
    })
}

$(function(){
    $('#loginButton').attr('disabled', 'disabled');
    $('input').change(buttonState);
})

