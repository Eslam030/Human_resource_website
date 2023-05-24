let _data = {
    'name' : null  ,
    'email' : null ,
    'id' : null , 
    "phone-number" : null ,
    "gender" : null ,
    "employee-marital" : null ,
    "salary" : null ,
    "available-vacations" : null ,
    "actual-vacations" : null ,
    'date-of-birth' : null
}
function emptyData (){
    for (x in _data) {
        x = null ;
    }
}
function checkAllData () {
    // this will check that the data isn't null 
    for (item in _data) {
        if (_data[item] == "" || _data[item] == null) {
            return false ;
        }
    }
    return true ;
}
function confirm () {
    emptyData() ;
    $(document).ready(function(){
        _data['name'] = $('#name').val() ;
        _data['email'] = $('#email').val() ;
        _data['id'] = $('#id').val();
        _data['phone-number'] = $('#phone-number').val() ;
        _data['available-vacations'] = $('#available-vacations').val() ;
        _data['actual-vacations'] = $('#actual-vacations').val() ;
        _data['salary'] = $('#salary').val() ;
        _data['date-of-birth'] = $('#date-of-birth').val() ;
        let gender = $('#radio').children() ;
        if ( gender[1].children[1].checked) {
            _data['gender'] = 'male' ;
        }else if (gender[2].children[1].checked){
            _data['gender'] = 'female' ;
        }
        if ($('#status').html() != 'Marital') {
            _data['employee-marital'] = $('#status').html() ;
        }
    })
    if (checkAllData()){
        $(document).ready(function(){
            // get data
            $.ajax({
                url : post ,
                method : 'POST' ,
                data : JSON.stringify(_data) , 
                success : function(response){
                    // handle response 
                    // and if it is all good return the user to tha main page
                    if (response['message'] == "exist") {
                        $('#gender-field').addClass('move')
                        setTimeout(function (){
                            $('#not-filled').addClass('exist-id') ;
                        } , 200) ;
                    }else {
                        window.location.href = main;
                    }
                } ,
                error : function(xhr , errmsg , err){
                    console.log('Failed')
                }
            })
        })
    }else {
        for (item in _data) {
            if (_data[item] == "" || _data[item] == null) {
                if (item != 'gender') {
                    $('#'+item).addClass('empty') ;
                }else {
                    $('#not-filled').addClass('empty-gender') ;
                }
            }
        }
        console.log("FUCK PROGRAMMING") ;
    }
}
function isDigit (word){
    return (word.charCodeAt(word.length - 1) >= 48 && word.charCodeAt(word.length - 1) <= 57) ;
}
function handle_input(id){
    let numeric = ["id" , "phone-number" , "available-vacations" , "actual-vacations" , "salary"]
    let input = document.getElementById(id) ,
    modified_text , text ;
    input.addEventListener('input' , ()=>{
        if (numeric.includes(id)){
        text = input.value ;
            if (!isDigit(text)){
                modified_text = text.slice(0 , text.length - 1) ;
                input.value = modified_text;
            }
        }
        text = input.value ;
    }) ;
}

handle_input('name') ;
handle_input('email') ;
handle_input('id') ;
handle_input('phone-number') 
handle_input('available-vacations') 
handle_input('actual-vacations') 
handle_input('salary') ;

let martails = document.getElementById('Martial-list').children ;
for (let i = 0 ; i < martails.length ; i++){
    martails[i].addEventListener ('click' , () => {
        document.getElementById('status').innerHTML = martails[i].innerHTML ;
        if (document.getElementById('status').innerHTML != "Marital"){
            document.getElementById('status').style.color = "#000000" ;
        }
        document.getElementById('Martial-list').style.display = "none" ;
    })
} ; 
let control = document.getElementById('control-selections') ;
control.addEventListener('mouseover' , () => {
    document.getElementById('Martial-list').style.display = "block" ;
})
control.addEventListener('mouseleave' , () => {
    document.getElementById('Martial-list').style.display = "none" ;
}) ;

let date = document.getElementById('date-of-birth') ;
date.addEventListener('input' , () => {
    if (date.value.length == 0){
        date.style.color = "#9b9b9b" ;
    }else {
        date.style.color = "#000000" ;
    }
});
if (date.value.length == 0){
    date.style.color = "#9b9b9b" ;
}else {
    date.style.color = "#000000" ;
}

function check (radio){
    radio.children[0].children[0].style.display = "block" ;
}
function uncheck (radio) {
    radio.children[0].children[0].style.display = "none" ;
}
function handle_radio (){
    let radio = document.getElementById('radio').children , 
    radio_btn ;
    for (let i = 0 ; i < radio.length ; i++){
        if (radio[i].tagName === "DIV"){
            radio_btn = radio[i].children[1] ;
            if (radio_btn.checked){
                check(radio[i]) ;
            }else {
                uncheck(radio[i]) ;
            }
        }
    }
}
let radio = document.getElementById('radio').children ;
for (let i = 0 ; i < radio.length ; i++){
    if (radio[i].tagName === "DIV"){
        let radio_btn = radio[i].children[1] ;
        radio[i].addEventListener('click' , () => {
            radio_btn.checked = true;
            $(document).ready(function (){
                $('#not-filled').removeClass('empty-gender') ;
            })
            handle_radio() ;
        }) ;
    }
}
