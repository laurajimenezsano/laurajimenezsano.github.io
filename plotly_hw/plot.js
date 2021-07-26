d3.json("data/samples.json").then(function(data) {
  // console.log(data);
  
  let datanames = data.names;
  var dropdown = d3.select("#selection");

  datanames.forEach(function (name) {
    dropdown.append("option").text(name).property("value",name);

  });

  // Select button and input form
  var button = d3.select("#button");
  var form = d3.select("#form");

  // Create event handlers for clicking the button or pressing the enter key
  button.on("click", runEnter);
  form.on("submit",runEnter);

  // Create the function to run for both events
  function runEnter() {

  // Prevent the page from refreshing
    d3.event.preventDefault();

  // Select the input element and get the raw HTML node
    var inputElement = d3.select("#selection");

  // Get the value property of the input element
    var inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(data);

    for (i in data.metadata) {
      if (data.metadata[i].id == inputValue) {
        var bacteriaID = data.metadata[i].id;
        var bacteriaEthnicity = data.metadata[i].ethnicity;
        var bacteriaGender = data.metadata[i].gender;
        var bacteriaAge = data.metadata[i].age;
        var bacteriaLocation = data.metadata[i].location;
        var bacteriaBB = data.metadata[i].bbtype;
        var bacteriaWF = data.metadata[i].wfreq;

      }
    }

    for (i in data.samples) {
      if (data.samples[i].id == inputValue) {
        var otuIDs = data.samples[i].otu_ids;
        var otuValues = data.samples[i].sample_values; 
        var otuLabels = data.samples[i].otu_labels; 
      }

    }
     
      // Then, select the unordered list element by class name
  var list = d3.select(".summary");

  // remove any bacteria information from the list to
  list.html("");

  // append stats to the list
  list.append("li").text(`Bacteria ID: ${bacteriaID}`);
  list.append("li").text(`Ethnicity: ${bacteriaEthnicity}`);
  list.append("li").text(`Gender: ${bacteriaGender}`);
  list.append("li").text(`Age: ${bacteriaAge}`);
  list.append("li").text(`Location: ${bacteriaLocation}`);
  list.append("li").text(`BBType: ${bacteriaBB}`);
  list.append("li").text(`wfreq: ${bacteriaWF}`);
  console.log(bacteriaWF)

    // console.log(bacteriaID);
    // console.log(bacteriaEthnicity);

  // Plotting bar chart
  var trace = {
    x: otuValues.slice(0, 10).reverse(),
    y: otuIDs.slice(0, 10).map(otuIDs => `ID ${otuIDs}`).reverse(),
    text: otuLabels.slice(0, 10).reverse(),
    type: 'bar',
    orientation: 'h',
  };

  var dataBar = [trace];

  var layout = {
    title: 'Top 10 OTU IDs'
    
  };

  Plotly.newPlot('plot', dataBar, layout);

  // Plotting gauge chart
  // var trace2 = [{
  //   domain:{x: [0,1], y:[0,1]},
  //   value: bacteriaWF,
  //   title: {text: 'Washing Frequency'},
  //   type: 'indicator',
  //   mode: "gauge+number",
  //   gauge: {axis: {range: [null,9]},
  //           steps: [
  //             {range: [0,1], color: "black"},
  //             {range: [1,2], color: "black"},
  //             {range: [2,3], color: "black"},
  //             {range: [3,4], color: "black"},
  //             {range: [4,5], color: "black"},
  //             {range: [5,6], color: "black"},
  //             {range: [6,7], color: "black"},
  //             {range: [7,8], color: "black"},
  //             {range: [8,9], color: "black"},

  //           ]}
  //   }
  // ];

  // var dataGauge = [trace2];

  // var layout2 = { width: 700, height: 600, margin: {t:20, b:40, l:100, r:100} };
  
  // Plotly.newPlot('plot2', dataGauge, layout2);


  // Plotting bubble chart
  var trace3 = {
    x: otuIDs,
    y: otuValues,
    marker: {
      color: otuIDs,
      size: otuValues,
      },
    text: otuLabels,
    mode: 'markers',
  };

  var dataBubble = [trace3];

  var layout3 = {
    xaxis: { title: "OTU ID" },
    title: 'OTU Values - Bubble Chart',
    };
  
  Plotly.newPlot('plot3', dataBubble, layout3);

  };

});