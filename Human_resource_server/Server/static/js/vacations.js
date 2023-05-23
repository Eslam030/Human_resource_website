let delete_page = document.getElementById('vacations') ;
delete_page.style.backgroundColor = "#66717a" ;
delete_page.style.color = "#ffffff" ;
delete_page.style.borderRadius = "10px" ; 
let employee_page = document.getElementById('vacation') ;
employee_page.style.backgroundColor = "#ffffff" ;
employee_page.style.color = "#66717a" ; 

function add_new_data (data){
    let contain = document.createElement('div') ,
    img = document.createElement('img') , 
    V_id = document.createElement('p') ,
    Employee = document.createElement('p'), 
    Duration = document.createElement('p') ,
    vacation , approve , deney;
    contain.className = "employee"
    img.src = "iamges/search/user.png" ;
    img.className = "user-icon" ;
    V_id.innerHTML = data['id'] ;
    Employee.innerHTML =  data["from"];
    Duration.innerHTML = data['duration'] ;
    let class_of_btn ;
    if (data['state'] === "Delete"){
        class_of_btn = "delete-btn" ;
    }else {
        class_of_btn = "edit-btn " ;
    }
    State = document.createElement('input') ;
    State.type = "button" ;
    State.value = data['state'] ;
    State.className = class_of_btn ;
    if (data['state'] === "Delete"){
        State.addEventListener('click' , ()=> {
            delete_user(data['name'] ,data['id']) ;
            contain.style.display = "none" ;
        })
    }else {
        State.addEventListener('click' , ()=> {
            window.localStorage['current_id'] = data['id'] ;
            window.localStorage['appear_delete'] = false ;
            window.open('profile.html' , "_self") ;
        })
    }
    approve = document.createElement('input') ;
    approve.type = "button" ;
    approve.value = "Approve" ;
    approve.className = "edit-btn" ;
    approve.addEventListener ('click' , () => {
        window.localStorage['final-id'] = number ;
        let approved = JSON.parse(window.localStorage['approved']) ;
        let vacations = JSON.parse(window.localStorage['vacations']) ;
        let currnet = vacations[data["id"]] ;
        approved[data["id"]] = currnet ;
        contain.style.display = "none" ;
        delete vacations[data["id"]] ;
        window.localStorage['vacations'] = JSON.stringify(vacations) ;
        window.localStorage['approved'] = JSON.stringify(approved) ;
        let vacations_in = JSON.parse(window.localStorage['vacations']) 
        let number ;
        for (key in vacations_in){
            number = vacations_in[key]['id'] ;
        }
    }) ;
    deney = document.createElement('input') ;
    deney.type = "button" ;
    deney.value = "Deny" ;
    deney.className = "delete-btn" ;
    deney.addEventListener ('click' , () => {
        let vacations = JSON.parse(window.localStorage['vacations']) ;
        contain.style.display = "none" ;
        delete vacations[data["id"]] ;
        window.localStorage['vacations'] = JSON.stringify(vacations) ;
        let vacations_in = JSON.parse(window.localStorage['vacations']) 
        let number ;
        for (key in vacations_in){
            number = vacations_in[key]['id'] ;
        }
    }) ;
    contain.appendChild(img) ;
    contain.appendChild(V_id) ;
    contain.appendChild(Employee) ;
    contain.appendChild(Duration) ;
    contain.appendChild(approve) ;
    contain.appendChild(deney) ; 
    document.getElementById('employee-list').appendChild(contain) ;
}

function load () {
    let vacations = JSON.parse(window.localStorage['vacations']) ;
    for (key in vacations){
        add_new_data(vacations[key]) ;
    }
}
load () ;