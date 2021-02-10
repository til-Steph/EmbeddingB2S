console.log("app.js has loaded");

let viz;
// creates the variable but doesn't assign it to anything yet

let isVizHidden = false;

// TO DO LIST :
// create variables for url, container and the options of the dashboard
// create a function that initialises the dashboard
// execute this function when the page loads
// create buttons to interact with export options

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

const vizContainer = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  Category: ["Furniture", "Office Supplies"],
};

// setup pdf button functionality
const pdfButton = document.getElementById("exportPDF");
pdfButton.addEventListener("click", function () {
  console.log("You clicked the pdf button!");
  viz.showExportPDFDialog();
});

// setup crosstab button functionality
// grab button
// when click add message to console
// on click export crosstab
const crosstabButton = document.getElementById("exportCrosstab");
crosstabButton.addEventListener("click", function () {
  console.log("You clicked the crosstab button!");
  viz.showExportCrossTabDialog("subcategory-view");
});

// grab the button
// when you click the button hide the viz
// when you click the button update the text to show
const showHideButton = document.getElementById("showHideViz");
showHideButton.addEventListener("click", showHideHandler);
function showHideHandler() {
  if (isVizHidden === false) {
    console.log("You clicked the ShowHide button");
    viz.hide();
    showHideButton.innerText = "Show Viz";
    isVizHidden = true;
  } else {
    console.log("You clicked the ShowHide button");
    viz.show();
    showHideButton.innerText = "Hide Viz";
    isVizHidden = false;
  }
}

//make range values and apply button interactive
const applyFilterButton = document.getElementById("applyFilter");
applyFilterButton.addEventListener("click", getRangeValues);

// this isn't best practice - should define tbis function before using it above
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("Sales", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter has been applied!"));
}

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();

// Tableau javascript api documentation at https://help.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm
