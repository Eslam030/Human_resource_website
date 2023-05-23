console.log("test") 

document.getElementById('test').addEventListener('click' , function() {
    let urll = "{% url 'data' %}"
    $(document).ready(function(){
        $.ajax(
            {
                url :ajaxUrl, 
                method : 'GET' ,
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
