chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var dataclip_id = $('.settings-icon').attr('href').replace(/\//g,'').replace(/settings/g, '');
      console.log(dataclip_id);
      $('.page').after('<div class="page"><div class="row"><div class="col-xs-12"><canvas id="canvas" height="450" width="600"></canvas></div></div></div>' );








 var xhr = $.get("https://dataclips.heroku.com/" + dataclip_id + ".json");
      xhr.done(function(data) {
        var herokudata = data
        var labels = [];
        var data = [];
        var data2 = [];

        for (i = 0; i < herokudata.values.length; i++) {
          var pairs = herokudata.values[i];
          labels[i] = pairs[0];
          data[i] = pairs[1];
          if (pairs[2] = true){
            data2[i] = pairs[2];
          }
        }

        doWork(labels, data, data2);
      })

      function doWork (labels, data, data2) {
        var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
        var lineChartData = {
          labels : labels,
          datasets : [
            {
            label: "First Dataset",
            fillColor : "rgba(160, 140, 204, 0.3)",
            strokeColor : "#a18dcc",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data: data
          },
          {
            label: "Second Dataset",
            fillColor : "rgba(160, 140, 204, 0.5)",
            strokeColor : "#a18dcc",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(220,220,220,1)",
            data: data2
          }

          ]
        }
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
          responsive: true
        });
      }











    }
  }, 10);
});
