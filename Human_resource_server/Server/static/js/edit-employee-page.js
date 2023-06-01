$('#edit').css('background-color' , "#ffffff") ;
$('#edit').css('color' , "#66717a") ;

let data = "" , modifiedData = {} , names = {} ;
function clearList (){
    $('#employee-list-id').children().each(function (){
        if ($(this).attr('id') != "don't"){
            $(this).remove() ;
        }
    });
}
// i used ID for the delete function handle
function addElement (name , id , salary , vacations , ID) {
    let newElementToAdd = $('<div></div>');
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
    newElementToAdd.append ($('<p class = "end">'+ vacations +'</p>')) ;
    newElementToAdd.attr('id' , ID) ;
    // add event to this button and we have to handle the delete button and edit button
    let newButton = $('<input>') ;
    let newButtonContainer = $('<div></div>') ;
    newButtonContainer.addClass('container-btn') ;
    newButton.attr('type' , 'button') ;
    newButton.attr('value' , 'Delete') ;
    newButton.addClass('function-btn') ;
    newButton.addClass('delete-btn') ;
    newButtonContainer.append(newButton) ;
    newElementToAdd.append(newButtonContainer) ;
    newButton.click(function(){
        // delete this user using post request
        $.ajax({
            url : Delete ,
            method : 'POST' ,
            data : {
                'data' : id 
            } ,
            success : function (response){
                    // to delete the element which is deleted in the database 
                    // if the request is a successful one
                $('#' + ID).fadeOut(350 , function(){
                    $('#' + ID).css('display' , 'none')
                })
                console.log(response) ;
            }, 
            error : function(xhr , errmsg , err) {
                console.log('Fail') ;
            }
        }) ;
    } ) ;
    // this made to avoid conflict between 2 buttons 
    newButtonContainer = $('<div></div>') ;
    newButtonContainer.addClass('container-btn') ;
    newButton = $('<input>') ;
    newButton.attr('type' , 'button') ;
    newButton.attr('value' , 'Update') ;
    newButton.addClass('function-btn') ;
    newButton.addClass('edit-btn') ;
    newButtonContainer.append(newButton) ;
    newElementToAdd.append(newButtonContainer) ;
    newButton.click(function(){
        let toGo = profile.replace('0' , '') ;
        toGo += id ;
        // handle this page to make the user able to update the user and 
        //after that return to the update page and he have to see the updated data 
        // --> DONE !!!!!!!!!!!!
        window.location.href = toGo ;
    })
    $('#employee-list-id').append(newElementToAdd) ;
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
$(document).ready(function (){
    $.ajax (
        {
            url : get ,
            method : 'GET' ,
            success : function (response){
                //console.log(response) ;
                data = JSON.parse(response) ;
                clearList() ;
                for (item in data){
                    modifiedData[data[item]['id']] = data[item]
                    names[data[item]['name']] = data[item]['id']
                } 
                //console.log(modifiedData) ;
                let counterId = 0 ;
                for (item in modifiedData){
                    addElement(modifiedData[item]['name'] ,modifiedData[item]['id']  , modifiedData[item]['salary']  , modifiedData[item]['available_vacation'] , counterId ) ;
                    counterId ++ ;
                }
                $('#' + (counterId - 1)).addClass('last') ;
                addFooter() ;
            } , error : function (xhr , errms , err){
                console.log('Fail') ;
            }
        }
    )
})
