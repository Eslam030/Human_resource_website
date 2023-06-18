// To handle the appearance of the page when it is loaded !!
$('#register').css('background' , "#ffffff") ;
$('#register').css('color' , "#66717a") ;

// Function confirm it is defined in 'confirm.js' which handle
// the registration it is explained there 
let finish = document.getElementById('finish') ;
finish.addEventListener('click' , confirm) ;

// add events to each text field to clear the red border when it is clicked
$(document).ready(function(){
    for (item in _data) {
        if (item !== 'gender') {
            let query = '#' + item ;
            if (item == 'id'){
                $(query).on('input' , function(){
                    $('#id-exist').removeClass('exist-id') ;
                    $('#gender-field').removeClass('move')
                }) ;
            }else if (item == 'employee-marital') {
                $('#Martial-list').on('click', function(){
                    $(query).removeClass('empty')
                }) 
            }
            $(query).on('input' , function(){
                if ($(this).val() !== ""){
                    $(query).removeClass('empty')
                }
                $(query).removeClass('empty')
            }) ;
        }
        // gender handled in confirm.js where we handle the animations of check boxes
    }
})

