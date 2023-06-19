$('#edit').css('background-color' , "#ffffff") ;
$('#edit').css('color' , "#66717a") ;

// set the data which come from the response of the get request
function setDataFromResponse (response) {
    _data['id'] = response[0];
    _data['name'] = response[1];
    _data['phone-number'] = response[2];
    _data['email'] = response[3] ;
    _data['gender'] = response[4] ;
    _data['employee-marital'] = response[5] ; 
    _data['salary'] = response[6] ;
    _data['available-vacations'] = response[7] ;
    _data['actual-vacations'] = response[8] ;
    _data['date-of-birth'] = response[9];
}
// get request
async function getDataOfUser () {
    url = window.location.href.split('/') ;
    let id = url[url.length - 1] ;
    let toGo = employee.replace('0' , '') ;
    toGo += id ;
    await $.ajax ({
        url : toGo , 
        method : 'GET' ,
        data : id ,
        success : function (response){
            setDataFromResponse(JSON.parse(response)) 
        } ,
        error : function (){
            console.log('fail') ;
        }
    })
}
function updateData () {
    preData = _data ;
    setData() ;
    $.ajax({
        url : update ,
        method : 'POST' ,
        data : {
            'previous' : JSON.stringify(preData),
            'new' : JSON.stringify(_data)
        } ,
        success : function (response) {
            if (response['message'] == 'Done') {
                window.location.href = main
            }
        } ,
        error : function (){
            console.log('Fail') ;
        }
    })
}
function deployData () {
    getDataOfUser ().then (function () {
        $('#name').prop('value' , _data['name']) ;
        $('#email').prop('value' , _data['email']) ;
        $('#id').prop('value' , _data['id']) ;
        $('#phone-number').prop('value' , _data['phone-number']);
        $('#available-vacations').prop('value' , _data['available-vacations']);
        $('#actual-vacations').prop('value' , _data['actual-vacations']);
        $('#gender').prop('value' , _data['gender']);
        $('#salary').prop('value' , _data['salary']);
        $('#date-of-birth').prop('value' , _data['date-of-birth']);
        $('#status').html( _data['employee-marital']);
        if (_data['gender'] === 'male') {
            $('#male').prop('checked' , true )
        }else if (_data['gender'] === 'female') {
            $('#female').prop('checked' , true )
        }
        $('#delete-finish').click(function () {
            $.ajax({
                url : Delete , 
                method : 'POST' ,
                data : {
                    'data' : _data['id'] 
                },
                success : function (){
                    window.location.href = main ;
                } ,
                error : function () {

                }
            })
            
        }) ;
        $('#update-finish').click (function (){
            handle_radio ()
            $(this).addClass('disable') ;
            $('#confirm-finish').removeClass('disable') ;
            allow_edit() ;
        }) 
        $('#confirm-finish').click (updateData) ;
    })
}

// get the data of the 
function disable_edit () {
    let elements = $('.input-Register') ;
    elements.prop('disabled' , true ) ;
    elements.addClass('disabled') ;
    $('#gender-field').addClass('disable') ;
    $('#Martial-list').addClass('disable') ;
    $('#status').css ('color' , 'grey') ;
    $('#confirm-finish').addClass('disable') ;
}
function allow_edit (){
    let elements = $('.input-Register') ;
    elements.prop('disabled' , false ) ;
    elements.removeClass('disabled') ;
    $('#gender-field').removeClass('disable') ;
    $('#gender').addClass('disable') ;
    $('#Martial-list').removeClass('disable') ;
    $('#date-of-birth').css('color' , 'black') ;
    $('#status').css ('color' , 'black') ;
    $('#gender-label').text('')
    $('#toModify').append('<div class = "format-class"></div>')
}

deployData() ;
disable_edit() ;

//accessing the data 
