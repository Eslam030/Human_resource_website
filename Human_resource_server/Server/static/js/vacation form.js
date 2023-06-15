//!!!!! i have to add exception for the unfilled Reason
$('#Vacations').css('background' , "#ffffff") ;
$('#Vacations').css('color' , "#66717a") ;
function emptyData (){
    for (x in vacation_data) {
        x = null ;
    }
}
$('#from').on('input' , function (){
    $('#warn-message').removeClass('message') ;
}) 
$('#to').on('input' , function (){
    $('#warn-message').removeClass('message') ;
}) 
let employeeAvailableVacations = 0;
let employeeName = "";
let vacation_id = 0;
function getNumberOfVacations () {
    // get the number of 
    $.ajax ({
        url : number ,
        method : 'GET' , 
        success : function (response){
            vacation_id = parseInt(response) + 1 ;
        } ,
        error : function (response){
            console.log(response) ;
        }
    })
}

function getNumberOfEmployeeVacations () {
    let toGo = employeeVacations.replace('0' , '') ;
    if (id != "0"){
        toGo += id ;
    }else {
        if ($('#employee-id').val() != ""){
            toGo += $('#employee-id').val() ;
        }
    }
    if (id != "0" || $('#employee-id').val() != "") {
        $.ajax ({
            url : toGo ,
            method : 'GET' , 
            success : function (response){
                data = (response)
                employeeAvailableVacations = parseInt(data['available_vacation']) ;
                employeeName = data['name'] ;
            } ,
            error : function (response){
                console.log(response) ;
            }
        })
    }

}
function calculateDays () {
    let start = vacation_data['from'] , end = vacation_data['to'] ;
    if (start !== null && end !== null) {
        let startDate = new Date(start) , endDate = new Date(end) ;
        let seconds = 24 * 60 * 60 * 1000 ;
        let secondDifference = endDate.getTime() - startDate.getTime() 
        return Math.ceil(secondDifference / seconds) ;
    }else {
        return null ;
    }
}
function setData () {
    if (id == "0"){
        getNumberOfEmployeeVacations() ;
    }
    vacation_data['from'] = $('#from').val() ;
    vacation_data['to'] = $('#to').val() ;
    vacation_data['reason'] = $('#reason').val() ;
    vacation_data['employee-id'] = $('#employee-id').val() ;
    vacation_data['duration'] = calculateDays() ;
    vacation_data['id'] = vacation_id ;
    vacation_data['status'] = 'Submitted' ;
    vacation_data['employee-name'] = employeeName
}
function check_data () {
    for (item in vacation_data) {
        if (vacation_data[item] == null || vacation_data[item] == ""){
            return false ;
        }
    }
    
    if (vacation_data['duration'] == null ||  vacation_data['duration']  > employeeAvailableVacations) {
        if (vacation_data['duration']  > employeeAvailableVacations) {
            $('#warn-message').text(`you can't request this amount of days you only have ${employeeAvailableVacations}`) ;
            $('#warn-message').addClass('message') ;
        }
        return false ;
    }else {
        if (vacation_data['duration'] <= 0){
            $('#warn-message').text(`you can't request a negative amount of days`) ;
            $('#warn-message').addClass('message') ;
            return false ;
        }else {
            $('#warn-message').removeClass('message') ;
        }
    }
    return true  ;
}
function updateData () {
    $.ajax({
        url : updateVacations ,
        method : 'POST' ,
        data :  {
            'id' : $('#employee-id').val() ,
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
function addVacations () {
    $.ajax({
        url : add ,
        method : 'POST' ,
        data : JSON.stringify(vacation_data) ,
        success : function () {
            console.log('done')
        } ,
        error : function (){
            console.log('fail')
        }
    })
}
function accept () {
    setData() ;
    if (check_data()) {
        console.log('test')
        console.log(vacation_data)
        updateData ();
        addVacations() ;
        $('#status').text('Submitted')
        $(this).off('click' , accept) ;
        $(this).removeClass('accept-btn') ;
        $(this).addClass('static-btn');
    }
    emptyData() ;
}

let url = window.location.href.split('/') ;
let id = url[url.length - 1] ;
if (url[url.length - 2] == 'view_vacation') {
    url = window.location.href.split('/') ;
    let id = url[url.length - 1] ;
    let toGo = getVacation.replace('0' , '') ;
    toGo += id ;
    $.ajax({
        url : toGo , 
        method : 'GET' ,
        success : function (response) {
            data = JSON.parse(response)
            console.log(data) ;
            $('#employee-id').attr('value' , data[1])
            $('#from').attr('value' , data[3])
            $('#to').attr('value' , data[4])
            $('#reason').text(data[5])
            $('#status').text(data[6])
            $('#accept-btn').removeClass('accept-btn') ;
            $('#accept-btn').addClass('static-btn');
        } , 
        error : function (){
            console.log('fail')
        }
    })

}else {
    if (id !== "0"){
        $('#employee-id').attr('value' , id) ;
        $('#employee-id').attr('disabled' , true) ;
    }
    getNumberOfEmployeeVacations() ;
    getNumberOfVacations() ;
    $('#accept-btn').on ('click' , accept) ;
}


