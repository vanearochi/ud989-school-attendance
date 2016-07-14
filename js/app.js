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

    getNames: function(){
        var nameList = [];
        $.each(model.attendanceRecord, function(name){
            nameList.push(name)

        })

        return nameList
    }
};
//model.bla
console.log(controller.getNames())
//console.log(model.nameList)
var view = {}
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
