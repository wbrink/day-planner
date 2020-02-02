var plannerForm = $("#day-planner");
var lead = $(".lead");

var hourArray = [
  "8:00AM",
  "9:00AM",
  "10:00AM",
  "11:00AM",
  "12:00PM",
  "1:00PM",
  "2:00PM",
  "3:00PM",
  "4:00PM",
  "5:00PM",
  "6:00PM"
];

// momentjs getting current day and hour
var m = moment(); // get current date

var editableMoment = moment(); // copy that can be edited

var hour = m.hour();

// grab localstorage
var todos = JSON.parse(localStorage.getItem("todos"));

if (!todos) {
  todos = {};
}

// global variable for selected Calendar Day
var selCaledarDay;

//console.log(todos);

var commitments = $(document).ready(function() {
  var formattedDate = m.format("dddd, MMMM Do YYYY");
  lead.text(formattedDate);
  //console.log(m.hour());
  setupCalendar(m, true); // pass in datetime

  for (var i = 0; i < hourArray.length; i++) {
    var row = $("<div>").addClass("row");
    var index = i + 8; // dataindex returns the hour value 0-23 to match moment().hour()

    if (index < hour) {
      row.addClass("row-past");
    } else if (index == hour) {
      row.addClass("row-present");
    }
    // set data-index to i+8 since moment.hour() returns 0-23 (12AM=0, 1am = 1... 12pm = 12etc)
    var label = $("<label>")
      .attr("data-index", index)
      .text(hourArray[i]);

    // make editable div so the container is able to resize automattically if the user wants many rows
    var editableDiv = $("<div>").attr({ contenteditable: "true", class: "event-text", "data-hour": index });
    var saveDiv = $("<div>").attr("class", "save-container");

    saveDiv.append(
      $(
        `<svg xmlns="http://www.w3.org/2000/svg" data-index="${index}" class="save-button" viewBox="0 0 448 512"><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"/></svg>`
      )
    );

    row.append(label, editableDiv, saveDiv);
    plannerForm.append(row);
  } //end loop

  //after loading all elements place text in appropriate rows
  for (var property in todos) {
    $(`[data-hour=${property}]`).text(todos[property]);
  }
});

//event handlers
$(document).on("click", ".save-button", saveToDo); // targets all .save-button elements even if dynamically created
$(".change-month").on("click", changeMonthClick); // targets change month clicks on calendar

function saveToDo(event) {
  var hour = $(this).attr("data-index");
  var todo = $(`[data-hour=${hour}]`).text(); // gives me event-text that is supposed to be saved

  todos[hour] = todo;
  localStorage.setItem("todos", JSON.stringify(todos));
}

// setsup the calendar on load
// fromOnReady is boolean that tells whether function is called from document.onready function
function setupCalendar(momentObject, fromOnReady) {
  clearCalendar();
  // set the month and year for calendar
  $(".month-year").text(momentObject.format("MMMM YYYY"));
  var currentDay = momentObject.format("D");
  var daysInMonth = momentObject.daysInMonth();
  var startDayIndex = momentObject.startOf("month").format("d"); // gives the index of day su=0m monday=1...sat=6
  startDayIndex = parseInt(startDayIndex);

  //console.log("currentday: " + currentDay);
  // place days of week in correct position on calendar
  for (var i = 1; i <= daysInMonth; i++) {
    $(`[data-day=${startDayIndex}]`).text(i);

    // if not from on ready then day will not be highlighed since it was
    // called from function dealing with prev and next month clicks
    if (i === parseInt(currentDay) && fromOnReady) {
      selCaledarDay = $(`[data-day=${startDayIndex}]`);
      selCaledarDay.css("background-color", "rgb(41, 166, 197)");
    }
    startDayIndex++;
  }
}

function changeMonthClick() {
  // remove selected day highlight
  selCaledarDay.css("background-color", "white");

  var action = $(this).attr("data-value");
  if (action === "prev") {
    // subtract 1 from current month
    editableMoment = editableMoment.subtract(1, "months");
    setupCalendar(editableMoment, false);
  } else {
    editableMoment = editableMoment.add(1, "months");
    setupCalendar(editableMoment, false);
  }
}

function clearCalendar() {
  for (var i = 0; i < 35; i++) {
    $(`[data-day=${i}]`).text("");
  }
}
