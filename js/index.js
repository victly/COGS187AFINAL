//Our main javascript file

$(document).ready(function() {

	$(".fancybox-thumb").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});

	$(".answer").hide(); // hide the answer divs first
    
    $(".question").click(function() {
        $(".answer:visible").slideToggle();
        $(this).next(".answer").slideToggle();        
    });

});