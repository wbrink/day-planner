var plannerForm = $("#day-planner");

var hourArray = [
  "08:00AM",
  "09:00AM",
  "10:00AM",
  "11:00AM",
  "12:00PM",
  "01:00PM",
  "02:00PM",
  "03:00PM",
  "04:00PM",
  "05:00PM",
  "06:00PM"
];

//var m = moment("9:00AM", "h:mmA");

$(document).ready(function() {
  for (var i = 0; i < hourArray.length; i++) {
    var row = $("<div>").addClass("row");

    var label = $("<label>")
      .attr({ "data-index": i, for: `event-${i}` })
      .text(hourArray[i]);

    // make editable div so the container is able to resize automattically if the user wants many rows
    // textareas do not resize based on input only add scroll bar or manual resize
    var editableDiv = $("<div>").attr({ contenteditable: "true", class: "event-text" });
    var saveDiv = $("<div>").attr("class", "save-button");
    saveDiv.append($("<img>").attr({ src: "../../assets/images/save.svg", width: "20px" }));

    row.append(label, editableDiv, saveDiv);
    plannerForm.append(row);
  }
});

//console.log(m.toString());
