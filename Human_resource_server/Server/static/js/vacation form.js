//!!!!! i have to add exception for the unfilled Reason
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
let url = window.location.href.split('/') ;
let id = url[url.length - 1] ;
let employeeAvailableVacations = 0;
if (id !== "0"){
    $('#employee-id').attr('value' , id) ;
    $('#employee-id').attr('disabled' , true) ;
}
getNumberOfEmployeeVacations() ;
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
getNumberOfVacations() ;
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
                employeeAvailableVacations = parseInt(response) ;
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
    vacation_data['vacation-id'] = vacation_id ;
    vacation_data['status'] = 'Submitted' ;
}
function check_data () {
    let status = true ;
    for (item in vacation_data) {
        if (vacation_data[item] == null || vacation_data[item] == ""){
            status = false ;
        }
    }
    
    if (vacation_data['duration'] == null ||  vacation_data['duration']  > employeeAvailableVacations) {
        if (vacation_data['duration']  > employeeAvailableVacations) {
            $('#warn-message').text(`you can't request this amount of days you only have ${employeeAvailableVacations}`) ;
            $('#warn-message').addClass('message') ;
        }
        status = false ;
    }else {
        if (vacation_data['duration'] <= 0){
            $('#warn-message').text(`you can't request a negative amount of days`) ;
            $('#warn-message').addClass('message') ;
        }else {
            $('#warn-message').removeClass('message') ;
        }
    }
    return status ;
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
        updateData ();
        addVacations() ;
        $(this).off('click' , accept) ;
        $(this).removeClass('accept-btn') ;
        $(this).addClass('static-btn'); 
    }
    emptyData() ;
}
$('#accept-btn').on ('click' , accept) ;
