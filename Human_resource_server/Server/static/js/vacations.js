$('#Vacations').css('background' , "#ffffff") ;
$('#Vacations').css('color' , "#66717a") ;
function emptyData (){
    for (x in vacation_data) {
        x = null ;
    }
}
function updateData () {
    $.ajax({
        url : updateVacations ,
        method : 'POST' ,
        data :  {
            'id' : vacation_data['employee-id'] ,
            'duration' : vacation_data['duration']
        } ,
        success : function () {
            console.log('done')
        } ,
        error : function (){
            console.log('fail')
        }
    })
}
function clearList (){
    $('#employee-list-id').children().each(function (){
        if ($(this).attr('id') != "don't"){
            $(this).remove() ;
        }
    });
}
function makeElement (vid , name , duration , ID ) {
    let newElementToAdd = $('<div></div>');
    newElementToAdd.attr('id' , ID) ;
    newElementToAdd.addClass('employee') ;
    let newImageContainer = $('<div></div>') ;
    newImageContainer.addClass('in-img') ;
    // the image
    let newImage = $('<img>') ;
    newImage.attr('src' , image) ; 
    newImage.addClass('user-icon') ;
    newImageContainer.append(newImage) ;
    newElementToAdd.append(newImageContainer) ;
    // the info
    newElementToAdd.append ($('<p>'+ vid +'</p>')) ;
    newElementToAdd.append ($('<p>'+ name +'</p>')) ;
    newElementToAdd.append ($('<p class = "end">'+ duration +'</p>')) ;
    // the buttons
    let newButton = $('<input>') ;
    let newButtonContainer = $('<div></div>') ;
    newButtonContainer.addClass('container-btn') ;
    newButton.attr('type' , 'button') ;
    newButton.attr('value' , 'Approve') ;
    newButton.addClass('function-btn') ;
    newButton.addClass('edit-btn') ;
    newButtonContainer.append(newButton) ;
    newElementToAdd.append(newButtonContainer) ;
    newButton.click(function(){
        $.ajax({
            url : update ,
            method : 'POST' ,
            data : {
                'id' : vid ,
                'status' : 'Approve' 
            } ,
            success : function (response){
                    // to delete the element which is deleted in the database 
                    // if the request is a successful one
               $('#' + ID).fadeOut(350 , function(){
                    $('#' + ID).css('display' , 'none')
                })
            }, 
            error : function(xhr , errmsg , err) {
                console.log('Fail') ;
            }
        }) ;
    })
    $('#employee-list-id').append(newElementToAdd) ;
    newButton = $('<input>') ;
    newButtonContainer = $('<div></div>') ;
    newButtonContainer.addClass('container-btn') ;
    newButton.attr('type' , 'button') ;
    newButton.attr('value' , 'Deny') ;
    newButton.addClass('function-btn') ;
    newButton.addClass('delete-btn') ;
    newButtonContainer.append(newButton) ;
    newElementToAdd.append(newButtonContainer) ;
    newButton.click(function(){
        $.ajax({
            url : update ,
            method : 'POST' ,
            data : {
                'id' : vid ,
                'status' : 'Deny' 
            } ,
            success : function (response){
                    // to delete the element which is deleted in the database 
                    // if the request is a successful one
                $('#' + ID).fadeOut(350 , function(){
                    $('#' + ID).css('display' , 'none')
                }) 
            }, 
            error : function(xhr , errmsg , err) {
                console.log('Fail') ;
            }
        }) ;
    })
    $('#employee-list-id').append(newElementToAdd) ;
    newButton = $('<input>') ;
    newButtonContainer = $('<div></div>') ;
    newButtonContainer.addClass('container-btn') ;
    newButton.attr('type' , 'button') ;
    newButton.attr('value' , 'Details') ;
    newButton.addClass('function-btn') ;
    newButton.addClass('edit-btn') ;
    newButtonContainer.append(newButton) ;
    newElementToAdd.append(newButtonContainer) ;
    newButton.click(function(){
        // open a page 
        let toGo = view.replace('0' , '') ;
        toGo += vid ;
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
emptyData() 
$.ajax({
    url : vacations ,
    method : 'GET' ,
    success : function (response){
        let data = JSON.parse(response)
        clearList()
        let counter = 0 ;
        for (item in data) {
            if (data[item]['status'] == 'Submitted') {
                makeElement(data[item]['id'] , data[item]['employee_name'] , data[item]['vacation_duration'] , counter , data[item]['employee-id']) ;
                counter ++ ;
            }
        }
        addFooter () ;
        // !!!! i want to add last class
    } ,
    error : function (){
        console.log('fail') 
    }
}) 