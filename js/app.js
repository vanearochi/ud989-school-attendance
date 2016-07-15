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

//console.log(localStorage.attendance)

$(document).ready(function(){

var model = {

    attendanceRecord : JSON.parse(localStorage.attendance)


};

var controller = {

    init: function(){
        view.createTable()
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

    makeHtmlElem: function(elemName){

        var htmlElem = document.createElement(elemName);

            return htmlElem;

    },

    setAttr: function(element, attrName, value){

       var elemWithAttr = element.setAttribute(attrName, value);

       return elemWithAttr;

    },


    contructRowsElem: function(classNAme, idName, headerORinput){

        var howManyDays = controller.numberOfDays();




                controller.makeHtmlElem("th")


        console.log(howManyDays)
    }

}
//model.bla

//console.log(model.nameList)
var view = {

    bla : function(){
        console.log(controller.makeHtmlElem("p"))
        controller.contructRowsElem()
    },

    addTHeaderRowtoHtml: function(){

        var theadElem = $("thead");
        var headerRow = controller.makeHtmlElem("tr");
        theadElem.append(headerRow);
        var thFirstCell = controller.makeHtmlElem("th");
        controller.setAttr(headerRow, "class", "name-col")
        thFirstCell.innerHTML = "Student Name"
        headerRow.appendChild(thFirstCell);
        var howManyDays = controller.numberOfDays();
        console.log(howManyDays)
        var thCell;

        for(var i = 0; i < howManyDays; i++){

            thCell = controller.makeHtmlElem("th");
            thCell.innerHTML = i + 1;
            headerRow.appendChild(thCell);
            //console.log(i)

        }

        var thLastCell = controller.makeHtmlElem("th","missed-col", 0);
        controller.setAttr(thLastCell, "class", "missed-col")
        thLastCell.innerHTML = "Days Missed-col";
        headerRow.appendChild(thLastCell);
    },

    addTBodyRowstoHtml: function(studentName){

        var tbodyElem = $("tbody");
        var bodyRow = controller.makeHtmlElem("tr");
        controller.setAttr(bodyRow, "class", "student");
        tbodyElem.append(bodyRow);
        var tdFirstCell = controller.makeHtmlElem("td");
        controller.setAttr(tdFirstCell, "class", "name-col");
        tdFirstCell.innerHTML = studentName;
        bodyRow.appendChild(tdFirstCell);
        var howManyDays = controller.numberOfDays();
        console.log(howManyDays)
        var tdCell;
        var inputElem;

        for(var i = 0; i < howManyDays; i++){

            console.log(i)
            tdCell = controller.makeHtmlElem("td");
            controller.setAttr(tdCell, "class", "attend-col");
            inputElem = controller.makeHtmlElem("input");
            controller.setAttr(inputElem, "type", "checkbox");
            bodyRow.appendChild(tdCell);
            tdCell.appendChild(inputElem);


        }

        var tdLastCell = controller.makeHtmlElem("td");
        controller.setAttr(tdLastCell, "class", "missed-col");
        tdLastCell.innerHTML = 0;
        bodyRow.appendChild(tdLastCell);
    },

    createTable: function(){

        view.addTHeaderRowtoHtml()

        var studentList = controller.getNameList();

        for(var i = 0; i < studentList.length; i++){
            console.log(i);
            view.addTBodyRowstoHtml(studentList[i]);
        }
    }






}

controller.init();
//view.createTable();
//view.addTBodyRowstoHtml("bla")
});

/* STUDENT APPLICATION */
// $(function() {
//     //console.log(localStorage)
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');
//     //console.log(attendance)
//     //console.log($allMissed)
//     //console.log($allCheckboxes


//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),

//                 dayChecks = $(studentRow).children('td').children('input'),

//                 numMissed = 0;
//                 //console.log(studentRow)
//                 //console.log(dayChecks)

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });
//             //console.log($(this))
//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//          console.log(attendance);
//         // console.log(name);
//         // console.log(days);
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');
//             //console.log(studentRow);
//             //console.log(dayChecks);

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//             console.log( $(this).prop('checked', days[i]))
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');
//                 console.log(name)
//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());
