$(document).ready(function(){
  var games = [
          {
            name: "Piotrowsky Park",
            location: "4247 W 31st St, Chicago, IL 60623",
            type: ["Women's Basketball", "Men's Basketball"],
            level: ["Competitive"]
          },
          {
            name: "Vittum Park", 
            location: "5010 W 50th St, Chicago, IL 60638",
            type: ["Women's Basketball"],
            level: ["Competitive"]
          },
          {
            name: "Pottawatomie Park",
            location: "7340 N Rogers Ave, Chicago, IL 60626",
            type: ["Women's Basketball"],
            level: ["Recreational" , "Competitive"]
          },
          {
            name: "Rauner YMCA",
            location: "2700 S Western Ave, Chicago, IL 60608",
            type: ["Women's Basketball", "Men's Basketball", "Youth Basketball"],
            level: ["Competitive"]
          },
          {
            name: "High Ridge YMCA",
            location: "2424 W Touhy Ave, Chicago, IL 60645",
            type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"],
            level: ["Competitive" , "Recreational"]
          },
          {
            name: "Ping Tom Park",
            location: "300 W 19th St, Chicago, IL 60616",
            type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"],
            level: ["Recreational", "Open Gym"]
          },
          {
            name: "McGuane Park",
            location: "2901 S Poplar Ave, Chicago, IL 60608",
            type: ["Men's Basketball", "Youth Basketball"],
            level: ["Recreational", "Open Gym"]
          },
          {
            name: "Chase Park",
            location: "4701 N Ashland Ave, Chicago, IL 60640",
            type: ["Women's Basketball"],
            level: ["Competitive"]
          },
          {
            name: "Lawndale Christian Fitness Center",
            location: "3750 W Ogden Ave, Chicago, IL 60623",
            type: ["Men's Basketball", "Women's Basketball"],
            level: ["Competitive"]
          }   
        ]
 $("#results").hide();



//get distance from entered zipcode to location of game
  

  function checkDistance(zipcode, location) {
    $.ajax({
      url: 'https://maps.googleapis.com/maps/api/distancematrix/json',
      data: {
        key: 'AIzaSyCmd0xB_4HTb1gHimgKe97BXOUyCLj9dQA',
        units: "imperial",
        origins: zipcode,
        destinations: location
      },
      dataType: 'json',
      type: 'GET',
      success: function(data){
        console.log("Get success")
        console.log(data);
      },
      error: function(error){
        console.log(error);
      }
    });    
  }

  var showResults = function(results, type, level) {
    console.log(results);
    // Iterate over results, create HTML for each listing, append to #results
    $("#results").empty();
    $("#results").show();
    for (var i = 0; i < results.length; i++) {
    		var html = "";
      html += "<p><em><b>" + results[i].name + "</b></em></p>";
      html += "<p>" + results[i].location + "</p>";
      html += "<p>" + type  + "</p>";
      html += "<p>" + level  + "</p><br>";
      $('#results').append(html);      
    }

  }

  var getGames = function(type, level, zipcode) {
    var results = []; 
    for (var i = 0; i < games.length; i++) {
      if (games[i].type.indexOf(type) >= 0 && games[i].level.indexOf(level) >= 0) {
        // check for map distance
        checkDistance(zipcode, games[i].location);
        results.push(games[i]);
      }
    }
    if (results.length === 0) {
      $("#results").append("Sorry, there is no match.");
    } else {
      showResults(results, type, level);
    }
  }

  $("#information").submit(function(e){
    e.preventDefault();
    var type = $("#type").val();
    var level = $("#level").val();
    var zipcode = $("#zipcode").val();
    getGames(type, level, zipcode);
  });
        
//if there is a match, pinpoint gyms on map (location = gameLocation)

//order gyms by distance to zipcode

});