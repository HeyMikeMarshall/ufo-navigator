var tableData = data;
var filterbutton = d3.select("#filter-btn");

var tbody = d3.select("tbody");

var dateselector = d3.select("#datetime");
var stateselector = d3.select("#state");
var shapeselector = d3.select("#shape");
var countryselector = d3.select("#country");
var cityselector = d3.select("#city");

var statelist = [...new Set(tableData.map(x => x.state))];
var shapelist = [...new Set(tableData.map(x => x.shape))];
var countrylist = [...new Set(tableData.map(x => x.country))];

function multiFilter(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    return filterKeys.every(key => {
      if (!filters[key].length) return true;
      return filters[key].includes(item[key]);
    });
  });
}

function setselectors(list, item){
  list.forEach((value) => {
    var select = item.append('option');
    select.text(value);
  });
};

setselectors(statelist, stateselector);
setselectors(shapelist, shapeselector);
setselectors(countrylist, countryselector);

filterbutton.on("click", function() {
  d3.event.preventDefault();

  var extrows = document.getElementById("ufo-table").rows.length;
  if (extrows > 1){
    for(var i = extrows - 1; i > 0; i--){
      document.getElementById("ufo-table").deleteRow(i);
    }
  };

  var filter = {
    datetime: dateselector.property("value"),
    city: cityselector.property("value"),
    state: stateselector.property("value"),
    country: countryselector.property("value"),
    shape: shapeselector.property("value")
  }

  var filterdata = multiFilter(tableData, filter)
  
  filterdata.forEach((uforeport) => {
      var row = tbody.append("tr");
      Object.entries(uforeport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    });
  });