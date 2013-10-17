/*====================================================================================================
=GLOBAL VARIABLES
====================================================================================================*/

/*==================================================
=GET CURRENT PAGE NAME
==================================================*/
var $url = window.location.pathname;

var $url_parts = $url.split("/");

if ($url_parts[$url_parts.length-1].length == 0) {
	$page = $url_parts[$url_parts.length-2];
}
else {
	$page = $url_parts[$url_parts.length-1];  
}

if($page == '') {
	$page = 'home';
}

/*==================================================
=GET PREV PAGE NAME
==================================================*/
var $prev_url = $url_parts[$url_parts.length-3];

/*==================================================
=TIER 1 PANELS
==================================================*/
var $panels = new Array();
$panels[0] = 'home';
$panels[1] = 'agente';
$panels[2] = 'telefono';
$panels[3] = 'institucion';
$panels[4] = 'restaurante';
$panels[5] = 'movilidad';
$panels[6] = 'entretenimiento';

/*==================================================
=GET THE MODE
==================================================*/
var $mode = getUrlVar('mode');

/*==================================================
=SET SCREENREADER MODE
==================================================*/
if($mode == 'screenreader') {
	$.cookie('screenreader', 1, { expires: 365, path: '/' });
}

if($.cookie('screenreader') == 1) {
	$('html').addClass('screenreader');
}

/*==================================================
=CHECK MYHAWAII
==================================================*/
var $myhawaii_accessed = 0;

/*==================================================
=BODY WIDTH
==================================================*/
$(function() {
	bg_width = $('body').width();
});

$(window).resize(function() {
	bg_width = $('body').width();
	swipe_container_height();
	$('.swipe_panels').css('left', $('.active_swipe').index() * -bg_width);
	if(bg_width >= 768) {
		if($.inArray($page, $panels) >= 0) {
			$('.home_tiles').show();
			if($('.home_search_container').css('top').replace('px', '') == 150) {
				$('.home_search_container').css('top', 0);
			}
		}
		$('body').css('background-image', 'url(' + $('body').attr('data-bg') + ')');
	}
	if(bg_width < 768) {
		$('body').css('background-image', 'none');
	}
});

/*====================================================================================================
=FUNCTIONS
====================================================================================================*/

/*==================================================
=DETECT MOBILE
==================================================*/
function is_mobile() {
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		return true;
	}
	return false;
}

function is_ios() {
	if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
		return true;
	}
	return false;
}

function is_android() {
	if(/Android/i.test(navigator.userAgent)) {
		return true;
	}
	return false;
}

/*==================================================
=GET URL PARAMETER
==================================================*/
function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && result[1] || ""; 
}

/*==================================================
=ANIMATE HOME ELEMENTS
==================================================*/
function animate_home() {
	if(bg_width >= 768) {
		if($.cookie('text_size') < 0) {
			$('.home_search_container .home_search').parent('.columns').animate({'top': 0 - $.cookie('text_size') * 20}, 500, function() {
				$('.home_tiles').fadeIn();
				swipe_container_height();
				//if($page == 'home' && !is_mobile()) {
				//	$('#q').focus();
				//}
			});	
		}
		else {
			$('.home_search_container .home_search').parent('.columns').animate({'top': 0}, 500, function() {
				$('.home_tiles').fadeIn();
				swipe_container_height();
				//if($page == 'home' && !is_mobile()) {
				//	$('#q').focus();
				//}
			});
		}
	}
	else {
		//$('.home_search_container .home_search').parent('.columns').css('top', -150);
		$('.home_tiles').show();
	}
}

/*==================================================
=CAPITALIZE FIRST LETTER
==================================================*/
function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*==================================================
=CAPITALIZE FIRST LETTER OF WORDS IN STRING
==================================================*/
function uppercase(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/*==================================================
=COMMAS ON LONG NUMBERS
==================================================*/
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

/*==================================================
=PREP POPULAR SERVICE TILE
==================================================*/
function popular_services_tile() {
	$('.popular_services_panel:first').clone().appendTo('#popular_services_panels');
	$('#popular_services_panels').css('width', ($('.popular_services_panel').length + 1) * 100 + '%');
	$('.popular_services_panel').each(function() {
		$(this).css('width', 100 / ($('.popular_services_panel').length + 1) + '%');
	})
}

/*==================================================
=STRIP HAWAIIAN CHARACTERS FROM TITLES
==================================================*/
function strip_haw_chars() {
	$('a').each(function() {
		if($(this).prop('title').length > 0) {
			var a_title = $(this).prop('title').replace(/\&#699;/g, '').replace(/\&amp;/g, '&').replace(/\&#257;/g, 'a');
			$(this).prop('title', a_title);
		}
	});
}

/*==================================================
=OPEN MODAL
==================================================*/
function open_modal(target) {
	var premodal_click_url = document.URL;
	var modal_url = target;
	var url = modal_url + '/ .modal_container > *';
	$(document).foundation('reveal', {closeOnBackgroundClick: true, dismissModalClass: 'close_modal', closed: function() {history.back(); $('#modal_content').html('<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>')}});
	$('#modal_content').load(url, function() {
		strip_haw_chars();
		$('.number_commas').digits();
		$("a[href^='http://']").attr("target","_blank");
		$("a[href^='https://']").attr("target","_blank");
		if($('#modal_function').length) {
			window.setTimeout(function() {eval($('#modal_function').html().replace(/&quot;/g, ''));} , 500);
		}
		responsive_tables(1);
		weather_tiles();
		weather_icon();
		history.pushState(null, null, modal_url);
	});
	$('#modal').removeClass('myhi_feed_error').foundation('reveal', 'open');
}

/*==================================================
=GO TO URL ON DROPDOWN
==================================================*/
function go_to_url() {
	window.location=document.getElementById("mobile_select").value
}

/*==================================================
=CHANGE FONT SIZE FROM COOKIE
==================================================*/
function change_font_size() {
	var current_font_size = $('body').css('font-size').replace('px', '');
	$('body').css('font-size', parseInt(current_font_size) + (parseInt($.cookie('text_size')) * 2));
}

/*==================================================
=SET TEXT ONLY MODE FROM COOKIE
==================================================*/
function text_only() {
	var text_only = $.cookie('text_only');
	if(text_only == undefined) {
		text_only = 0;
	}
	
	if(text_only == 1) {
		$('html').addClass('text-only');
	}
}

/*==================================================
=SWIPE BUTTONS
==================================================*/
function swipe_button() {
	if($('.active_swipe').index() == 0) {
		$('#swipe_left').hide();
		$('#swipe_right').show();
	}
	else if($('.active_swipe').index() == $('.swipe_panel').length - 1) {
		$('#swipe_right').hide();
		$('#swipe_left').show();
	}
	else {
		$('.swipe_button').show();
	}
}

/*==================================================
=UPDATE URL
==================================================*/
function update_url(slide_name, slide_title) {
	if(slide_name == 'home') {
		history.pushState(null, null, '/');
		document.title = 'ListaPeru.com | Dodne encontraras de todo';
	}
	else {
		history.pushState(null, null, '/' + slide_name + '/');	
		document.title = 'ListaPeru.com | ' + slide_title;	
	}
}

/*==================================================
=REMOVE MULTIPOLE INSTANCES IOF USA SEARCH TYPE AHEAD
==================================================*/
function remove_usa_search_typeahead(slide_name) {
	if(slide_name == 'home') {
		$('.header_search').find('input[type="search"]').removeClass('usagov-search-autocomplete ui-autocomplete-input');
		$('.home_search').find('input[type="search"]').addClass('usagov-search-autocomplete ui-autocomplete-input');
	}
	else {
		$('.home_search').find('input[type="search"]').removeClass('usagov-search-autocomplete ui-autocomplete-input');
		$('.header_search').find('input[type="search"]').addClass('usagov-search-autocomplete ui-autocomplete-input');
	}
}

/*==================================================
=UPDATE NAV CURRENT
==================================================*/
function update_nav(new_slide) {
	$('.navigation li').removeClass('current');
	$('.navigation').find('a[href="/' + new_slide + '"]').parent().addClass('current');
}

/*==================================================
=MATCH SWIPE CONTAINER HEIGHT WITH ACTIVE SWIPE
==================================================*/
function swipe_container_height() {
	// if(bg_width < 768) {
		$('.swipe_container').height($('.active_swipe').outerHeight());
	// }
}

/*==================================================
=ALL IN ONE SWIPE FUNCTION
==================================================*/
function swipe(slide_name, slide_title) {
	swipe_button();
	update_url(slide_name, slide_title);
	update_nav(slide_name);
	swipe_container_height();
	remove_usa_search_typeahead(slide_name)
}

/*==================================================
=WEATHER ICON
==================================================*/
function weather_icon() {
	var w_icons=[
		'Mostly Cloudy','H',
		'Mostly Cloudy with Haze','H',
		'Mostly Cloudy and Breezy','H',
		'Fair','B',
		'Clear','H',
		'Fair with Haze','H',
		'Clear with Haze','H',
		'Fair and Breezy','H',
		'Clear and Breezy','H',
		'A Few Clouds','E',
		'A Few Clouds with Haze','H',
		'A Few Clouds and Breezy','H',
		'Partly Cloudy','H',
		'Partly Cloudy with Haze','H',
		'Partly Cloudy and Breezy','H',
		'Overcast','N',
		'Overcast with Haze','N',
		'Overcast and Breezy','N',
		'Fog/Mist','J',
		'Fog','J',
		'Freezing Fog','J',
		'Shallow Fog','J',
		'Partial Fog','J',
		'Patches of Fog','J',
		'Fog in Vicinity','J',
		'Freezing Fog in Vicinity','J',
		'Shallow Fog in Vicinity','J',
		'Partial Fog in Vicinity','J',
		'Patches of Fog in Vicinity','J',
		'Showers in Vicinity Fog','J',
		'Light Freezing Fog','J',
		'Heavy Freezing Fog',')',
		'Smoke','W',
		'Freezing Rain','W',
		'Freezing Drizzle','W',
		'Light Freezing Rain','W',
		'Light Freezing Drizzle','W',
		'Heavy Freezing Rain','W',
		'Heavy Freezing Drizzle','W',
		'Freezing Rain in Vicinity','W',
		'Freezing Drizzle in Vicinity','X',
		'Ice Pellets','X',
		'Light Ice Pellets','X',
		'Heavy Ice Pellets','X',
		'Ice Pellets in Vicinity','X',
		'Showers Ice Pellets','X',
		'Thunderstorm Ice Pellets','X',
		'Ice Crystals','X',
		'Hail','X',
		'Small Hail/Snow Pellets','X',
		'Light Small Hail/Snow Pellets','X',
		'Heavy small Hail/Snow Pellets','X',
		'Showers Hail','X',
		'Hail Showers','X',
		'Freezing Rain Snow','W',
		'Light Freezing Rain Snow','W',
		'Heavy Freezing Rain Snow','W',
		'Freezing Drizzle Snow','W',
		'Light Freezing Drizzle Snow','W',
		'Heavy Freezing Drizzle Snow','W',
		'Snow Freezing Rain','W','Light Snow Freezing Rain','W','Heavy Snow Freezing Rain','W','Snow Freezing Drizzle','W',
		'Light Snow Freezing Drizzle','W',
		'Heavy Snow Freezing Drizzle','X','Rain Ice Pellets','X','Light Rain Ice Pellets','X','Heavy Rain Ice Pellets','X',
		'Drizzle Ice Pellets','X',
		'Light Drizzle Ice Pellets','X','Heavy Drizzle Ice Pellets','X','Ice Pellets Rain','X','Light Ice Pellets Rain','X',
		'Heavy Ice Pellets Rain','X',
		'Ice Pellets Drizzle','X','Light Ice Pellets Drizzle','X','Heavy Ice Pellets Drizzle','V','Rain Snow','Light Rain Snow','V',
		'Heavy Rain Snow','V',
		'Snow Rain','V','Light Snow Rain','V','Heavy Snow Rain','V','Drizzle Snow','V','Light Drizzle Snow','V','Heavy Drizzle Snow','V',
		'Snow Drizzle','V',
		'Light Snow Drizzle','V','Heavy Drizzle Snow','V','Rain Showers','Q','Light Rain Showers','Q','Light Rain and Breezy','Q',
		'Heavy Rain Showers','R',
		'Rain Showers in Vicinity','R','Light Showers Rain','R','Heavy Showers Rain','R','Showers Rain','R','Showers Rain in Vicinity','R',
		'Rain Showers Fog/Mist','R',
		'Light Rain Showers Fog/Mist','R','Heavy Rain Showers Fog/Mist','R','Rain Showers in Vicinity Fog/Mist','R','Light Showers Rain Fog/Mist','R',
		'Heavy Showers Rain Fog/Mist','R','Showers Rain Fog/Mist','R','Showers Rain in Vicinity Fog/Mist','R','Thunderstorm','Z','Thunderstorm Rain','Z',
		'Light Thunderstorm Rain','Z','Heavy Thunderstorm Rain','Z','Thunderstorm Rain Fog/Mist','Z','Light Thunderstorm Rain Fog/Mist','Z',
		'Heavy Thunderstorm Rain Fog and Windy','Z','Heavy Thunderstorm Rain Fog/Mist','Z','Thunderstorm Showers in Vicinity','Z',
		'Light Thunderstorm Rain Haze','Z','Heavy Thunderstorm Rain Haze','Z','Thunderstorm Fog','Z','Light Thunderstorm Rain Fog','Z',
		'Heavy Thunderstorm Rain Fog','Z','Thunderstorm Light Rain','Z','Thunderstorm Heavy Rain','Z','Thunderstorm Rain Fog/Mist','Z',
		'Thunderstorm Light Rain Fog/Mist','Z','Thunderstorm Heavy Rain Fog/Mist','Z','Thunderstorm in Vicinity Fog/Mist','Z',
		'Thunderstorm Showers in Vicinity','Z','Thunderstorm in Vicinity Haze','Z','Thunderstorm Haze in Vicinity','Z',
		'Thunderstorm Light Rain Haze','Z','Thunderstorm Heavy Rain Haze','Z','Thunderstorm Fog','Z','Thunderstorm Light Rain Fog','Z',
		'Thunderstorm Heavy Rain Fog','Z','Thunderstorm Hail','Z','Light Thunderstorm Rain Hail','Z','Heavy Thunderstorm Rain Hail','Z',
		'Thunderstorm Rain Hail Fog/Mist','Z','Light Thunderstorm Rain Hail Fog/Mist','Z','Heavy Thunderstorm Rain Hail Fog/Hail','Z',
		'Thunderstorm Showers in Vicinity Hail','Z','Light Thunderstorm Rain Hail Haze','Z','Heavy Thunderstorm Rain Hail Haze','Z',
		'Thunderstorm Hail Fog','Z','Light Thunderstorm Rain Hail Fog','Z','Heavy Thunderstorm Rain Hail Fog','Z','Thunderstorm Light Rain Hail','Z',
		'Thunderstorm Heavy Rain Hail','Z','Thunderstorm Rain Hail Fog/Mist','Z','Thunderstorm Light Rain Hail Fog/Mist','Z','Thunderstorm Heavy Rain Hail Fog/Mist','Z',
		'Thunderstorm in Vicinity Hail','Z','Thunderstorm in Vicinity Hail Haze','Z','Thunderstorm Haze in Vicinity Hail','Z','Thunderstorm Light Rain Hail Haze','Z',
		'Thunderstorm Heavy Rain Hail Haze','Z','Thunderstorm Hail Fog','Z','Thunderstorm Light Rain Hail Fog','Z','Thunderstorm Heavy Rain Hail Fog','Z',
		'Thunderstorm Small Hail/Snow Pellets','Z','Thunderstorm Rain Small Hail/Snow Pellets','Z','Light Thunderstorm Rain Small Hail/Snow Pellets','Z',
		'Heavy Thunderstorm Rain Small Hail/Snow Pellets','Z','W','Snow','W','Light Snow','W','Heavy Snow','W','Snow Showers','W','Light Snow Showers',
		'W','Heavy Snow Showers','W','Showers Snow','W','Light Showers Snow','W','Heavy Showers Snow','W','Snow Fog/Mist','W','Light Snow Fog/Mist','W',
		'Heavy Snow Fog/Mist','W','Snow Showers Fog/Mist','W','Light Snow Showers Fog/Mist','W','Heavy Snow Showers Fog/Mist','W','Showers Snow Fog/Mist','W',
		'Light Showers Snow Fog/Mist','W','Heavy Showers Snow Fog/Mist','W','Snow Fog','W','Light Snow Fog','W','Heavy Snow Fog','W','Snow Showers Fog','W',
		'Light Snow Showers Fog','W','Heavy Snow Showers Fog','W','Showers Snow Fog','W','Light Showers Snow Fog','W','Heavy Showers Snow Fog','W',
		'Showers in Vicinity Snow','W','Snow Showers in Vicinity','Snow Showers in Vicinity Fog/Mist','W','Snow Showers in Vicinity Fog','W',
		'Low Drifting Snow','W','W','Blowing Snow','W','Snow Low Drifting Snow','W','Snow Blowing Snow','W','Light Snow Low Drifting Snow','W',
		'Light Snow Blowing Snow','W','Light Snow Blowing Snow Fog/Mist','W','Heavy Snow Low Drifting Snow','W','Heavy Snow Blowing Snow','Z',
		'Thunderstorm Snow','Z','Light Thunderstorm Snow','Z','Heavy Thunderstorm Snow','Z','Snow Grains','U','Light Snow Grains','U',
		'Heavy Snow Grains','U','Heavy Blowing Snow','U','Blowing Snow in Vicinity','U','Windy','F','Breezy','F','Fair and Windy','F',
		'A Few Clouds and Windy','S','Partly Cloudy and Windy','S','Mostly Cloudy and Windy','S','Overcast and Windy','R','Showers in Vicinity','R',
		'Showers in Vicinity Fog/Mist','R','Showers in Vicinity Fog','R','Showers in Vicinity Haze','R','Freezing Rain Rain','R','Light Freezing Rain Rain','R',
		'Heavy Freezing Rain Rain','R','Rain Freezing Rain','R','Light Rain Freezing Rain','R','Heavy Rain Freezing Rain','R','Freezing Drizzle Rain','R',
		'Light Freezing Drizzle Rain','R','Heavy Freezing Drizzle Rain','R','Rain Freezing Drizzle','R','Light Rain Freezing Drizzle','R','Heavy Rain Freezing Drizzle','R','Z',
		'Thunderstorm in Vicinity','Z','Thunderstorm in Vicinity Fog','Z','Thunderstorm in Vicinity Haze','Z','Q','Light Rain','Q',
		'Drizzle','Q','Light Drizzle','Q','Heavy Drizzle','Q','Light Rain Fog/Mist','Q','Drizzle Fog/Mist','Q','Light Drizzle Fog/Mist','Q',
		'Heavy Drizzle Fog/Mist','Q','Light Rain Fog','Q','Drizzle Fog','Q','Light Drizzle Fog','Q','Heavy Drizzle Fog','Q','Rain','R','Heavy Rain','R',
		'Rain Fog/Mist','R','Heavy Rain Fog/Mist','R','Rain Fog','R','Heavy Rain Fog','R','Funnel Cloud',')','Funnel Cloud in Vicinity',')','Tornado/Water Spout',')','Dust',')',
		'Low Drifting Dust',')','Blowing Dust',')','Sand',')','Blowing Sand',')','Low Drifting Sand',')','Dust/Sand Whirls',')','Dust/Sand Whirls in Vicinity',')','Dust Storm',')',
		'Heavy Dust Storm',')','Dust Storm in Vicinity',')','Sand Storm',')','Heavy Sand Storm',')','Sand Storm in Vicinity',')','Haze','J']
	
	$('.weather_panel').each(function() {
		var condition = $(this).find('.w_condition').html().split(' and ')[0];
		if($.inArray(condition, w_icons) >= 0) {
			$(this).find('.w_icon').attr('data-icon', w_icons[$.inArray(condition, w_icons) + 1]);
		}
	});
	
	$('.visitor_weather_panel').each(function() {
		var condition = $(this).find('.vw_condition').html().split(' and ')[0];
		if($.inArray(condition, w_icons) >= 0) {
			$(this).find('.vw_icon').attr('data-icon', w_icons[$.inArray(condition, w_icons) + 1]);
		}
	});
	
	$('.wp_weather_container').each(function() {
		var condition = $(this).find('.wp_weather_condition').html().split(' and ')[0];
		if($.inArray(condition, w_icons) >= 0) {
			$(this).find('.wp_weather_icon').attr('data-icon', w_icons[$.inArray(condition, w_icons) + 1]);
			$(this).find('.wp_weather_icon_bg').attr('data-icon', w_icons[$.inArray(condition, w_icons) + 1]);
		}
	});
}

/*========== FOUNDATION RESPONSIVE TABLES - fa91c16 ==========*/
function responsive_tables(modal) {
	var switched = false;
    var updateTables = function() {
      if (($(window).width() < 767) && !switched ){
        switched = true;
        $("table.responsive").each(function(i, element) {
          splitTable($(element));
        });
        return true;
      }
      else if (switched && ($(window).width() > 767)) {
        switched = false;
        $("table.responsive").each(function(i, element) {
          unsplitTable($(element));
        });
      }
    };
     
    $(window).load(updateTables);
    $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
    $(window).on("resize", updateTables);
     
    if(modal == 1) {
      if (($(window).width() < 767) && !switched ){
        switched = true;
        $("table.responsive").each(function(i, element) {
          splitTable($(element));
        });
        return true;
      }
      else if (switched && ($(window).width() > 767)) {
        switched = false;
        $("table.responsive").each(function(i, element) {
          unsplitTable($(element));
        });
      }
    }
  	
  	function splitTable(original)
  	{
  		original.wrap("<div class='table-wrapper' />");
  		
  		var copy = original.clone();
  		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
  		copy.removeClass("responsive");
  		
  		original.closest(".table-wrapper").append(copy);
  		copy.wrap("<div class='pinned' />");
  		original.wrap("<div class='scrollable' />");
  
      setCellHeights(original, copy);
  	}
  	
  	function unsplitTable(original) {
      original.closest(".table-wrapper").find(".pinned").remove();
      original.unwrap();
      original.unwrap();
  	}
  
    function setCellHeights(original, copy) {
      var tr = original.find('tr'),
          tr_copy = copy.find('tr'),
          heights = [];
  
      tr.each(function (index) {
        var self = $(this),
            tx = self.find('th, td');
  
        tx.each(function () {
          var height = $(this).outerHeight(true);
          heights[index] = heights[index] || 0;
          if (height > heights[index]) heights[index] = height;
        });
  
      });
  
      tr_copy.each(function (index) {
        $(this).height(heights[index]);
      });
    }
}

/*==================================================
=WEATHER TILES
==================================================*/
function weather_tiles() {
	$('.wp_weather_container').each(function() {
		temp1 = $(this).attr('data-temp');
		max_temp = 100, // set maximum expected temperature
		min_temp = 60, // set minimum temperature
		temp_range = max_temp - min_temp, // calculate range
		temp_rating = Math.floor(((temp1 - min_temp) / temp_range) * 255) // express value in terms of the range multiplied by 255
		red = temp_rating, // more temp = more red
		blue = 255 - temp_rating; // more temp = less blue
		$(this).css('background', 'rgb(' + red + ',0,' + blue + ')');
	});
}

/*==================================================
=MAP MARKERS
==================================================*/
function map_markers(map, markers) {
	var infowindow = new google.maps.InfoWindow(), marker, i;
	var i = 0;
	var image = '/public/assets/images/map_marker.png';

	$(markers).each(function(index, value) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(value[1], value[2]),
			map: map,
			icon: image
		});
		
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var content1;
				var content2;
				var content3;
				var string = '<div class="infowindow"><span class="iw_title">' + value[0] + '</span>';
				if($(value[3]).size() > 0) {
					string += '<span class="iw_subtitle">Address</span>' + value[3].address + '<br />' + value[3].city + ', ' + value[3].state + ', ' + value[3].zip;
				}
				if(value[4].length > 0) {
					if(value[5].length == 0) {
						content1 = 'None Given';
					}
					else {
						content1 = value[5]
					}
					string += '<span class="iw_subtitle">' + value[4] + '</span>' + content1;
				}
				if(value[6].length > 0) {
					if(value[7].length == 0) {
						content2 = 'None Given';
					}
					else {
						content2 = value[7]
					}
					string += '<span class="iw_subtitle">' + value[6] + '</span>' + content2;
				}
				if(value[8].length > 0) {
					if(value[9].length == 0) {
						content3 = 'None Given';
					}
					else {
						content3 = value[9]
					}
					string += '<span class="iw_subtitle">' + value[8] + '</span>' + content3;
				}
				infowindow.setContent(string);
				infowindow.open(map, marker);
			}
		})(marker, i));
		i++;
	});
}

/*==================================================
=SHOW ALERT
==================================================*/
/* function notification(data) {
	var alert_dismissed = $.cookie('alert_dismissed');
	var alert_array = data.feed.entry[0].content.$t.split(', ');
	var background = alert_array[0].replace('background: ', '');
	var begindate = new Date(alert_array[1].replace('begindate: ', '')).getTime() / 1000;
	var enddate = (new Date(alert_array[2].replace('enddate: ', '')).getTime() / 1000) + 86399;
	var active = alert_array[3].replace('active: ', '');
	var timenow = Math.round(+new Date()/1000);
	if(alert_dismissed == undefined) {
		alert_dismissed = 0;
	}
	if(active == 1) {
		if(timenow >= begindate && timenow <= enddate) {
			if(alert_dismissed != 1) {
				var noty = $('#alert_container').noty({
					closeWith: ['button'],
					type: background, 
					layout: 'top',
					text: '<div class="alert"><i class="icon-warning-sign"></i> <span>' + data.feed.entry[0].title.$t + '</span></div>',
					callback: {
						onClose: function() {
							$.cookie('alert_dismissed', 1, { expires: 1, path: '/' });
						}
					}
				})
			}
		}
	}
} */

function show_alert() {
	/*$.ajaxSetup({ mimeType: "application/json" });
	$.getJSON('http://spreadsheets.google.com/feeds/list/0AqMRoZWv5mnwdGFVNWNwVnhoRnlSS3gxQWhJM2ZqZkE/od6/public/basic?alt=json-in-script\&callback=callback', function callback(data) {
		alert(data);
		var alert_dismissed = $.cookie('alert_dismissed');
		if(alert_dismissed == undefined) {
			alert_dismissed = 0;
		}
		var alert_array = data.feed.entry[0].content.$t.split(', ');
		var background = alert_array[0].replace('background: ', '');
		var begindate = new Date(alert_array[1].replace('begindate: ', '')).getTime() / 1000;
		var enddate = (new Date(alert_array[2].replace('enddate: ', '')).getTime() / 1000) + 86399;
		var active = alert_array[3].replace('active: ', '');
		var timenow = Math.round(+new Date()/1000);
		//if(active == 1) {
			//if(timenow >= begindate && timenow <= enddate) {
				if(alert_dismissed != 1) {
/*					if($page == 'home') {
						$('.alert_container').html('<i class="icon-warning-sign"></i><div class="alert"><span>' + data.feed.entry[0].title.$t + '</span></div><i class="icon-remove-sign"></i>').show().animate({'margin-top': '0'}, 700);	
					}
					else {
*/					//var noty = $('.alert_container').noty({type: 'warning', text: '<div class="alert"><i class="icon-warning-sign"></i> <span>' + data.feed.entry[0].title.$t + '</span></div>'});
/*						$('.alert_container').html('<i class="icon-warning-sign"></i><div class="alert"><span>' + data.feed.entry[0].title.$t + '</span></div><i class="icon-remove-sign"></i>').show().css('margin-top', '0');	
					}
					if(background == 'Red') {
						$('.alert_container').css('color', '#C92B35');	
						$('.alert_container').css('border', '1px solid #FF9198');	
						$('.alert_container').css('background', 'rgba(255, 246, 247, 0.95)');	
					}
					else if(background == 'Orange') {
						$('.alert_container').css('color', '#EA6F25');
						$('.alert_container').css('border', '1px solid #FFB284');
						$('.alert_container').css('background', 'rgba(255, 253, 252, 0.95)');
					}
					else if(background == 'Yellow') {
						$('.alert_container').css('color', '#FDBA60');
						$('.alert_container').css('border', '1px solid #ffd249');
						$('.alert_container').css('background', 'rgba(250, 250, 250, 0.95)');
					} */
				//}
			//}
		//}
	//});
}

/*==================================================
=SCROLL TO ANCHOR
==================================================*/
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

/*====================================================================================================
=INITIALIZE
====================================================================================================*/
$(function() {
	
	/*==================================================
	=LOAD
	==================================================*/

	/*========== SET CURRENT ON NAV FOR PAGE PARENT ==========*/
	var $parent = $('body').attr('data-parent');
	var nav_current;
	if($parent == 'agente') {
		nav_current = 0;
	}
	else if($parent == 'telefono') {
		nav_current = 1;
	}
	else if($parent == 'institucion') {
		nav_current = 2;
	}
	else if($parent == 'restaurante') {
		nav_current = 3;
	}
	$('.navigation li').eq(nav_current).addClass('current');
	
	/*========== ON BACK BUTTON ==========*/
	window.onpopstate = function(e) {
		var url = window.location.pathname;
		var url_parts = url.split("/");
		if (url_parts[url_parts.length-1].length==0) {
			var page = url_parts[url_parts.length-2];
		}else{
			var page = url_parts[url_parts.length-1];  
		}
		
		if($.inArray(page, $panels) >= 0) {
			var swipe = $.inArray(page, $panels);
			$('.swipe_panel').removeClass('active_swipe');
			$('.swipe' + swipe).addClass('active_swipe');
			var current_slide = $('.active_swipe').index();
			//$('.swipe_panels').animate({'margin-left': - ((current_slide) * 100) + '%'}, 700, 'easeOutExpo');	
			var bg_width = $('body').width();
			$('.swipe_panels').css('left', - ((current_slide) * bg_width));
			swipe_container_height();	
			$('.navigation li').removeClass('current');
			$('.navigation').find('a[href="/' + page + '"]').parent().addClass('current');
		}
		else if(page == '') {
			$('.navigation li').removeClass('current');
			$('.swipe0').addClass('active_swipe');
			$('.swipe_panels').css('left', 0);
		}
	}
	
	/*========== TIER 1 TILESET ==========*/
	if($.inArray($page, $panels) >= 0) {
		if($.cookie('screenreader') != 1) {
			/*========== SET CURRENT ON NAV FOR TIER 1 TILESET ==========*/
			$('.navigation').find('a[href="/' + $page + '"]').parent().addClass('current');
		
			/*========== SET MARGIN LEFT OF PANEL PARENT ==========*/
			//$('.swipe_panels').css('margin-left', $.inArray($page, $panels) * -100 + '%');
			$('.swipe_panels').css('left', $.inArray($page, $panels) * -bg_width);
			
			/*========== BUILD OTHER PANELS ==========*/
			if($.inArray($page, $panels) == 0) {
				$('.swipe_panels').append('<div class="swipe1 swipe_panel" data-url="agente" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe2 swipe_panel" data-url="telefono" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe3 swipe_panel" data-url="institucion" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe4 swipe_panel" data-url="restaurante" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe5 swipe_panel" data-url="movilidad" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe6 swipe_panel" data-url="entretenimiento" style="display: none;"></div>');
			}
			else if($.inArray($page, $panels) == 1) {
				$('.swipe_panels').prepend('<div class="swipe0 swipe_panel" data-url="home" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe2 swipe_panel" data-url="telefono" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe3 swipe_panel" data-url="institucion" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe4 swipe_panel" data-url="restaurante" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe5 swipe_panel" data-url="movilidad" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe6 swipe_panel" data-url="entretenimiento" style="display: none;"></div>');
			}
			else if($.inArray($page, $panels) == 2) {
				$('.swipe_panels').prepend('<div class="swipe1 swipe_panel" data-url="agente" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe0 swipe_panel" data-url="home" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe3 swipe_panel" data-url="institucion" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe4 swipe_panel" data-url="restaurante" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe5 swipe_panel" data-url="movilidad" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe6 swipe_panel" data-url="entretenimiento" style="display: none;"></div>');
			}
			else if($.inArray($page, $panels) == 3) {
				$('.swipe_panels').prepend('<div class="swipe2 swipe_panel" data-url="telefono" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe1 swipe_panel" data-url="agente" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe0 swipe_panel" data-url="home" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe4 swipe_panel" data-url="restaurante" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe5 swipe_panel" data-url="movilidad" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe6 swipe_panel" data-url="entretenimiento" style="display: none;"></div>');
			}
			else if($.inArray($page, $panels) == 4) {
				$('.swipe_panels').prepend('<div class="swipe3 swipe_panel" data-url="institucion" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe2 swipe_panel" data-url="telefono" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe1 swipe_panel" data-url="agente" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe0 swipe_panel" data-url="home" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe5 swipe_panel" data-url="movilidad" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe6 swipe_panel" data-url="entretenimiento" style="display: none;"></div>');
			}
			else if($.inArray($page, $panels) == 5) {
				$('.swipe_panels').prepend('<div class="swipe4 swipe_panel" data-url="restaurante" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe3 swipe_panel" data-url="institucion" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe2 swipe_panel" data-url="telefono" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe1 swipe_panel" data-url="agente" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe0 swipe_panel" data-url="home" style="display: none;"></div>');
				$('.swipe_panels').append('<div class="swipe6 swipe_panel" data-url="entretenimiento" style="display: none;"></div>');
			}
			else if($.inArray($page, $panels) == 6) {
				$('.swipe_panels').prepend('<div class="swipe5 swipe_panel" data-url="movilidad" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe4 swipe_panel" data-url="restaurante" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe3 swipe_panel" data-url="institucion" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe2 swipe_panel" data-url="telefono" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe1 swipe_panel" data-url="agente" style="display: none;"></div>');
				$('.swipe_panels').prepend('<div class="swipe0 swipe_panel" data-url="home" style="display: none;"></div>');
			}
			
			/*========== LOAD CONTENT IN OTHER PANELS VIA AJAX ==========*/
			$($panels).each(function(index, value) {
				var ajax_url;
				//alert(value);
				if($page != value) {
					if(index == 0) {
						ajax_url = '/ .swipe' + index + ' > *';
					}
					else {
						ajax_url = '/' + value + '/ .swipe' + index + ' > *';
					}
					$('.swipe' + index).load(ajax_url, function() {
						if(index == 0) {
							animate_home();
							popular_services_tile();
							weather_icon();
							$('.number_commas').digits();
							$('.welcome_message').show();
							$('.weather_panel:first').show();
							$('.home_search_button').outerHeight($('#q').outerHeight());
						}
						else if(index == 4) {
							weather_icon();
						}
						else if(index == 5) {
							$('.myhawaii_login .left, .myhawaii_login .right').show();
						}
					});	
				}
			}).promise().done(function() {
				$('.swipe_panel').show();
				
				var bg_width = $('body').width();
				$('.swipe_panels').css('left', $('.active_swipe').index() * -bg_width);
			});
		}
	}
	
	/*========== BUILD SWIPE BUTTONS ==========*/
	if($.inArray($page, $panels) >= 0) {
		if($.cookie('screenreader') != 1) {
			$('body').append('<div id="swipe_left" class="swipe_button swipe_left"><i class="icon-chevron-left icon-large"></i></div>');
			$('body').append('<div id="swipe_right" class="swipe_button swipe_right"><i class="icon-chevron-right icon-large"></i></div>');
		}
	}
	
	/*========== BACK BUTTON FOR TIER 2 LINKS ==========*/
	//$('.tier2').find('h2').prepend('<a href="/' + $prev_url + '/"><i class="icon-circle-arrow-left"></i></a> ');
	
	/*========== SET BACKGROUND ==========*/
	var get_hour = new Date();
	var bg_hour = get_hour.getHours();
	if(bg_hour < 6) {
		$('body').attr('data-bg', $('body').attr('data-site-url') + '/public/assets/images/backgrounds/background-0.jpg');
		$('html').addClass('night');
	}
	else if(bg_hour >= 6 && bg_hour < 18) {
		$('body').attr('data-bg', $('body').attr('data-site-url') + '/public/assets/images/backgrounds/background-1.jpg');
		$('html').addClass('day');
	}
	else {
		$('body').attr('data-bg', $('body').attr('data-site-url') + '/public/assets/images/backgrounds/background-0.jpg');
		$('html').addClass('night');
	}
	if(bg_width >= 768) {
		$('body').css('background-image', 'url(' + $('body').attr('data-bg') + ')');
	}
	
	/*========== BG OVERRIDE ==========*/
	if($mode == 'day') {
		$('body').css('background-image', 'url(' + $('body').attr('data-site-url') + '/public/assets/images/backgrounds/background-1.jpg)');
		$('body').addClass('day');
	}
	else if($mode == 'night') {
		$('body').css('background-image', 'url(' + $('body').attr('data-site-url') + '/public/assets/images/backgrounds/background-0.jpg)');
		$('body').addClass('night');
	}
	
	/*========== CHANGE COLOR DEPENDING ON BG ==========*/
	/*
function change_color_on_bg() {
		$('.navigation li a').addClass('light-bg-link');
		$('.header .site_title h1 a ').addClass('light-bg');
		$('.header .site_title span').addClass('light-bg');
		$('.welcome_message').addClass('light-bg');
		$('.weather_panel').addClass('light-bg');
		$('.swipe_panel h2').addClass('light-bg');
		$('.tier2 h2 i').addClass('light-bg');
	}
*/
	
	/*========== HOME WELCOME FADE ==========*/
	var welcome_interval = 1;
	setInterval(function() {
		if(welcome_interval == 1){
			$('.welcome_message').stop().fadeOut(400, function() {
				$(this).html('Bienvenido!');
				$(this).fadeIn(400);
			});
			welcome_interval = 2;
		}
		else{
			$('.welcome_message').stop().fadeOut(400, function() {
				$(this).html('Bienvenido!');
				$(this).fadeIn(400);
			});
			welcome_interval = 1;
		}
	}, 4000);
	
	/*========== POPULAR SERVICES SLIDE ==========*/
	var popular_services_interval = 0
	setInterval(function() {
		$('#popular_services_panels').animate({'margin-left': (popular_services_interval + 1) * -100 + '%'}, 500, 'easeInOutExpo', function() {
			$('.home_popular_services').parent('a').attr('href', '/home/popular_services/' + $('.popular_services_panel').eq(popular_services_interval + 1).attr('data-url'));
			popular_services_interval++;
			if(popular_services_interval == $('.popular_services_panel').size() - 1) {
				popular_services_interval = 0;
				$('#popular_services_panels').css('margin-left', 0);
			}
		});
	}, 4000);	
	/*========== HOME WEATHER FADE ==========*/
	var weather_interval = 0
	setInterval(function() {
		$('.weather_panel').eq(weather_interval).fadeOut(1000);
		if(weather_interval == $('.weather_panel').length - 1) {
			weather_interval = 0;
		}
		else {
			weather_interval++;
		}
		$('.weather_panel').eq(weather_interval).fadeIn(1000);	
	}, 4000);
	
	/*========== VISITOR WEATHER FADE ==========*/
	var v_weather_interval = 0
	setInterval(function() {
		$('.visitor_weather_panel').eq(v_weather_interval).fadeOut(1000);
		if(v_weather_interval == $('.visitor_weather_panel').length - 1) {
			v_weather_interval = 0;
		}
		else {
			v_weather_interval++;
		}
		$('.visitor_weather_panel').eq(v_weather_interval).fadeIn(1000);	
	}, 4000);
	
	/*========== ALIGN FOOTER BUBBLE ==========*/
	$('.footer_bubble').each(function() {
		var target_button = '#' + $(this).attr('id') + '_button';
		if(bg_width >= 768) {
			$(this).css('left', $(target_button).offset().left - 170 + $(target_button).outerWidth() / 2);	
		}
	});
	
	/*========== FOOTER TILE INTO LINKS ==========*/
	if(bg_width < 768) {
		$('.expanded_footer_title').each(function() {
			var url = $(this).attr('data-url');
			$(this).wrap('<a href="' + url + '" />')
		})
	}
	
	/*========== GET TIME AND CHANGE ON HOVER ==========*/
	function get_hawaii_time() {
		var d = new Date();
		var localTime = d.getTime();
		var localOffset = d.getTimezoneOffset() * 60000;
		var utc = localTime + localOffset;
		var offset = -10; 
		var hawaii = utc + (3600000*offset);
		var nd = new Date(hawaii);
		var hour = nd.getHours();
		if(hour > 12) {
			hour = hour - 12;
		}
		if(hour == 0) {
			hour = 12;
		}
		var minutes = nd.getMinutes();
		if (minutes < 10){
			minutes = "0" + minutes
		}
		
		var date = nd.getDate();
		
		$('#hawaii_time .h_time').html(hour + ':' + minutes + ' ');
		if(nd.getHours() > 11){
			$('#hawaii_time .h_time').append('PM');
		} else {
			$('#hawaii_time .h_time').append('AM');
		}
		
		var monthNames = [ 
			"January", 
			"February", 
			"March", 
			"April", 
			"May", 
			"June",
			"July", 
			"August", 
			"September", 
			"October", 
			"November", 
			"December" 
		];
		//var month = monthNames[nd.getMonth()];
		//var day = nd.getDate();
		//$('.footer_time').append(month + " " + day);
		
		$('#hawaii_time .h_location').html('Hawai&#699;i Time');
		
		$('#hawaii_time .h_date').html(date);
	}
	
	function get_local_time() {
		var local_time = new Date();
		var hour = local_time.getHours();
		if(hour > 12) {
			hour = hour - 12;
		}
		if(hour == 0) {
			hour = 12;
		}
		var minutes = local_time.getMinutes();
		if (minutes < 10){
			minutes = "0" + minutes
		}
		
		var date = local_time.getDate();
		
		$('#hawaii_time .h_time').html(hour + ':' + minutes + ' ');
		if(local_time.getHours() > 11){
			$('#hawaii_time .h_time').append('PM');
		} else {
			$('#hawaii_time .h_time').append('AM');
		}
		
		var monthNames = [ 
			"January", 
			"February", 
			"March", 
			"April", 
			"May", 
			"June",
			"July", 
			"August", 
			"September", 
			"October", 
			"November", 
			"December" 
		];
		//var month = monthNames[local_time.getMonth()];
		//var day = local_time.getDate();
		//$('.footer_time').append(month + " " + day);
		
		$('#hawaii_time .h_location').html('Hora local');
		
		$('#hawaii_time .h_date').html(date);
	}
	
	get_local_time();
	
	setInterval(function() {
		get_local_time();
	}, 15000)
	
	$('#hawaii_time').hover(function() {
		get_local_time()
	}, function() {
		get_local_time()
	});
	
	/*========== BREADCRUMB (HUNA_PALAOA) ==========*/
	if($url_parts[1] != 'page' && $url_parts[1] != 'home') {
		$('.huna_palaoa').append('<a href="/">Home</a>');
		if($url_parts[1].length > 0) {
			$('.huna_palaoa').append(' <i class="icon-double-angle-right"></i> <a href="/' + $url_parts[1] + '">' + uppercase($url_parts[1].replace(/\-/g, ' ')) + '</a>');
		}
		if($url_parts[2] && $url_parts[2] != $page) {
			$('.huna_palaoa').append(' <i class="icon-double-angle-right"></i>  <a href="/' + $url_parts[1] + '/' + $url_parts[2] + '">' + uppercase($url_parts[2].replace(/\-/g, ' ')) + '</a>');
		}
		if($url_parts[3] && $url_parts[3] != $page) {
			$('.huna_palaoa').append(' <i class="icon-double-angle-right"></i>  <a href="/' + $url_parts[1] + '/' + $url_parts[2] + '/' + $url_parts[3] + '">' + uppercase($url_parts[3].replace(/\-/g, ' ')) + '</a>');
		}
		$('.huna_palaoa').append(' <i class="icon-double-angle-right"></i> ' + $('#static_title').attr('data-page_title'));
	}
	else if($url_parts[1] == 'home' || $url_parts[1] == 'page') {
		$('.huna_palaoa').append('<a href="/">Home</a>');
		$('.huna_palaoa').append(' <i class="icon-double-angle-right"></i> ' + $('#static_title').attr('data-page_title'));
	}

    /*========== HOW DO I ==========*/
	$('body').on('click', '.how_button', function(event){
		var how_section = $(this).attr('href');
		$('.how_section').hide();
		$('.to_top').hide();
		$(how_section).show();
		return false;
	});
	$('body').on('click', '.how_show_all_button', function(event){
		var how_section = $(this).attr('href');
		$('.to_top').show();
		$('.how_section').show();
		return false;
	});
	
	show_alert();
	swipe_button();
	if($page == 'home') {
		animate_home();
		popular_services_tile();		
	}
	/*if($page == 'myhawaii' && $myhawaii_accessed == 0) {
		myhawaii_login();
		$myhawaii_accessed = 1;
	}*/
	weather_icon();
	swipe_container_height();
	change_font_size();
	text_only();
	responsive_tables();
	weather_tiles();
	
	$('.welcome_message').delay(1500).fadeIn(1000);
	$('.weather_panel:first').delay(1500).fadeIn(1000);
	$('.number_commas').digits();
	$("a[href^='http://']").attr("target","_blank");
	$("a[href^='https://']").attr("target","_blank");
	
	$('.home_search_button').outerHeight($('#q').outerHeight());
	$('.header_search_button').outerHeight($('#hq').outerHeight());
	$('.search_search_button').outerHeight($('#q').outerHeight());
	
	if(is_ios()) {
		$('.swipe_panels').css('-webkit-transform','translate3d(0, 0, 0)');
	}
	
	var time_mode = $.cookie('time_mode');
	if(time_mode == 'day') {
		if(bg_width >= 768) {
			$('body').css('background-image', 'url(' + $('body').attr('data-site-url') + '/assets/images/backgrounds/background-1.jpg)');
		}
		$('html').removeClass('night').addClass('day');
	}
	if(time_mode == 'night') {
		if(bg_width >= 768) {
			$('body').css('background-image', 'url(' + $('body').attr('data-site-url') + '/assets/images/backgrounds/background-0.jpg)');
		}
		$('html').removeClass('day').addClass('night');
	}
	
	if($page == 'search') {
		$('.header_search').find('input[type="search"]').removeClass('usagov-search-autocomplete ui-autocomplete-input');
		$('.search_search').find('input[type="search"]').addClass('usagov-search-autocomplete ui-autocomplete-input');
	}
	
	/*==================================================
	=CLICK
	==================================================*/
	
	/*========== NAVIGATION CLICK ==========*/
	$('.navigation').find('a').click(function() {

		if($.inArray($page, $panels) >= 0) {
			if($.cookie('screenreader') != 1) {
				if(!$(this).parent().hasClass('current')) {
					var current_slide = $('.active_swipe').index();
					//alert(current_slide);
					if($.inArray($page, $panels) >= 0) {

						var slide_name = $(this).attr('href').replace('/', '');
						var slide_title = capitaliseFirstLetter($(this).attr('href').replace('/', ''));
						//alert(slide_title);
						$('.swipe_panel').each(function() {
							//alert($(this).attr('data-url')+'bb');
							if($(this).attr('data-url') == slide_name) {
								var go_to_slide = $(this).index();
								/*if((parseInt($('.swipe_panel').eq(go_to_slide).outerHeight()) + parseInt($('.header').outerHeight()) + parseInt($('.header').css('margin-bottom')) + parseInt($('.swipe_container').css('margin-bottom').replace('px', ''))) > $(window).height() && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
									$('.swipe_panels').stop().animate({'left': go_to_slide * (-bg_width + 15)}, 700, 'easeOutExpo');
								}
								else {
									$('.swipe_panels').stop().animate({'left': go_to_slide * -bg_width}, 700, 'easeOutExpo');
								}*/
								$('.swipe_panels').stop().animate({'left': go_to_slide * -bg_width}, 700, 'easeOutExpo', function() {
									var window_width = $('body').width();
									$('.swipe_panels').css('left', $('.active_swipe').index() * -window_width);
								});
								//$('.swipe_panels').stop().animate({'left': go_to_slide * -bg_width}, 700, 'easeOutExpo');
								$('.swipe_panel').removeClass('active_swipe');
								$(this).addClass('active_swipe');
							}
						});
						$('body').removeAttr('class').addClass('page-' + slide_name);
						
						/*if(slide_name == 'myhawaii' && $myhawaii_accessed == 0) {
							myhawaii_login();
							$myhawaii_accessed = 1;
						}*/
						
						swipe(slide_name,slide_title);
						return false;
					}	
				}
				else {
					return false;
				}
			}
		}
	});
	
	/*========== HOME CLICK ==========*/
	$('.header .site_title').click(function() {
		if($.inArray($page, $panels) >= 0) {
			if($.cookie('screenreader') != 1) {
				$('.swipe_panels').stop().animate({'left': 0}, 700, 'easeOutExpo');
				$('.swipe_panel').removeClass('active_swipe');
				$('.swipe_panel:first').addClass('active_swipe');
				$('.navigation li').removeClass('current');
				history.pushState(null, null, '/');
				document.title = 'ListaPeru.com | Potal donde encontraras de todo';
				//if($('.swipe0 .row > .large-6').css('top') != -150) {
				//	$('.swipe0 .row > .large-6').css('top', -150);
				//}
				$('body').removeAttr('class').addClass('page-official-website-of-the-aloha-state');
				swipe_button();
				swipe_container_height();
				return false;
			}
		}
		else {
			location.href = '/';
		}
	});
	
	/*========== SWIPE BUTTON CLICK ==========*/
	$('.swipe_button').click(function() {
		var current_slide = $('.active_swipe').index();
		var document_width_before = $(document).width();
		if($(this).hasClass('swipe_left')) {
			/*if((parseInt($('.swipe_panel').eq(current_slide - 1).outerHeight()) + parseInt($('.header').outerHeight()) + parseInt($('.header').css('margin-bottom')) + parseInt($('.swipe_container').css('margin-bottom').replace('px', ''))) > $(window).height() && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
				$('.swipe_panels').stop().animate({'left': (current_slide - 1) * (-bg_width + 15)}, 700, 'easeOutExpo');
			}
			else {
				$('.swipe_panels').stop().animate({'left': (current_slide - 1) * -bg_width}, 700, 'easeOutExpo');
			}*/
			$('.swipe_panels').stop().animate({'left': (current_slide - 1) * -bg_width}, 700, 'easeOutExpo', function() {
				var window_width = $('body').width();
				$('.swipe_panels').css('left', $('.active_swipe').index() * -window_width);
			});
			//$('.swipe_panels').stop().animate({'left': (current_slide - 1) * -bg_width}, 700, 'easeOutExpo');
			$('.swipe_panel').removeClass('active_swipe');
			$('.swipe_panel').eq(current_slide - 1).addClass('active_swipe');
		}
		else {
			/*if((parseInt($('.swipe_panel').eq(current_slide + 1).outerHeight()) + parseInt($('.header').outerHeight()) + parseInt($('.header').css('margin-bottom')) + parseInt($('.swipe_container').css('margin-bottom').replace('px', ''))) > $(window).height() && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
				$('.swipe_panels').stop().animate({'left': (current_slide + 1) * (-bg_width + 15)}, 700, 'easeOutExpo');
			}
			else {
				$('.swipe_panels').stop().animate({'left': (current_slide + 1) * -bg_width}, 700, 'easeOutExpo');
			}*/
			$('.swipe_panels').stop().animate({'left': (current_slide + 1) * -bg_width}, 700, 'easeOutExpo', function() {
				var window_width = $('body').width();
				$('.swipe_panels').css('left', $('.active_swipe').index() * -window_width);
			});
			//$('.swipe_panels').stop().animate({'left': (current_slide + 1) * -bg_width}, 700, 'easeOutExpo');
			$('.swipe_panel').removeClass('active_swipe');
			$('.swipe_panel').eq(current_slide + 1).addClass('active_swipe');
		}
		var new_slide = $('.active_swipe').attr('data-url');
		var slide_title = capitaliseFirstLetter($('.active_swipe').attr('data-url'));
		
		/*if(new_slide == 'myhawaii' && $myhawaii_accessed == 0) {
			myhawaii_login();
			$myhawaii_accessed = 1;
		}*/
		
		swipe(new_slide,slide_title);
		if(new_slide == 'home') {
			$('body').removeAttr('class').addClass('page-official-website-of-the-aloha-state');
		}
		else {
			$('body').removeAttr('class').addClass('page-' + new_slide);
		}
	});
	
	/*========== FOOTER BUBBLE ==========*/
	$('.footer_bubble_button').click(function() {
		var button = $(this);
		var target_bubble = $(this).attr('href');
		if($(this).hasClass('toggled')) {
			$(target_bubble).fadeOut();
			$(this).removeClass('toggled');
			$('.bubble_bg').fadeOut();
		}
		else {
			if($('.footer_bubble_button').hasClass('toggled')) {
				$('.footer_bubble').not(target_bubble).fadeOut(function() {
					$(target_bubble).fadeIn();
					$('.footer_bubble_button').not(button).removeClass('toggled');
				});
			}
			else {
				$(target_bubble).fadeIn()
				$('.bubble_bg').fadeIn();
			}
			$(this).addClass('toggled');
		}
		return false;
	});
	
	$('html').on('click', '.bubble_bg', function(event){
		$('.footer_bubble').fadeOut(400);
		$('.footer_bubble_button').removeClass('toggled');
		$('.bubble_bg').fadeOut();
	});
	
	$('.time_mode').click(function() {
		$('.footer_bubble').fadeOut(400);
		$('.footer_bubble_button').removeClass('toggled');
		$('.bubble_bg').fadeOut();
	});
	
	/*========== CLOSE ALERT BOX ==========*/
/*	$('.alert_container').on('click', '.icon-remove-sign', function(event){
		$('.alert_container').animate({'margin-top': '-3em'}, 700, function() {
			$(this).hide();
		});
		$.cookie('alert_dismissed', 1, { expires: 1, path: '/' });
	});
*/	
	/*========== SUBMIT SEARCH ==========*/
	$('.home_search_button').click(function() {
		$('#home_search_form').find('input[type="search"]').val($.trim($('#home_search_form').find('input[type="search"]').val()));
		$('#home_search_form').submit();
		return false;
	});
	$('.header_search_button').click(function() {
		$('#header_search_form').find('input[type="search"]').val($.trim($('#header_search_form').find('input[type="search"]').val()));
		$('#header_search_form').submit();
		return false;
	});
	$('.search_search_button').click(function() {
		$('#search_search_form').find('input[type="search"]').val($.trim($('#search_search_form').find('input[type="search"]').val()));
		$('#search_search_form').submit();
		return false;
	});
	
	$('#home_search_form').submit(function(){
		$('#home_search_form').find('input[type="search"]').val($.trim($('#home_search_form').find('input[type="search"]').val()));
	});
	$('#header_search_form').submit(function(){
		$('#header_search_form').find('input[type="search"]').val($.trim($('#header_search_form').find('input[type="search"]').val()));
	});
	$('#search_search_form').submit(function(){
		$('#search_search_form').find('input[type="search"]').val($.trim($('#search_search_form').find('input[type="search"]').val()));
	});
	
	/*========== INSTANT SEARCH ==========*/
	/*
$(function() {
		$('.home_search #q').keyup(function() {
			var search = $(this).val();
			$('.home_tiles').hide();
			$('.home_search_results').html('');
			$.getJSON('http://search.usa.gov/api/search.json?affiliate=hawaiistateportal\&api_key=9c35aba8fe8af666dc5ddfb27d7e1365&hl=false\&index=web\&query=' + search + '\&page=0\&callback=?', function(data) {
				if(data.boosted_results) {
					$('.home_search_results').append('<div class="recommended_services row"><h2>Recommended Services</h2></div>');
					
					$.each(data.boosted_results, function(key, val) {
						$('.recommended_services').append('<div class="recommended_search_result large-6 columns"><h3><a href="' + val.url + '">' + val.title + '</a></h3><a href="' + val.url + '" class="summary_url">' + val.url + '</a><p>' + val.description + '</p></div>');
					});
				}
				
				$.each(data.results, function(key, val) {
					$('.home_search_results').append('<div class="search_result"><h3><a href="' + val.unescapedUrl + '">' + val.title + '</a></h3><a href="' + val.unescapedUrl + '" class="summary_url">' + val.unescapedUrl + '</a><p>' + val.content + '</p></div>');
				});
				if(parseInt(data.startrecord) != 1 && parseInt(data.endrecord) <= parseInt(data.total)) {
					$('.home_search_results').append('<a href="?q=' + search + '&page=' + (parseInt(pagenum) - 1) + '" class="site_button"><i class="icon-double-angle-left"></i> Prev Results</a>');
				}
				if(parseInt(data.endrecord) < parseInt(data.total)) {
					$('.home_search_results').append('<a href="?q=' + search + '&page=' + (parseInt(pagenum) + 1) + '" class="site_button">Next Results <i class="icon-double-angle-right"></i></a>');
				}
				if(parseInt(data.total) == 0) {
					$('.home_search_results').append('<p>Sorry, no results for "' + search + '" found.</p>');
				}
				else {
					$('.home_search_results').append('<span class="search_summary">Results ' + data.startrecord + ' to ' + data.endrecord + ' of ' + data.total + '</span>');
				}
			});
		});
	})
*/
	
	/*========== MOBILE NAVIGATION ==========*/
	$('.mobile_nav').click(function() {
		if($(this).hasClass('toggled')) {
			$('.navigation').slideUp();
		}
		else {
			$('.navigation').slideDown();
		}
		$(this).toggleClass('toggled');
		return false;
	});
	
	/*========== HIDE MOBILE NAV ON CLICK ==========*/
	if(bg_width < 768) {
		$('.navigation li a').click(function() {
			$('.navigation').slideUp();
			$('.mobile_nav').toggleClass('toggled');
		})
	}
	
	/*========== MOBILE SEARCH ==========*/
	$('.mobile_search').click(function() {
		if($(this).hasClass('toggled')) {
			$('.header_search').hide();
		}
		else {
			$('.header_search').show();
		}
		$(this).toggleClass('toggled');
		return false;
	});
	
	/*========== TEXT RESIZER ==========*/
	$('.text_resize').click(function() {
		var cookie_size = $.cookie('text_size');
		if(cookie_size == undefined) {
			cookie_size = 0;
		}
		var current_font_size = $('body').css('font-size').replace('px', '');
		var size_minus = parseInt(current_font_size) - 2;
		var size_plus = parseInt(current_font_size) + 2;
		if($(this).hasClass('text_smaller')) {
			if(cookie_size > -2) {
				$('.text_resize').removeAttr('style');
				if(cookie_size == -1) {
					$(this).css('background', '#999');
				}
				$('.home_search_container .home_search').css('top', size_minus + 1 + 'em')
				$('body').css('font-size', size_minus);
				$.cookie('text_size', parseInt(cookie_size) - 1, { expires: 30, path: '/' });
			}
		}
		else if($(this).hasClass('text_larger')) {
			if(cookie_size < 2) {
				$('.text_resize').removeAttr('style');
				if(cookie_size == 1) {
					$(this).css('background', '#999');
				}
				$('body').css('font-size', size_plus);
				$.cookie('text_size', parseInt(cookie_size) + 1, { expires: 30, path: '/' });
			}
		}
		else if($(this).hasClass('text_reset')) {
			$('.text_resize').removeAttr('style');
			$('body').css('font-size', '');
			$.removeCookie('text_size', { path: '/' });
		}
		return false;
	});
	
	var cookie_size = $.cookie('text_size');
	if(cookie_size == 2) {
		$('.text_larger').css('background', '#999');
	}
	else if(cookie_size == -2) {
		$('.text_smaller').css('background', '#999');
	}
	
	/*========== DAY/NIGHT MODE ==========*/
	$('.time_mode').click(function() {
		if($(this).hasClass('day_mode')) {
			$('body').css('background-image', 'url(' + $('body').attr('data-site-url') + '/assets/images/backgrounds/background-1.jpg)');
			$('html').removeClass('night').addClass('day');
			var tm_date = new Date();
			var tm_minutes = 30;
			tm_date.setTime(tm_date.getTime() + (tm_minutes * 60 * 1000));
			$.cookie('time_mode', 'day', { expires: tm_date, path: '/' });
		}
		else if($(this).hasClass('night_mode')) {
			$('body').css('background-image', 'url(' + $('body').attr('data-site-url') + '/assets/images/backgrounds/background-0.jpg)');
			$('html').removeClass('day').addClass('night');
			var tm_date = new Date();
			var tm_minutes = 30;
			tm_date.setTime(tm_date.getTime() + (tm_minutes * 60 * 1000));
			$.cookie('time_mode', 'night', { expires: tm_date, path: '/' });
		}
		else if($(this).hasClass('reset_time_mode')) {
			$.removeCookie('time_mode', { path: '/' });
			window.location = document.URL;
		}
		return false;
	});
	
	/*========== TEXT ONLY MODE ==========*/
	$('.text_only').click(function() {
		$.cookie('text_only', 1, { expires: 30, path: '/' });
		$('html').addClass('text-only');
		return false;
	})
	
	/*========== NORMAL MODE ==========*/
	$('.normal_text').click(function() {
		$.removeCookie('text_only', { path: '/' });
		window.location = document.URL;
		return false;
	});
	
	/*========== FOOTER EXPAND ==========*/
	$('#footer_more').click(function() {
		if($(this).hasClass('toggled')) {
			$('.footer').animate({'bottom': 0, 'avoidTransforms': true}, 400);
			$('#footer_more i').removeClass('icon-minus');
			$('#footer_more span').html('More');
		}
		else {
			$('.footer').animate({'bottom': $('.expanded_footer').outerHeight(), 'avoidTransforms': true}, 400);
			$('#footer_more i').addClass('icon-minus');
			$('#footer_more span').html('Less');
		}
		$(this).toggleClass('toggled');
		return false;
	});
	
	/*========== MODAL CLICK ==========*/
	$('body').on('click', '.modal', function(event){
		if($.cookie('screenreader') != 1) {
			open_modal($(this).attr('href'));
			return false;
		}
	});
	
	/*========== SERVICE BUTTONS ==========*/
	$('body').on('click', '.services_button', function(event){
		$('.service_subsection').show();
		$('.service_subsection p').show();
		$('#filter_services').val('');
		var services_section = $(this).attr('href');
		$('.services_section').hide();
		$(services_section).show();
		return false;
	});
	
	/*========== SCROLL TO TOP ==========*/
	$('.to_top').click(function() {
		scrollToAnchor('top');
		return false;
	});
	
	/*==================================================
	=KEYBOARD
	==================================================*/
	
	/*
	$("body").keydown(function(e) {
		var current_slide = $('.active_swipe').index();
		if($.inArray($page, $panels) >= 0) {
			if(e.keyCode == 39) {
				if($('.active_swipe').index() != $panels.length - 1) {
					$('.swipe_panels').stop().animate({'left': - ((current_slide + 1) * bg_width)}, 700, 'easeOutExpo');
					$('.swipe_panel').removeClass('active_swipe');
					$('.swipe_panel').eq(current_slide + 1).addClass('active_swipe');
				}
			}
			else if(e.keyCode == 37) { 
				if($('.active_swipe').index() != 0) {
					$('.swipe_panels').stop().animate({'left': - ((current_slide - 1) * bg_width)}, 700, 'easeOutExpo');
					$('.swipe_panel').removeClass('active_swipe');
					$('.swipe_panel').eq(current_slide - 1).addClass('active_swipe');
				}
			}
			var new_slide = $('.active_swipe').attr('data-url');
			var slide_title = capitaliseFirstLetter($('.active_swipe').attr('data-url'));
			swipe(new_slide,slide_title);
			if(new_slide == 'home') {
				$('body').removeAttr('class').addClass('page-official-website-of-the-aloha-state');
			}
			else {
				$('body').removeAttr('class').addClass('page-' + new_slide);
			}
		}
	});
	*/
	
	/*==================================================
	=GESTURES
	==================================================*/
	
	$('.swipe_panels').swipe({
		swipeStatus:function(event, phase, direction, distance, duration, fingers) {
			var current_slide = $('.active_swipe').index();
			if($('body').width() >= 768) {
				/*
if(direction == 'left') {
					if($('.active_swipe').index() != $panels.length - 1) {
						$('.swipe_panels').removeClass('swipe_animations').css('left', -(current_slide * bg_width) - distance);
					}
				}
				else if(direction == 'right') {
					if($('.active_swipe').index() != 0) {
						$('.swipe_panels').removeClass('swipe_animations').css('left', -(current_slide * bg_width) + distance);
					}
				}
*/
				if(direction == 'left') {
					if($('.active_swipe').index() != $panels.length - 1) {
						$('.swipe_panels').css('-webkit-transform','translate3d('+ (-distance) +'px, 0, 0)');
					}
				}
				else if(direction == 'right') {
					if($('.active_swipe').index() != 0) {
						$('.swipe_panels').css('-webkit-transform','translate3d('+ distance +'px, 0, 0)');
					}
				}
			}
			if(phase == "cancel" || phase == "end") {
				$('.swipe_panels').addClass('swipe_animations');
				if(direction == 'left') {
					if($('.active_swipe').index() != $panels.length - 1) {
						if(distance > bg_width / 4 || (distance >= 50 && duration >= 50)) {
							if($('body').width() >= 768) {
								$('.swipe_panels').css('-webkit-transform','translate3d(0, 0, 0)');
							}
							$('.swipe_panels').css('left', - ((current_slide) * bg_width) - distance).animate({'left': - ((current_slide + 1) * bg_width)}, 500, 'easeInOutQuint', function() {
								$('.swipe_panel').removeClass('active_swipe');
								$('.swipe_panel').eq(current_slide + 1).addClass('active_swipe');
								var new_slide = $('.active_swipe').attr('data-url');
								var slide_title = capitaliseFirstLetter($('.active_swipe').attr('data-url'));
								//alert(slide_title);
								$('.navigation li').removeClass('current');
								$('.navigation').find('a[href="/' + new_slide + '"]').parent().addClass('current');
								if(new_slide == 'home') {
									history.pushState(null, null, '/');	
									document.title = 'ListaPeru.com | Home';
								} else{
									history.pushState(null, null, '/' + new_slide + '/');
									//alert(slide_title);
									document.title = 'ListaPeru.com | ' + slide_title;	
								}
								swipe_button();
								swipe_container_height();
								if(new_slide == 'home') {
									$('body').removeAttr('class').addClass('page-official-website-of-the-aloha-state');
								}
								else {
									$('body').removeAttr('class').addClass('page-' + new_slide);
								}
							});
						}
						else {
							$('.swipe_panels').css('-webkit-transform','translate3d(0, 0, 0)');
							$('.swipe_panels').stop().animate({'left': - ((current_slide) * bg_width)}, 500, 'easeInOutQuint');
						}
					}
				}
				else if(direction == 'right') {
					if($('.active_swipe').index() != 0) {
						if(distance > bg_width / 4 || (distance >= 50 && duration >= 50)) {
							if($('body').width() >= 768) {
								$('.swipe_panels').css('-webkit-transform','translate3d(0, 0, 0)');
							}
							$('.swipe_panels').css('left', - ((current_slide) * bg_width) + distance).animate({'left': - ((current_slide - 1) * bg_width)}, 500, 'easeInOutQuint', function() {
								$('.swipe_panel').removeClass('active_swipe');
								$('.swipe_panel').eq(current_slide - 1).addClass('active_swipe');
								var new_slide = $('.active_swipe').attr('data-url');
								var slide_title = capitaliseFirstLetter($('.active_swipe').attr('data-url'));

								$('.navigation li').removeClass('current');
								$('.navigation').find('a[href="/' + new_slide + '"]').parent().addClass('current');
								if(new_slide == 'home') {
									history.pushState(null, null, '/');	
									document.title = 'ListaPeru.com | Home';
								}
								else {
									history.pushState(null, null, '/' + new_slide + '/');
									//alert(slide_title);
									document.title = 'ListaPeru.com | ' + slide_title;	
								}
								swipe_button();
								swipe_container_height();
								if(new_slide == 'home') {
									$('body').removeAttr('class').addClass('page-official-website-of-the-aloha-state');
								}
								else {
									$('body').removeAttr('class').addClass('page-' + new_slide);
								}
							});
						}
						else {
							$('.swipe_panels').css('-webkit-transform','translate3d(0, 0, 0)');
							$('.swipe_panels').stop().animate({'left': - ((current_slide) * bg_width)}, 500, 'easeInOutQuint');
						}
					}
				}
			}
		},
		tap: function(event, target) {
			if($(target).parents('.modal').length == 1 || $(target).hasClass('modal')) {
				if($.cookie('screenreader') != 1) {
					open_modal($(target).closest('a').attr('href'));
					return false;
				}
			}
			else if($(target).parents('.tile').length == 1) {
				document.location.href = $(target).closest('a').attr('href');
			}
			else if($(target).parents('.row-bar').length == 1) {
				document.location.href = $(target).closest('a').attr('href');
			}
			else if($(target).parents('.myhi_account_bar').length == 1) {
				document.location.href = $(target).closest('a').attr('href');
			}
			else if($(target).parents('.myhawaii_tile').length == 1) {
				if($(target).is('span')) {
					var tile_id = $(target).parents('.myhawaii_modal').attr('id').replace('#','');
				}
				else {
					var tile_id = $(this).attr('id').replace('#','');
				}
				myhawaii_modal(tile_id);
				return false;
			}
		},
		allowPageScroll: 'vertical',
		excludedElements: 'button, input, select, textarea, .noSwipe, .touch_button',
		fallbackToMouseEvents: false
	});
});

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert($.easing.default);
        return $.easing[$.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});
