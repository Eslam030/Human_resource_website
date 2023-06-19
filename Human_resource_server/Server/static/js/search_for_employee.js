// we make this to Search by name and handle the case of duplicated names with different ids
$('#searchForEmployee').css('background' , "#ffffff") ;
$('#searchForEmployee').css('color' , "#66717a") ;


dataByIDs = {} ;
dataByNames = {} ;
function clearList (){
    $('#employee-list-id').children().each(function (){
        if ($(this).attr('id') != "don't"){
            $(this).remove() ;
        }
    });
}
function addFooter () {
    let Footer = $('<footer></footer>') ;
    Footer.attr('id' , "Footer") ;
    let Paragraph = $('<p></p>') ;
    Paragraph.addClass("copyRight") ;
    Paragraph.text("Human Resources website © Copyright 2023 FCAI-CU. All rights reserved.") ;
    Footer.append(Paragraph) ;
    $('#employee-list-id').append(Footer) ;
}
function makeElement (name , id , salary , availableVacations , actualVacations , ID) {
    let newElementToAdd = $('<div></div>');
    newElementToAdd.attr('id' , ID) ;
    newElementToAdd.addClass('employee') ;
    let newImageContainer = $('<div></div>') ;
    newImageContainer.addClass('in-img') ;
    let newImage = $('<img>') ;
    newImage.attr('src' , image) ; 
    newImage.addClass('user-icon') ;
    newImageContainer.append(newImage) ;
    newElementToAdd.append(newImageContainer) ;
    newElementToAdd.append ($('<p>'+ name +'</p>')) ;
    newElementToAdd.append ($('<p>'+ id +'</p>')) ;
    newElementToAdd.append ($('<p>'+ salary +'</p>')) ;
    newElementToAdd.append ($('<p>'+ availableVacations+'</p>')) ;
    newElementToAdd.append ($('<p class = "end">'+ actualVacations+'</p>')) ;
    let newButton = $('<input>') ;
    let newButtonContainer = $('<div></div>') ;
    newButtonContainer.addClass('container-btn') ;
    newButton.attr('type' , 'button') ;
    newButton.attr('value' , 'Submit') ;
    newButton.addClass('function-btn') ;
    newButton.addClass('edit-btn') ;
    newButtonContainer.append(newButton) ;
    newElementToAdd.append(newButtonContainer) ;
    newButton.click(function(){
        let toGo = form.replace('0' , '') ;
        toGo += id ;
        window.location.href= toGo ;
        console.log(toGo) ;
    })
    $('#employee-list-id').append(newElementToAdd) ;
}
function setData (){
    $.ajax({
        url : get , 
        method : 'GET' ,
        success : function (response){
            data = JSON.parse(response) ;
            for (item in data){
                dataByIDs[data[item]['id']] = data[item] ;
                if (!(data[item]['name'] in dataByNames)) {
                    dataByNames[data[item]['name']] = [] ;
                }
                dataByNames[data[item]['name']].push(data[item]['id']) ;
            }
        } ,
        error : function (){
            console.log('fail')
        }
    }).then(function() {
        clearList() ;
        Search("") ;
    })
}
setData() ;
function Search (want_name){
    want_name = want_name.toLowerCase() ;
    let counter = 0 ;
    for (Name in  dataByNames){
        let nameToCheck = Name.toLowerCase() ;
        if (nameToCheck.includes(want_name)){
            for (id in dataByNames[Name]) {
                let dataToAdd =  dataByIDs[dataByNames[Name][id]] ;
                makeElement(dataToAdd['name'] , dataToAdd['id'] , dataToAdd['salary'] , dataToAdd['available_vacation'] , dataToAdd['actual_approved_vacations'], counter)
                counter ++ ;
            }
        }
    }
    $('#' + (counter - 1)).addClass('last') ;
    addFooter() ; 
}
$('#search-for-employee').on('input' , function (){
    clearList() ;
    Search($(this).val()) ;
})