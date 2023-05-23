function add_new_data (data){
    let contain = document.createElement('div') ,
    img = document.createElement('img') , 
    name = document.createElement('p') ,
    id = document.createElement('p'), 
    salary = document.createElement('p') , 
    vacations = document.createElement('p') ,
    State ;
    contain.className = "employee"
    img.src = "iamges/search/user.png" ;
    img.className = "user-icon" ;
    name.innerHTML = data["name"] ;
    id.innerHTML =  data["id"];
    salary.innerHTML = data['salary'] ;
    vacations.innerHTML = data['vacations'] ;
    if (data['first']) {
        if (data['state'] === "Delete"){
            State = document.createElement('p') ;
            State.innerHTML = "Delete" ;
        }else {
            State = document.createElement('p') ;
            State.innerHTML = "Update" ;
        }
    }else {
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
    }
    contain.appendChild(img) ;
    contain.appendChild(name) ;
    contain.appendChild(id) ;
    contain.appendChild(salary) ;
    contain.appendChild(vacations) ;
    contain.appendChild(State) ;
    document.getElementById('employee-list').appendChild(contain) ;
}
function makeOBJ (){
    return {
        "name" : "Name" ,
        "id" : "ID" ,
        "salary" : "Salary" ,
        "vacations" : "Vacations" ,
        "state" : "state" ,
        "first" : true ,
    }
}
function clear_search_list (){
    let list_of_search = document.getElementById('employee-list') ,
    childrens_of_list = list_of_search.children ,
    title = document.getElementById('Title').innerHTML , data_to_add = makeOBJ() ;
    // remove all children of the list every search
    while(childrens_of_list.length > 0){
        list_of_search.removeChild(childrens_of_list[childrens_of_list.length - 1]) ;
        childrens_of_list = list_of_search.children ;
    }
    if (title === "delete employee"){
        data_to_add['state'] = "Delete" ;
    }else {
        data_to_add['state'] = "Update" ; 
    }
    add_new_data(data_to_add) ;
}



function search (want_to_search) {
    let data_of_names = [] , data_of_ids = [] , names = [] , ids = [] , data ,
    title = document.getElementById('Title').innerHTML , state ;
    if (window.localStorage['names']){
        data_of_names = JSON.parse(window.localStorage['names']);
        data_of_ids = JSON.parse(window.localStorage['ids']) ;
        data = JSON.parse(window.localStorage['data'])  ;
    }
    if (title === "delete employee"){
        state = "Delete" ;
    }else {
        state = "Update" ; 
    }
    // construct names from data names in array to search
    for (const key in data_of_names){
        names.push(key) ;
    }
    // construct ids from data ids in array to search
    for (const key in data_of_ids){
        ids.push(key) ;
    }
    clear_search_list () ;
    for (let i = 0 ; i < names.length ; i++){
        if (want_to_search.length > 0){
            // id the want in the names
            if (names[i].includes(want_to_search) || ids[i].includes(want_to_search)){
                let data_of_employee = data[ids[i]] , data_to_add = makeOBJ() ;
                data_to_add['name'] = data_of_employee['name'] ;
                data_to_add['id'] = data_of_employee['id'] ;
                data_to_add['salary'] = data_of_employee['salary'] ;
                data_to_add['vacations'] = data_of_employee['available-vacations'] ;
                data_to_add['state'] = state
                data_to_add['first'] = false;
                add_new_data(data_to_add) ;
                
            }
        }
    }
}
document.getElementById('search-btn').addEventListener('click' , ()=>{
    search(document.getElementById('search-for-employee').value) ;
}) ;