// To handle the appearance of the page when it is loaded !!
let register_page = document.getElementById('register') ;
register_page.style.backgroundColor = "#ffffff" ;
register_page.style.color = "#66717a" ;

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
                $(query).on('click' , function(){
                    $('#not-filled').removeClass('exist-id') ;
                    $('#gender-field').removeClass('move')
                }) ;

            }
            $(query).on('click' , function(){$(query).removeClass('empty')}) ;
        }
        // gender handled in confirm.js where we handle the animations of check boxes
    }
})

