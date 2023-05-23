let employee_page = document.getElementById('employee') ;
employee_page.style.backgroundColor = "#ffffff" ;
employee_page.style.color = "#66717a" ;

function disable_edit () {
    document.getElementById('name').disabled = true ;
    document.getElementById('email').disabled = true ;
    document.getElementById('id').disabled = true ;
    document.getElementById('phone-number').disabled = true ;
    document.getElementById('available-vacations').disabled = true ;
    document.getElementById('actual-vacations').disabled = true ;
    document.getElementById('salary').disabled = true ;
    document.getElementById('gender').disabled = true ;
    document.getElementById('date-of-birth').disabled = true ;
    document.getElementById('employee-in-marital').classList.add ('selection-disable') ;
    document.getElementById('status').classList.add ('selection-disable') ;
    document.getElementById('status').style.color = "rgb(84, 84, 84)";
    document.getElementById('date-of-birth').style.color = "rgb(84, 84, 84)";
    document.getElementById('Martial-list').className = "disable" ;
    document.getElementById('control-selections').classList.add ('selection-disable') ;
    document.getElementById('gender-control2').classList.remove('disable')
    document.getElementById('gender-control1').classList.add('disable') ;
    document.getElementById('confirm-finish').classList.add('disable') ;

}
function allow_edit (){
    document.getElementById('name').disabled = false ;
    document.getElementById('email').disabled = false ;
    document.getElementById('id').disabled = false ;
    document.getElementById('phone-number').disabled = false ;
    document.getElementById('available-vacations').disabled = false ;
    document.getElementById('actual-vacations').disabled = false ;
    document.getElementById('salary').disabled = false ;
    document.getElementById('gender').disabled = false ;
    document.getElementById('date-of-birth').disabled = false ;
    document.getElementById('employee-in-marital').classList.remove ('selection-disable') ;
    document.getElementById('status').classList.remove ('selection-disable') ;
    document.getElementById('status').style.color = "#000000";
    document.getElementById('Martial-list').className = "list" ;
    document.getElementById('control-selections').classList.remove ('selection-disable') ;
    document.getElementById('gender-control1').classList.remove('disable')
    document.getElementById('gender-control2').classList.add('disable') ;
}
disable_edit() ;

document.getElementById('update-finist').addEventListener('click' , () => {
    document.getElementById('confirm-finish').classList.remove('disable') ;
    allow_edit() ;
    handle_radio() ;
    document.getElementById('update-finist').classList.add('disable') ;
})


//accsses the data 
if (window.localStorage['appear_delete'] === 'false'){
    document.getElementById('delete-finish').classList.add('disable') ;
}

let data = JSON.parse(window.localStorage['data'])[window.localStorage['current_id']];
document.getElementById('name').value = data['name'] ;
document.getElementById('email').value = data['email'] ;
document.getElementById('id').value = data['id'];
document.getElementById('phone-number').value = data['phone-number'] ;
document.getElementById('available-vacations').value = data['available-vacations'] ;
document.getElementById('actual-vacations').value = data['actual-vacations'] ;
document.getElementById('salary').value = data['salary'] ;
document.getElementById('gender').value = data['gender'] ;
document.getElementById(data['gender']).checked = true ;
document.getElementById('status').innerHTML = data['marital-status'] ;
document.getElementById('date-of-birth').value = data['date-of-birth'] ;


document.getElementById('confirm-finish').addEventListener ('click' , confirm) ;

document.getElementById('delete-finish').addEventListener('click' , ()=> {
    delete_user(data['name'] ,data['id']) ;
    window.open('main page.html' , '_self') ;
})