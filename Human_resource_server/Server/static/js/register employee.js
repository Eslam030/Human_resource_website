// To handle the appearance of the page when it is loaded !!
let register_page = document.getElementById('register') ;
register_page.style.backgroundColor = "#ffffff" ;
register_page.style.color = "#66717a" ;

// Function confirm it is defined in 'confirm.js' which handle
// the registration it is explained there 
let finish = document.getElementById('finish') ;
finish.addEventListener('click' , confirm) ;
