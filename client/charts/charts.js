/**
* Created by utilisateur on 10/03/2016.
*/


Template.charts.onRendered(function () {
  Chart.defaults.global.responsive = true;

  var ctx = $("#myChart").get(0).getContext("2d");

  var myChart = new Chart(ctx).Line(data, Chart.defaults.global);

  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      { label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#000000",
      pointHighlightFill: "#000000",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    { label: "My Second dataset",
    fillColor: "rgba(151,187,205,0.2)",
    strokeColor: "rgba(151,187,205,1)",
    pointColor: "rgba(151,187,205,1)",
    pointStrokeColor: "#000000",
    pointHighlightFill: "#000000",
    pointHighlightStroke: "rgba(151,187,205,1)",
    data: [28, 48, 40, 19, 86, 27, 90]
  }
]
};
});
