//Our main javascript file

$(document).ready(function() {
	var stickyNavTop = $('#Nav').offset().top;

	var stickyNav = function() {
		var scrollTop = $(window).scrollTop();

		if (scrollTop > stickyNavTop) {
			$('#Nav').addClass('sticky');
		} else {
			$('#Nav').removeClass('sticky');
		}
	};

	stickyNav();

	$(window).scroll(function() {
		stickyNav();
	});


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
        $(this).next(".answer").slideToggle();
    });

});