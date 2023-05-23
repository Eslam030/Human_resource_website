
$(document).ready(function(){
    $("#post").on('click' , function() {
        $(document).ready(function(){
            let name = $('#name').val() 
            id = $('#id').val() ;
            $.ajax (
                {
                    url : post ,
                    method : 'POST' ,
                    data : {
                    state:"inactive"  ,
                        'firstname' : name ,
                    'id' : id} ,
                    success: function(response) {
                        // Handle the response data
                        console.log(response);
                    },
                    error: function(xhr, errmsg, err) {
                        // Handle any errors
                        console.log(xhr.status + ': ' + xhr.responseText);
                    }
                }
            )
        })
    })
    
})

document.getElementById('test').addEventListener('click' , function() {
    $(document).ready(function(){
        $.ajax(
            {
                url :ajaxUrl, 
                method : 'GET' ,
                success: function(response) {
                    // Handle the response data
                    console.log('suu')
                    console.log(response);
                },
                error: function(xhr, errmsg, err) {
                    // Handle any errors
                    console.log(xhr.status + ': ' + xhr.responseText);
                }
            }
        )
    })
})
