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
});