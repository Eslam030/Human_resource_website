let delete_page = document.getElementById('vacation-form') ;
delete_page.style.backgroundColor = "#66717a" ;
delete_page.style.color = "#ffffff" ;
delete_page.style.borderRadius = "10px" ; 
let employee_page = document.getElementById('vacation') ;
employee_page.style.backgroundColor = "#ffffff" ;
employee_page.style.color = "#66717a" ; 



function check_data () {
    let vacation_data = {} ,
    data = JSON.parse(window.localStorage['data']) , 
    names = JSON.parse(window.localStorage['names'])
    from = document.getElementById('From').value ,
    to = document.getElementById('To').value ,
    number = document.getElementById('number-of-vacations').value , 
    reason = document.getElementById('Reason').value ;
    if (reason.length < 0) {
        return false ;
    }
    if (to.length < 0){
        return false ;
    }
    if (from in names){
        if (number.length > 0){
        let number_of_vacations = parseInt(number) ;
        let available = parseInt(data[names[from]]['available-vacations']) ;   
        if (available >= number_of_vacations){
            available -= number_of_vacations ;
            data[names[from]]['available-vacations'] = available ;
            let id = parseInt(window.localStorage['final-id'] ) + 1 ;
            let start = parseInt(window.localStorage['start'] ) + 1
            let vacations = JSON.parse(window.localStorage['vacations']) ;
            vacation_data['from'] = from ;
            vacation_data['to'] = to ;
            vacation_data['reason'] = reason ;
            vacation_data['duration'] = number ;
            vacation_data['id'] = id ;
            vacations[id] = vacation_data ;
            window.localStorage['vacations'] = JSON.stringify(vacations) ;
            window.localStorage['final-id'] = id ;
            window.localStorage['start'] = start ;
            window.localStorage['data'] = JSON.stringify(data) ;
            window.localStorage['names'] = JSON.stringify(names) ;
            return true ;
        }else {
            return false; 
        }
        }else {
            return false;
        }
    }else {
        return false ;
    }
}
document.getElementById('accept-btn').addEventListener ('click' , ()=> {
    console.log(check_data()) 
    if (check_data()){
        window.open('main page.html' , '_self') ;
    }
})