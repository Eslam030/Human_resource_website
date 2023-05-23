function confirm () {
    let allgood = true ;
    let fields = ['name' , 'email' , 'id' , 'phone-number' ,
    {'radio' : ['male' , 'female']} , 'available-vacations' ,
    'actual-vacations' , 'status' , 'salary' , 'date-of-birth']  ;
    let data = {} ;
    for (let i = 0 ; i < fields.length ; i++){
        if (typeof fields[i] === 'string'){
            let field = document.getElementById(fields[i]) ;
            if (fields[i] === 'status'){
                if (field.innerHTML === 'Marital'){
                    allgood = false ;
                }else {
                    data['marital-status'] = field.innerHTML ;
                }
            }else {
                if (field.value.length === 0){
                    allgood = false ;
                }else {
                    data[fields[i]] = field.value ;
                }
            }
        }else {
            let btns = fields[i]['radio'] , checked = false ;
            for (let i = 0 ; i < btns.length ; i++){
                if (document.getElementById(btns[i]).checked){
                    data['gender'] = btns[i] ;
                    checked = true ;
                    break ;
                }
            }
            if (!checked){
                allgood = false ;
            }
        }
        
    }
    console.log(allgood) ;
    if (allgood){
        let title = document.getElementById('Title').innerHTML  ;
        console.log(title) ;
        if (title === "Register new employee"){
            if (addData(data['name'] , data['id']))  {
                if (!window.localStorage['data']){
                    window.localStorage.setItem('data' , '{}') ;
                }
                let Jdata = JSON.parse (window.localStorage['data']) ;
                Jdata[data['id']] = data ;
                window.localStorage['data'] = JSON.stringify(Jdata) ; 
                document.getElementById('Register-form').submit() ;
            }
        }else {
            update_data(data['name'] , data['id']) ;
            if (!window.localStorage['data']){
                window.localStorage.setItem('data' , '{}') ;
            }
            let Jdata = JSON.parse (window.localStorage['data']) ;
            Jdata[data['id']] = data ;
            window.localStorage['data'] = JSON.stringify(Jdata) ; 
            window.open('main page.html' , '_self') ;
        }
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
            handle_radio() ;
        }) ;
    }
}
