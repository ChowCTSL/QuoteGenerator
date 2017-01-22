function getQuote() {
	//get a new quote
	var author ="&mdash; ";
	$.ajax({
		url: "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?",
		dataType: "jsonp",
		success: function(data){
			changeBgColor();
			$(".quote-text").text(data.quoteText);
			//if no author make it unknown
			if(data.quoteAuthor === "") {
				author += "Unknown";
			} else {
				author += data.quoteAuthor;
			}

			$(".quote-author").html(author);
			$("#quote").fadeIn(2200);
		}
	});
}


function tweetQuote(){

        var quote = $(".quote-text").text();
        var author = $(".quote-author").text();
        
        var tweet = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(quote + " \n" + author);
        
        window.open(tweet, "_blank");    
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

	//on hover, make the button font color the same as background
	$("#new-quote-btn, #twitter-btn").hover(function() {
		$(this).css("color", $("html, body").css("background-color"));

	}, function(){
        // change to text color that was previously used.
        $(this).css("color", "#fff");
    });

    $("#new-quote-btn, #twitter-btn").on("click", function() {
		$(this).blur();
    });

    $("#twitter-btn").on("click", function(){
    	tweetQuote();
    });

});
