

//Adjust height of top for nav stick to bottom
function adjust_height() {
	var navBarHeight = 75;
    var viewport_height = $(window).height()-navBarHeight;
    var topHeaderHeight = $('#mainHeader').height();
	var navOffset = viewport_height - topHeaderHeight;
		
	if ( navOffset > 0) {
	    $('#mainHeader').css('padding-top',navOffset/2);
	    $('#mainHeader').css('padding-bottom',navOffset/2);
	} else {
		$('#mainHeader').css('padding-top',0);
		$('#mainHeader').css('padding-bottom',0);
	}
};


// anystretch since tumblr data is coming in so tall it's breaking background
jQuery( window ).load(function() {
	// background images for fold/sections anyStretch plugin
	$('#mainHeader').anystretch('_img/_bgs/top_header_bg.jpg');
	$('#aboutSection').anystretch('_img/_bgs/about_bg.jpg');
	$('#currentSection').anystretch('_img/_bgs/current_bg.jpg');
	$('#fqSection').anystretch('_img/_bgs/faq_bg.jpg');
});

jQuery(document).ready(function($) {
	// $() will work as an alias for jQuery() inside of this function
	
    
    // NOT supporting ie6 one bit
	var IE6 = (navigator.userAgent.indexOf("MSIE 6")>=0) ? true : false;
	if(IE6){
		$(function(){
			window.location= 'http://ie6funeral.com/';		
		});
	}
	
	// background images for fold/sections anyStretch plugin
	$('#mainHeader').anystretch('_img/_bgs/top_header_bg.jpg');
	$('#aboutSection').anystretch('_img/_bgs/about_bg.jpg');
	$('#currentSection').anystretch('_img/_bgs/current_bg.jpg');
	$('#fqSection').anystretch('_img/_bgs/faq_bg.jpg');



	// sticky nav
	function sticky_relocate() {
	  var window_top = $(window).scrollTop();
	  var div_top = $('#sticky-anchor').offset().top;
	
	  if (window_top > div_top)
	    $('#sticky').addClass('stick');
	  else
	    $('#sticky').removeClass('stick');
	}
	 


	// On scroll events setting navigation
	// and check based on scrollUp or scrollDown
	// show hide toTop link
	
	$('#toTop').hide();
	
	var lastScrollTop = 0;
	var about_top = $('#aboutSection').offset().top;
	var artists_top = $('#artistSection').offset().top;
	var store_top = $('#storeSection').offset().top;
	var fq_top = $('#fqSection').offset().top;
	
	
	$(window).scroll(function(event){
	
	// sticky nav css NON mobile way
	   sticky_relocate();
	
	   var st = $(this).scrollTop();

	// sticky nav iPhone android mobile way
	// iOS 5 and below
	
	   if (navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i)) {
	   		//do nothing uses sticky_relocate above
	   } else if ( navigator.userAgent.match(/(iPod|iPhone|iPad)/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) ) {
	   		
	   		var window_top = $(window).scrollTop();
			var div_top = $('#sticky-anchor').offset().top;
	   		
	   		if (window_top > div_top) {
	   			$('#sticky').css({'top' : st , 'position' : 'absolute' });
   			} else {
   				$('#sticky').css({'top' : 'auto' });
   			}
	 	};	   
	   
	   var navTrip = $(window).height()/2-250;
	   
   
	   if (st > lastScrollTop){
	       // downscroll code
	       
			if ( about_top - st > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#toTop').fadeOut();
				
			} else if ( artists_top -st > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#sticky ul li a#studioLink').addClass('on');
				$('#toTop').fadeIn();
				
			} else if ( store_top - st > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#artistsLink').addClass('on');
			
			} else if ( fq_top > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#fqLink').addClass('on');
			}
	       
	       
	   } else {
	      // upscroll code
			if ( about_top - st > navTrip ) {
			$('#sticky ul li a').removeClass('on');
			$('#toTop').fadeOut();
							
			} else if ( artists_top -st > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#sticky ul li a#studioLink').addClass('on');
				
			} else if ( store_top - st > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#artistsLink').addClass('on');
			
			} else if ( fq_top > navTrip ) {
				$('#sticky ul li a').removeClass('on');
				$('#fqLink').addClass('on');
			}
	      
	   }
	   lastScrollTop = st;
	});
	
	
	
	
	
// NEW TUMBLR 2.1 API
	
//OAuth Consumer Key:  9aZGJgWPorpCvXchRM2nhWBShMEieBseeLY555EQFSZJq3nyWp

	// this is what we'll be grabbing
	// data.response.posts[0].timestamp
	// data.response.posts[0].caption
	// data.response.posts[0].photos[0].alt_sizes[1].url  *500px version of image

/**** LATEST NEWS ****/
	myJsonpCallback = function(data)
	{
		//console.log(data.response.posts[0]);
		
		var monthNames = [ "January", "February", "March", "April", "May", "June",
	    "July", "August", "September", "October", "November", "December" ];
		
		var tumbNewsTime = (data.response.posts[0].timestamp)*1000; //milliseconds for unix timestamp
		var date = new Date(tumbNewsTime);
		var prettyDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		
		var tumbNewsTxt = (data.response.posts[0].caption);
		var tumbNewsImg = (data.response.posts[0].photos[0].alt_sizes[1].url);

		$('#tumblrNews').html('<img src="' + tumbNewsImg + '" alt="Our Latest Tumblr News" class="circular" />');
	    $('#newsDate').html(prettyDate);
	    $('#newsTxt').html(tumbNewsTxt);
	    
	    // bind hover for jSON data
	    hoverInit();
	}
	
	$.ajax({
	    type: "GET",
	    url : "http://api.tumblr.com/v2/blog/seventhsontattoo.tumblr.com/posts/?&tag=news",
	    dataType: "jsonp",
	    data: {
	        api_key : "9aZGJgWPorpCvXchRM2nhWBShMEieBseeLY555EQFSZJq3nyWp",
	        jsonp : "myJsonpCallback"
	    }
	});


/**** LATEST POST ****/
	myJsonpCallback2 = function(data)
	{
		//console.log(data.response.posts[0]);
		
		var monthNames = [ "January", "February", "March", "April", "May", "June",
	    "July", "August", "September", "October", "November", "December" ];
		
		var tumbLatestTime = (data.response.posts[0].timestamp)*1000; //milliseconds for unix timestamp
		var date = new Date(tumbLatestTime);
		var prettyDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		
		var tumbLatestTxt = (data.response.posts[0].caption);
		var tumbLatestImg = (data.response.posts[0].photos[0].alt_sizes[1].url);

		$('#tumblrLatest').html('<img src="' + tumbLatestImg + '" alt="Our Latest Tumblr Post" class="circular" />');
	    $('#postDate').html(prettyDate);
	    $('#postTxt').html(tumbLatestTxt);
	    
	    // bind hover for jSON data
	    hoverInit();
	    
	    $(window).resize(adjust_height());
	    $('#mainHeader').anystretch('_img/_bgs/top_header_bg.jpg');
	}
	
	$.ajax({
	    type: "GET",
	    url : "http://api.tumblr.com/v2/blog/seventhsontattoo.tumblr.com/posts/",
	    dataType: "jsonp",
	    data: {
	        api_key : "9aZGJgWPorpCvXchRM2nhWBShMEieBseeLY555EQFSZJq3nyWp",
	        jsonp : "myJsonpCallback2"
	    }
	});
	
	
/**** LATEST SCHEDULE ****/
	myJsonpCallback3 = function(data)
	{
		//console.log(data.response.posts[0]);
		
		var monthNames = [ "January", "February", "March", "April", "May", "June",
	    "July", "August", "September", "October", "November", "December" ];
		
		var tumbScheduleTime = (data.response.posts[0].timestamp)*1000; //milliseconds for unix timestamp
		var date = new Date(tumbScheduleTime);
		var prettyDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		
		var scheduleTxt = (data.response.posts[0].caption);
		var scheduleImg = (data.response.posts[0].photos[0].alt_sizes[1].url);

		$('#tumblrSchedule').html('<img src="' + scheduleImg + '" alt="Our Schedule Tumblr Post" class="circular" />');
	    $('#scheduleDate').html(prettyDate);
	    $('#scheduleTxt').html(scheduleTxt);
	    
	    // bind hover for jSON data
	    hoverInit();
	}
	
	$.ajax({
	    type: "GET",
	    url : "http://api.tumblr.com/v2/blog/seventhsontattoo.tumblr.com/posts/?&tag=schedule",
	    dataType: "jsonp",
	    data: {
	        api_key : "9aZGJgWPorpCvXchRM2nhWBShMEieBseeLY555EQFSZJq3nyWp",
	        jsonp : "myJsonpCallback3"
	    }
	});
	
	
	
/**** LATEST PRESS ****/
	myJsonpCallback4 = function(data)
	{
		//console.log(data.response.posts[0]);
		
		var monthNames = [ "January", "February", "March", "April", "May", "June",
	    "July", "August", "September", "October", "November", "December" ];
		
		var tumbPressTime = (data.response.posts[0].timestamp)*1000; //milliseconds for unix timestamp
		var date = new Date(tumbPressTime);
		var prettyDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		
		var pressTxt = (data.response.posts[0].caption);
		var pressImg = (data.response.posts[0].photos[0].alt_sizes[1].url);

		$('#tumblrPress').html('<img src="' + pressImg + '" alt="Our Schedule Tumblr Post" class="circular" />');
	    $('#pressDate').html(prettyDate);
	    $('#pressTxt').html(pressTxt);
	    
	    // bind hover for jSON data
	    hoverInit();
	}
	
	$.ajax({
	    type: "GET",
	    url : "http://api.tumblr.com/v2/blog/seventhsontattoo.tumblr.com/posts/?&tag=press",
	    dataType: "jsonp",
	    data: {
	        api_key : "9aZGJgWPorpCvXchRM2nhWBShMEieBseeLY555EQFSZJq3nyWp",
	        jsonp : "myJsonpCallback4"
	    }
	});

/**** LATEST MERCH ****/
	myJsonpCallback5 = function(data)
	{
		//console.log(data.response.posts[0]);
		
		var monthNames = [ "January", "February", "March", "April", "May", "June",
	    "July", "August", "September", "October", "November", "December" ];
		
		var tumbMerchTime = (data.response.posts[0].timestamp)*1000; //milliseconds for unix timestamp
		var date = new Date(tumbMerchTime);
		var prettyDate = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
		
		var pressTxt = (data.response.posts[0].caption);
		var pressImg = (data.response.posts[0].photos[0].alt_sizes[1].url);

		$('#tumblrMerch').html('<img src="' + pressImg + '" alt="Our Merch Tumblr Post" class="circular" />');
	    $('#merchDate').html(prettyDate);
	    $('#merchTxt').html(pressTxt);
	    
	    // bind hover for jSON data
	    hoverInit();
	}
	
	$.ajax({
	    type: "GET",
	    url : "http://api.tumblr.com/v2/blog/seventhsontattoo.tumblr.com/posts/?&tag=merch",
	    dataType: "jsonp",
	    data: {
	        api_key : "9aZGJgWPorpCvXchRM2nhWBShMEieBseeLY555EQFSZJq3nyWp",
	        jsonp : "myJsonpCallback5"
	    }
	});

/* tumblr API v1 *************
	
// get Tumblr data LATEST POST
	var noCache = new Date().getTime();
	
$.getJSON("http://seventhsontattoo.tumblr.com/api/read/json?callback=?", {'noCache': noCache },
	  function(data) { 
	   //console.log(data);
	    
	    var firstPost = data.posts[0]['photo-url-500'];
	    var firstImg = firstPost;
	    
	    if(firstImg == null) {
	    	firstImg = 'http://seventhsontattoo.com/_img/fp-tumblr.jpg';
	    }
	    
	    var dateString = $(data.posts[0]).attr('unix-timestamp')*1000;
	    
	    var date = new Date(dateString);
	    
	    var monthNames = [ "January", "February", "March", "April", "May", "June",
	    "July", "August", "September", "October", "November", "December" ];
	    
	    var dateOutput = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
	    
	    var firstPostCap = data.posts[0]['photo-caption'];
	    
	    $('#tumblrMe').html('<img src="' + firstImg + '" alt="Our Latest Tumblr Post" class="circularSm" />');
	    $('#postDate').html(dateOutput);
	    $('#postBlurb').html(firstPostCap);
	    
	    // bind hover for jSON data
	    $('#tumblrMe img').on({
	    	mouseenter: function() {
    		$(this).transition({ opacity: .6 });
    		},
    		mouseleave: function(){
	    		$(this).transition({ opacity: 1 });
    		}
		});
	});
*/
	
	

	// hoverIntent opacity with transition
	function hoverInit() {
		
		function hoverOn() {
			$(this).transition({ opacity: .6 }); //$(this).transition({ scale: 1.02, opacity: .6 });
		};
		
		function hoverOff(){
			$(this).transition({ opacity: 1 });
		};
	
		$('img.circular, img.circularSm, img.fade, #nav li a#toTop').hoverIntent(hoverOn, hoverOff);
	};
	
	// set here for page and also in ajax call back to re-bind it
	hoverInit();
		


	// scroll to nav links sticky
	// browsers are different set here
	if ( $.browser.mozilla ) {
		$('#nav').localScroll({
			duration:1000,
			hash:false,
			offset:-95
		});
	} else {
		$('#nav').localScroll({
			duration:1000,
			hash:false,
			offset:-110
		});
	}
	
	// color box init
	//$(".inline").colorbox({inline:true, width:"98%"});
	
	$(".ajax").colorbox({
		onComplete:function(){ 
			//	alert('onComplete: colorbox has displayed the loaded content');
			// set width and height for modal window in percent
		},
		width:'98%',
		height:'98%',
		initialWidth:'98%',
		initialHeight:'98%',
		transition:'fade',
		title:true,
		fixed:true // keeps lightbox from moving on window scroll
	});

	
	// window resize for color box if open
	// setting top section height for nav stick to bottom
	$(window).resize(function(){
		$.colorbox.resize({width:'98%',height:'98%'});
		adjust_height();
		$('#mainHeader').anystretch('_img/_bgs/top_header_bg.jpg');
	});
	
	
	// faq section
	$('div[id^="faq"]').hide();
	$('div[id^="faq"]').css({'padding-bottom' : '20px'});

	$('a[href^= "#faq"]').click(function() {
		
		$('div[id^="faq"]').hide();
		$('a[href^= "#faq"]').removeClass('on');
		
		var thisTargetFaq = $(this).attr('href');
		$(thisTargetFaq).show('fast');
		$(this).addClass('on');
		
		$('#footer').animate({'border-width':'0px'},400,'swing',function(){ //timer smilano reset bg after animation
			$('#fqSection').anystretch("_img/_bgs/faq_bg.jpg");
		});
		return false;
	});
	
	
	

	
	// external links
	$('a[rel$="ext"]').click(function(){
		this.target = '_blank';
	});
	
	
		// fade in content after page is fully loaded
/*
	$(window).load(function() {
		$('#pageHolder').fadeIn('slow');
		$('#loader').fadeOut('slow');
		
		$('#mainHeader').anystretch('_img/_bgs/top_header_bg.jpg');
		$('#aboutSection').anystretch('_img/_bgs/about_bg.jpg');
		$('#currentSection').anystretch('_img/_bgs/current_bg.jpg');
		$('#fqSection').anystretch('_img/_bgs/faq_bg.jpg');
		
		sticky_relocate();
	});
*/


});
// END dom ready
