var tableData = data;
var filter = d3.select("#filter-btn");

var tbody = d3.select("tbody");

filter.on("click", function() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");
    var filterdata = tableData.filter(data => data.datetime === inputValue);
    filterdata.forEach((uforeport) => {
        var row = tbody.append("tr");
        Object.entries(uforeport).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
  });



