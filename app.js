$(document).ready(function(){

	var games = {
		park: [
			{
				name: "Piotrowsky Park",
				location: "4247 W 31st St, Chicago, IL 60623",
				type: ["Women's Basketball", "Men's Basketball"]
				level: "Competitive",
			},
			{
				name: "Vittum Park", 
				location: "5010 W 50th St, Chicago, IL 60638",
				type: "Women's Basketball",
				level: "Competitive",
			},
			{
				name: "Pottawatomie Park",
				location: "7340 N Rogers Ave, Chicago, IL 60626",
				type: "Women's Basketball",
				level: ["Recreational" , "Competitive"]
			},
			{
				name: "Rauner YMCA",
				location: "2700 S Western Ave, Chicago, IL 60608",
				type: ["Women's Basketball", "Men's Basketball", "Youth Basketball"]
				level: "Competitive",
			},
			{
				name: "High Ridge YMCA",
				location: "2424 W Touhy Ave, Chicago, IL 60645",
				type: ["Men's Basketball", "Youth Basketball", "Co-ed Basketball"]
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
				level: ["Recreational", "Open Gym"],
			},
			{
				name: "Chase Park",
				location: "4701 N Ashland Ave, Chicago, IL 60640",
				type: "Women's Basketball",
				level: "Competitive",
			},
			{
				name: "Lawndale Christian Fitness Center",
				location: "3750 W Ogden Ave, Chicago, IL 60623",
				type: ["Men's Basketball", "Women's Basketball"],
				level: "Competitive",
			},		
		]
	}

	$("#submit").submit(function(e){
		e.preventDefault();
		var type = $("#type").val();
		var level = $("#level").val();
		var zipcode = $("#zipcode").val();
	});

});