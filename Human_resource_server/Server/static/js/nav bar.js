function clearlist (){
    let list_of_search = document.getElementById('search-list') ;
    let childrens_of_list = list_of_search.children ;
    // remove all children of the list every search
    while(childrens_of_list.length > 0){
        list_of_search.removeChild(childrens_of_list[childrens_of_list.length - 1]) ;
        childrens_of_list = list_of_search.children ;
    }
    list_of_search.style.cssText = "display : none" ;
}
function search (want_to_search){
    let data_of_names = [] , data_of_ids = [] , names = [] , ids = [] ;
    if (window.localStorage['names']){
        data_of_names = JSON.parse(window.localStorage['names']);
        data_of_ids = JSON.parse(window.localStorage['ids']) ;
    }
    // construct names from data names in array to search
    for (const key in data_of_names){
        names.push(key) ;
    }
    // construct ids from data ids in array to search
    for (const key in data_of_ids){
        ids.push(key) ;
    }
    clearlist() ;
    // to search for the element 
    let list_of_search = document.getElementById('search-list') ;
    for (let i = 0 ; i < names.length ; i++){
        if (want_to_search.length > 0){
            // id the want in the names
            if (names[i].includes(want_to_search) || ids[i].includes(want_to_search)){
                let new_selection = document.createElement('form') ,
                move_to_user_pro = document.createElement('input') ,
                input_field = document.getElementById('search') ,
                id_input = document.createElement('input') ;
                new_selection.className = "form" ;
                id_input.value = ids[i] ;
                new_selection .addEventListener('click' , ()=> {
                    window.localStorage['current_id'] = ids[i] ;
                    if (window.localStorage['appear_delete'] === 'false' ){
                        window.localStorage['appear_delete'] = 'true' ;
                    }
                    new_selection.submit() ;
                })
                move_to_user_pro.value = names[i] ;
                move_to_user_pro.type = "submit" ;
                move_to_user_pro.className = "input-in-form"
                id_input.type = "submit" ;
                id_input.className = "input-in-form-right" ;
                new_selection.setAttribute('action' , 'profile.html') ;
                new_selection .appendChild(move_to_user_pro) ;
                new_selection .addEventListener('mouseover' , () => input_field.focus()) ;
                new_selection .addEventListener('click' , () => input_field.focus()) ;
                list_of_search.style.cssText = "display : block ; cursor: pointer;" ;
                new_selection .appendChild(id_input) ;
                list_of_search.appendChild (new_selection) ;
            }
        }
    }
}
let input_field = document.getElementById('search') ;
input_field.addEventListener('input' , () => {
    search(input_field.value) ;
}) ;
input_field.addEventListener('focus' , () => {
    search(input_field.value) ;
}) ;    
let selections = document.getElementsByClassName('selection') ;
for (let i = 0 ; i < selections.length ; i++){
    selections[i].addEventListener('mouseover'  ,() => {
        clearlist() ;
        input_field.blur() ;
    })
}
document.addEventListener('click' , (event) => {
    let x = event.pageX , y = event.pageY ;
    if (document.getElementById('search-list').children.length > 0 ){
        let last = document.getElementById('search-list').lastChild ,
        first = document.getElementById('search-list').children[0] ;
        let start_x = last.getBoundingClientRect().left ,
            start_y = first.getBoundingClientRect().top ,
            end_x = start_x + last.offsetWidth ,
            end_y = last.getBoundingClientRect().top + last.offsetHeight;
        if (y > end_y || y < start_y  || x > end_x || x < start_x){
            console.log('yes')
            start_x = input_field.getBoundingClientRect().left ;
            start_y = input_field.getBoundingClientRect().top ;
            end_x = start_x + input_field.offsetWidth 
            end_y = start_y + input_field.offsetHeight
            if (y > end_y || y < start_y  || x > end_x || x < start_x){
                clearlist() ;
                input_field.blur() ;
            }
        }
    }
}) ;