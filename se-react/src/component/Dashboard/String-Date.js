
function StringtoDate(datetime) {
    // let timeStamp = new Date(date)
    // console.log(timeStamp);
    var date = new Date(datetime);
    var year = date.getFullYear();
    var month = date.getMonth();
    var dateVal = date.getDate();

    var formattedDate = year + '-' + month + '' + dateVal;
    console.log(formattedDate);
}
export default StringtoDate