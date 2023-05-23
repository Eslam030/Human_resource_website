function update_data (name , id){
    // to check if the data is not assigned in the local data
    if (!window.localStorage['names']){
        window.localStorage.setItem('names' , "{}") ;
    }
    if (!window.localStorage['ids']){
        window.localStorage.setItem('ids' , '{}') ;
    }
    // convert the string json in key data to json file 
    let data = JSON.parse(window.localStorage['names']) ;
    let ids = JSON.parse(window.localStorage['ids']) ;
    window.localStorage['names'] = JSON.stringify(data) ;
    window.localStorage['ids'] = JSON.stringify(ids) ;
}
function addData (name , id) {
    // to check if the data is not assigned in the local data
    if (!window.localStorage['names']){
        window.localStorage.setItem('names' , "{}") ;
    }
    if (!window.localStorage['ids']){
        window.localStorage.setItem('ids' , '{}') ;
    }
    // convert the string json in key data to json file 
    let data = JSON.parse(window.localStorage['names']) ;
    let ids = JSON.parse(window.localStorage['ids']) ;
    if (!(name in data) && !(id in ids)){
        data[name] = id ;
        ids [id] = name ; 
    }else {
        return false ;
    }
    window.localStorage['names'] = JSON.stringify(data) ;
    window.localStorage['ids'] = JSON.stringify(ids) ;
    return true ;
}
function cleardata (){
    window.localStorage['current_id'] = "" ;
    window.localStorage['ids'] = "{}" ;
    window.localStorage['names'] = "{}" ;
    window.localStorage['data'] = "{}" ;
}
function delete_user (name , id){
    // to check if the data is not assigned in the local data
    if (!window.localStorage['names']){
        window.localStorage.setItem('names' , "{}") ;
    }
    if (!window.localStorage['ids']){
        window.localStorage.setItem('ids' , '{}') ;
    }
    if (!window.localStorage['data']){
        window.localStorage.setItem('data' , '{}') ;
    }
    let data = JSON.parse(window.localStorage['names']) ;
    let ids = JSON.parse(window.localStorage['ids']) ;
    let whole_data = JSON.parse(window.localStorage['data']) ;
    if ((name in data) && (id in ids)){
        delete data[name] ;
        delete ids[id] ;
        delete whole_data[id] ;
    }else {
        alert("not exist") ;
    }
    window.localStorage['names'] = JSON.stringify(data) ;
    window.localStorage['ids'] = JSON.stringify(ids) ;
    window.localStorage['data'] = JSON.stringify(whole_data) ;
}
