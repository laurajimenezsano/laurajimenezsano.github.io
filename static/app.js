// from data.js
var tableData = data;
var tbody = d3.select("tbody");

// Function to create table

function createTable(tableData){
      // Clear existing
      tbody.html("");
      // loop and append
      tableData.forEach((ufo_info) => {
        var row = tbody.append("tr");
        Object.entries(ufo_info).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
  })
}
 
  // COMMAND TO FILTER


// Getting a reference to the button on the page with the id property set to `click-me`
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#filters");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    if(inputValue) {
      var filteredData = tableData.filter((row) => row.datetime === inputValue);

    }

    createTable(filteredData);

}

createTable(tableData);