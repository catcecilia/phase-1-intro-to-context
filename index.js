// Your code here
function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays){
    const arrayOfObjects=[];
    arrayOfArrays.forEach(array =>{
        arrayOfObjects.push(createEmployeeRecord(array));
    });
    return arrayOfObjects;
}
function createTimeInEvent(employeeRecord, dateStamp){
    let dateStampString = dateStamp.toString();
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStampString.slice(-4)),
        date:dateStampString.slice(0,10)
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord,dateStamp){
    let dateStampString = dateStamp.toString();
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStampString.slice(-4)),
        date:dateStampString.slice(0,10)
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord,dateStamp){
    let dateStampString = dateStamp.toString();
    let timeIn, timeOut;
    try {
            for (let i = 0; i < employeeRecord.timeInEvents.length; i++){
            if (employeeRecord.timeInEvents[i].date === dateStampString){
                timeIn = employeeRecord.timeInEvents[i].hour;
                if(employeeRecord.timeOutEvents[i].date === dateStampString){
                    timeOut = employeeRecord.timeOutEvents[i].hour;
                } else {
                    throw exception; 
                }
            }
        }
    } catch (exception) {
        console.log(exception);
    }
    return (timeOut-timeIn)/100;
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    return employeeRecord.payPerHour* hoursWorkedOnDate(employeeRecord, dateStamp);
}

function allWagesFor(employeeRecord){
    let accumulator = 0;
    for(let i = 0; i <employeeRecord.timeInEvents.length; i++){
        accumulator += wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i].date);
    } 
    return accumulator;
}

function calculatePayroll(arrayofEmployeeRecords){
    let accumulator = 0;
    for (let i = 0; i < arrayofEmployeeRecords.length; i++){
        accumulator += allWagesFor(arrayofEmployeeRecords[i]);
    }
    return accumulator;
}