function getQuote() {
	//get a new quote
	$.ajax({
		url: "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?",
		dataType: "jsonp",
		success: function(data){
			changeBgColor();
			$(".quote-text").text(data.quoteText);
			//if no author make it unknown
			if(data.quoteAuthor === "") {
				$(".quote-author").html("&mdash; " + "Unknown");
			} else {
				$(".quote-author").html("&mdash; " + data.quoteAuthor);
			}
			$("#quote").fadeIn(2200);
		}
	});
}

function changeBgColor() {
	//array of possible bg colors
	var colors = ["rgb(0, 0, 0)", "rgb(26, 188, 156)", "rgb(243, 156, 18)", "rgb(52, 152, 219)", "rgb(231, 76, 60)", 
	"rgb(52, 73, 94)", "rgb(155, 89, 182)", "rgb(46, 204, 113)", "rgb(127, 140, 141)", "rgb(246, 36, 89)"];

	var index = colors.indexOf($("html,body").css("background-color"));

	//prevent duplicate colors on fade in
	if(index !== -1) {
		colors.splice(index, 1);
	}

	//randomly choose a bg color from the array
	var randomNumber = Math.floor(Math.random() * (colors.length - 1 + 1) + 1);
	$("html, body").css("background-color", colors[randomNumber]);
}

$(document).ready(function() {
	//get new quote once website is loaded
	getQuote();

	//get new quote
	$("#new-quote-btn").on("click", function(e) {
		e.preventDefault();
		$("#quote").fadeOut(10);
		
		getQuote();
	});
});
