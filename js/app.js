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

    makeHtmlElem: function(elemName, className, idName){

        var htmlElem = document.createElement(elemName);

        if(className === 0){

            htmlElem.id = idName;
            return htmlElem;
        }
        else if(idName === 0){

            htmlElem.class = className;
            return htmlElem
        }
        else{

            htmlElem.class = className;
            htmlElem.id = idName;
            return htmlElem
        }

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
        console.log(controller.makeHtmlElem("p", "b", "b"))
        controller.contructRowsElem()
    },

    addHeaderRowtoHtml: function(){

        var theadElem = $("thead");
        var headerRow = controller.makeHtmlElem("tr", 0 , 0);
        theadElem.append(headerRow)
        var thFirstCell = controller.makeHtmlElem("th", "name-col", 0);
        thFirstCell.innerHTML = "Student Name"
        headerRow.appendChild(thFirstCell);
        var howManyDays = controller.numberOfDays();
        console.log(howManyDays)
        var thCell;

        for(var i = 0; i < howManyDays; i++){

            thCell = controller.makeHtmlElem("th", 0, 0);
            thCell.innerHTML = i;
            headerRow.appendChild(thCell);
            console.log(i)

        }

        var thLastCell = controller.makeHtmlElem("th","missed-col", 0);
        thLastCell.innerHTML = "Days Missed-col";
        headerRow.appendChild(thLastCell);
    }




}

view.addHeaderRowtoHtml()
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
