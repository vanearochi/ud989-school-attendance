/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }

}());


$(document).ready(function(){

var model = {

    attendanceRecord : JSON.parse(localStorage.attendance),

    daysAttended : {}

};

var controller = {

    init: function(){
        view.createTable()
        console.log(model.attendanceRecord)
    },

    getAttendanceRecord: function(){

        var attendanceList = model.attendanceRecord;

        return attendanceList;

    },

    getNameList: function(){

        var nameList = [];
        $.each(model.attendanceRecord, function(name){
            nameList.push(name)

        })

        return nameList
    },

    numberOfDays: function(){

        var studentsList = controller.getNameList(),
            firstNameonthelist = studentsList[0],
            howManyDays = model.attendanceRecord[firstNameonthelist].length;

            return howManyDays
    },


    getAttendanceDayInfo: function(studentName, day){

        var completeAttendanceList = controller.getAttendanceRecord();
        var studentAttendanceRecord = completeAttendanceList[studentName];
        var attendanceDayInfo = studentAttendanceRecord[day];
        console.log(attendanceDayInfo);

        return attendanceDayInfo;
    },

    addEventListenerToCheckbox: function(){

        $("input").unbind().click(function(){

            var clickedElem = $(this);
            var studentName = clickedElem.attr("class");
            var daysAttended = model.daysAttended[studentName];

            if(clickedElem.attr("checked") === undefined){

                clickedElem.attr("checked", true);
                model.daysAttended[studentName] = daysAttended + 1;
                console.log(model.daysAttended[studentName])
                view.changeDaysMissedVal(model.daysAttended[studentName], studentName)

            }
            else{

                clickedElem.removeAttr("checked")
                model.daysAttended[studentName] = daysAttended - 1;
                console.log(model.daysAttended[studentName]);
                view.changeDaysMissedVal(model.daysAttended[studentName], studentName)
            }

        })
    },

    fillAttendedDays: function(studentName,days){

        model.daysAttended[studentName]= days;
        console.log(model.daysAttended)

    },

    changeAttendedDays: function(className, value){
        console.log(value);

        var daysAttended = model.daysAttended[className] + value;
        console.log(daysAttended);
    }



}

var view = {


    addTHeaderRowtoHtml: function(){

        var theadElem = $("thead");
        var headerRow = document.createElement("tr");
        theadElem.append(headerRow);
        var thFirstCell = document.createElement("th");
        headerRow.setAttribute( "class", "name-col")
        thFirstCell.innerHTML = "Student Name"
        headerRow.appendChild(thFirstCell);
        var howManyDays = controller.numberOfDays();
        console.log(howManyDays)
        var thCell;

        for(var i = 0; i < howManyDays; i++){

            thCell = document.createElement("th");
            thCell.innerHTML = i + 1;
            headerRow.appendChild(thCell);

        }

        var thLastCell = document.createElement("th");
        thLastCell.setAttribute( "class", "missed-col")
        thLastCell.innerHTML = "Days Missed-col";
        headerRow.appendChild(thLastCell);
    },

    addTBodyRowstoHtml: function(studentName){

        var tbodyElem = $("tbody");
        var bodyRow = document.createElement("tr");
        bodyRow.setAttribute("class", "student");
        tbodyElem.append(bodyRow);
        var tdFirstCell = document.createElement("td");
        tdFirstCell.setAttribute("class", "name-col");
        tdFirstCell.innerHTML = studentName;
        bodyRow.appendChild(tdFirstCell);
        var howManyDays = controller.numberOfDays();
        console.log(howManyDays)
        var tdCell,
            inputElem,
            attendanceDayInfo,
            falseCounter = howManyDays;


        for(var i = 0; i < howManyDays; i++){

            console.log(i)
            tdCell = document.createElement("td");
            tdCell.setAttribute("class", "attend-col");
            inputElem = document.createElement("input");
            inputElem.setAttribute("type", "checkbox");
            inputElem.setAttribute("class", studentName)
            attendanceDayInfo = controller.getAttendanceDayInfo(studentName, i);

            if(attendanceDayInfo === true){

                inputElem.setAttribute("checked", true);
                falseCounter -= 1;
            }


            bodyRow.appendChild(tdCell);
            tdCell.appendChild(inputElem);
            controller.addEventListenerToCheckbox();


        }

        var studentDaysAttended = 12 - falseCounter;
        controller.fillAttendedDays(studentName, studentDaysAttended);
        var tdLastCell = document.createElement("td");
        tdLastCell.setAttribute("class", "missed-col");

        tdLastCell.setAttribute("id", studentName);
        tdLastCell.innerHTML = falseCounter;
        bodyRow.appendChild(tdLastCell);
    },

    createTable: function(){

        view.addTHeaderRowtoHtml()

        var studentList = controller.getNameList();

        for(var i = 0; i < studentList.length; i++){
            console.log(i);
            view.addTBodyRowstoHtml(studentList[i]);
        }
    },


    changeDaysMissedVal: function(daysAttended, studentName){

        var tableMissedValue = document.getElementById(studentName);
        tableMissedValue.innerHTML = 12-daysAttended;
        console.log(tableMissedValue)

    }

}

controller.init();

});

