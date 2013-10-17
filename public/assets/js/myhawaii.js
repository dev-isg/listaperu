//****************************************************************************************************
// =SOME CONFIGURING
//****************************************************************************************************

// declare myhawaii variables
var AuthHandler;
var authUrl = 'https://' + location.host + '/myhi';
var lalaUrl = 'https://login.ehawaii.gov/lala';
var originUrl = 'https://' + location.host + '/myhawaii';

//****************************************************************************************************
// =FEED FUNCTIONS
//****************************************************************************************************

/*
structure
var myhawaii = {
	transactions: {
		feed: function() {...},
		modal: function() {...},
		paginate: function () {...}
	}
}
*/

var myhawaii = {
	// *****************************************************************************************************************************
	// kala transactions
	// *****************************************************************************************************************************
	transactions: {
		feed: function(meta_only, day_offset, offset, max, callback) {
			var feedUrl = '/myhi/proxy/feed-1.json?';
			if(meta_only == true) {
				feedUrl += 'meta_only=true&';
			}
			if(day_offset) {
				feedUrl += 'day_offset=' + day_offset + '&';
			}
			if(offset) {
				feedUrl += 'offset=' + offset + '&';
			}
			if(max) {
				feedUrl += 'max=' + max + '&';
			}
			
			feedUrl = feedUrl.substr(0, feedUrl.length-1);
			
			var request = $.ajax({ type: 'POST', url: feedUrl, contentType: "application/json", dataType: 'json'});
			request.done(function(data) {
				callback(data);
			});
			request.fail( function(xhr, stat, message) {
				if(message == 'Authorization Required') {
					window.location = 'https://' + location.host + '/myhawaii/?session=1'
				}
				else {
					error_modal();
				}
			});
		},
		modal: function(data, tile_id) {
			//start html by creating title
			var html = '<h2>My Transactions <i class="icon-question-sign myhi_info"> </i></h2>';
			
			//info text
			html += '<div class="myhi_info_content"><p>This page shows your transaction history for payments made online using your eHawaii.gov account.</p></div>';
		
			//make table
			if(data.meta.count > 0) {
				html += 
						'<div class="modal_table"><table id="transactions_table">' +
							'<thead>' +
								'<tr>' +
									'<th>Date</th>' +
									'<th>Description</th>' +
									'<th>Service</th>' +
									'<th>Amount</th>' +
									'<th>Receipt</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody>';
								//iterate through data and insert into table
								$.each(data.items, function(key, value) {
									html += '<tr><td data-title="Date">' + pretty_date(value.invoiced) + '</td><td data-title="Description">' + value.message + '</td><td data-title="Service">' + data.meta.applications[value.license_id] + '</td><td data-title="Amount">' + value.charged + '</td><td data-title="Receipt"><a href="' + value.receipt_url + '" target="_blank">Receipt</a></td></tr>';
								});
				html += '</tbody></table></div><div id="modal_pagination"></div>';
				
				//insert html in modal
				$('#modal_content').html(html);
				
				//show pagination buttons
				modal_pagination(data.meta.offset, data.meta.max, data.meta.count, tile_id, 'Older', 'Newer');
			}
			//show other content if 0 data
			else {
				$.ajax({
					url:"assets/feeds/services/popular_services.json",
					success: function(result) {
						// get totals
						var total = 0;
						for (x in result.results) {
						     total += result.results[x]['count'];
						}
						
						// get popular services with count and url
						var service1 = new Array(result.results[0]['name'],result.results[0]['count'],result.results[0]['url']);
						var service2 = new Array(result.results[1]['name'],result.results[1]['count'],result.results[1]['url']);
						var service3 = new Array(result.results[2]['name'],result.results[2]['count'],result.results[2]['url']);
						
						//get random 3 services
						var random_service_nums = random_number(3,result.results.length);
						var random_services = new Array;
						for (var i=0; i < random_service_nums.length ;i++) {
							random_services.push(result.results[random_service_nums[i]])
						}
						
						html += 
						'<div id="transactions_no_content">' +
							'<div class="large-8 columns left">' +
								'<h3>You have <span>0</span> transactions with this account.</h3>' +
								'<br />' +
								'<span class="others"><span>What others are doing...</span></span>' + 
								'<br />' +
								'<div class="total_transactions"><span>' + numberWithCommas(total) + '</span> Total Transactions (this week)</div>' +
								'<br />' +
								'<h3>Top Services</h3>' +
								'<a href="' + service1[2] + '" class="top_service" target="_blank"><span>' + numberWithCommas(service1[1]) + '</span> ' + service1[0] + '</a>' +
								'<a href="' + service2[2] + '" class="top_service" target="_blank"><span>' + numberWithCommas(service2[1]) + '</span> ' + service2[0] + '</a>' +
								'<a href="' + service3[2] + '" class="top_service" target="_blank"><span>' + numberWithCommas(service3[1]) + '</span> ' + service3[0] + '</a>' +
							'</div>' +
							'<div class="large-4 columns right">' +
								'<div>' +
									'<div class="icon"></div>' +
									'<h3>Popular Services</h3>' +
									'<ul>' +
										'<li>' + random_services[0].name + '</li>' +
										'<li>' + random_services[1].name + '</li>' +
										'<li>' + random_services[2].name + '</li>' +
									'</ul>' +
									'<a href="/home/online-services/" class="no_button"><span>All eHawaii.gov Services</span></a>' +
								'</div>' +
							'</div>' +
						'</div>';
						
						//insert html in modal
						$('#modal_content').html(html);
					}
				});
			}
		},
		paginate: function(data, tile_id) {
			//clear table
			$('#transactions_table tbody').html('');
			
			//declare html variable
			var html = '';
			
			//iterate throught data and add table rows
			$.each(data.items, function(key, value) {
				html += '<tr><td data-title="Date">' + pretty_date(value.invoiced) + '</td><td data-title="Description">' + value.message + '</td><td data-title="Service">' + data.meta.applications[value.license_id] + '</td><td data-title="Amount">' + value.charged + '</td><td data-title="Receipt"><a href="' + value.receipt_url + '" target="_blank">Receipt</a></td></tr>';
			});
			
			//replace table entries with new entries
			$('#transactions_table tbody').html(html);
			
			//show pagination buttons
			modal_pagination(data.meta.offset, data.meta.max, data.meta.count, tile_id, 'Older', 'Newer');
		}
	},
	// *****************************************************************************************************************************
	//hbe business filings
	// *****************************************************************************************************************************
	businesses: {
		feed: function(meta_only, offset, max, callback) {
			var feedUrl = '/myhi/proxy/feed-39.json?';
			if(meta_only == true) {
				feedUrl += 'meta_only=true&';
			}
			if(offset) {
				feedUrl += 'offset=' + offset + '&';
			}
			if(max) {
				feedUrl += 'max=' + max + '&';
			}
			
			feedUrl = feedUrl.substr(0, feedUrl.length-1);
			
			var request = $.ajax({ type: 'POST', url: feedUrl, contentType: "application/json", dataType: 'json'});
			request.done(function(data) {
				callback(data);
			});
			request.fail( function(xhr, stat, message) {
				if(message == 'Authorization Required') {
					window.location = 'https://' + location.host + '/myhawaii/?session=1'
				}
				else {
					error_modal();	
				}
			});
		},
		modal: function(data, tile_id) {
			//start html by creating title
			var html = '<h2>My Businesses <i class="icon-question-sign myhi_info"> </i></h2>';
			
			//info text
			html += '<div class="myhi_info_content"><p>This page shows businesses and filings created using <a href="http://hbe.ehawaii.gov/BizEx/myFilings.eb" target="_blank">Hawaii Business Express</a>. Businesses created offline or through other means are not included.</p></div>';
		
			//make table
			if(data.meta.count > 0) {
				html += 
						'<div class="modal_table"><table id="businesses_table">' +
							'<thead>' +
								'<tr>' +
									'<th>Business Name</th>' +
									'<th>Type</th>' +
									'<th>Last Updated</th>' +
									'<th>Status</th>' +
									'<th>Paid On</th>' +
									'<th>Filed On</th>' +
									'<th>File</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody>';
								//iterate through data and insert into table
								$.each(data.items, function(key, value) {
									//check if type = BB1 and state = submitted
									if(value.short_name == 'BB1' && value.state == 'SUBMITTED') {
										var state = 'SUBMITTED1'
									}
									else {
										var state = value.state;
									}
									
									html += '<tr><td data-title="Business Name">' + value.name +'</td><td data-title="Type">' + value.short_name + '</td><td data-title="Last Updated">' + pretty_date(value.last_updated) + '</td><td><span data-tooltip data-width="400" class="has-tip tip-bottom" title="' + pretty_filing_status[state].tooltip + '">' + pretty_filing_status[state].status + ' <i class="icon-info-sign"> </i></span></td><td data-title="Paid On">' + pretty_date(value.paid_on) + '</td><td data-title="Filed On">' + (value.filed_on ? pretty_date(value.filed_on) : '') + '</td><td data-title="File"><a href="' + value.url + '">Download</a></td></tr>';
								});
				html += '</tbody></table></div><div id="modal_pagination"></div>';
				
				//insert html in modal
				$('#modal_content').html(html);
				
				//show pagination buttons
				modal_pagination(data.meta.offset, data.meta.max, data.meta.count, tile_id, 'Older', 'Newer');
			}
			//show other content if 0 data
			else {
				$.ajax({
					url:"/myhi/proxy/feed-43.json",
					success: function(result) {
						
						//sort array
						sort_array(result.items,'qty','DESC', true);
						
						// get popular filings with count and url
						var filings1 = new Array(business_plurals[result.items[0]['id']],result.items[0]['qty'],result.items[0]['url']);
						var filings2 = new Array(business_plurals[result.items[1]['id']],result.items[1]['qty'],result.items[1]['url']);
						var filings3 = new Array(business_plurals[result.items[2]['id']],result.items[2]['qty'],result.items[2]['url']);
						var filings4 = new Array(business_plurals[result.items[3]['id']],result.items[3]['qty'],result.items[3]['url']);
						
						html += 
							'<div id="businesses_no_content">' +
								'<div class="large-8 columns left">' +
									'<h3>You have <span>0</span> Business filings with this account.</h3>' +
									'<br />' +
									'<span class="others"><span>What others are doing...</span></span>' + 
									'<br />' +
									'<a href="' + filings1[2] + '" class="large-6 columns" target="_blank"><div><span>' + numberWithCommas(filings1[1]) + '</span>' + filings1[0] + '<i class="icon-file-alt"> </i></div></a>' +
									'<a href="' + filings2[2] + '" class="large-6 columns" target="_blank"><div><span>' + numberWithCommas(filings2[1]) + '</span>' + filings2[0] + '<i class="icon-file-alt"> </i></div></a>' +
									'<a href="' + filings3[2] + '" class="large-6 columns" target="_blank"><div><span>' + numberWithCommas(filings3[1]) + '</span>' + filings3[0] + '<i class="icon-file-alt"> </i></div></a>' +
									'<a href="' + filings4[2] + '" class="large-6 columns" target="_blank"><div><span>' + numberWithCommas(filings4[1]) + '</span>' + filings4[0] + '<i class="icon-file-alt"> </i></div></a>' +
								'</div>' +
								'<div class="large-4 columns right">' +
									'<div>' +
										'<div class="icon"></div>' +
										'<h3>What can I do online?</h3>' +
										'<ul>' +
											'<li>Register a new business</li>' +
											'<li>Get a taxpayer ID</li>' +
											'<li>Apply for a tradename</li>' +
											'<li>and much more!</li>' +
										'</ul>' +
										'<a href="https://hbe.ehawaii.gov/BizEx/home.eb" target="_blank" class="no_button"><span>Go to HBE Now</span></a>' +
									'</div>' +
								'</div>' +
							'</div>';
						
						//insert html in modal
						$('#modal_content').html(html);
					}
				});
			}
		},
		paginate: function(data, tile_id) {
			//clear table
			$('#businesses_table tbody').html('');
			
			//declare html variable
			var html = '';
			
			//iterate throught data and add table rows
			$.each(data.items, function(key, value) {
				//check if type = BB1 and state = submitted
				if(value.short_name == 'BB1' && value.state == 'SUBMITTED') {
					var state = 'SUBMITTED1'
				}
				else {
					var state = value.state;
				}
				
				html += '<tr><td data-title="Business Name">' + value.name +'</td><td data-title="Type">' + value.short_name + '</td><td data-title="Last Updated">' + pretty_date(value.last_updated) + '</td><td><span data-tooltip data-width="400" class="has-tip tip-bottom" title="' + pretty_filing_status[value.state].tooltip + '">' + pretty_filing_status[value.state].status + ' <i class="icon-info-sign"> </i></span></td><td data-title="Paid On">' + pretty_date(value.paid_on) + '</td><td data-title="Filed On">' + (value.filed_on ? pretty_date(value.filed_on) : '') + '</td><td data-title="File"><a href="' + value.url + '">Download</a></td></tr>';
			});
			
			//replace table entries with new entries
			$('#businesses_table tbody').html(html);
			
			//show pagination buttons
			modal_pagination(data.meta.offset, data.meta.max, data.meta.count, tile_id, 'Older', 'Newer');
		}
	},
	// *****************************************************************************************************************************
	//camping
	// *****************************************************************************************************************************
	camping: {
		feed: function(meta_only, offset, max, callback) {
			var feedUrl = '/myhi/proxy/feed-41.json?';
			if(meta_only == true) {
				feedUrl += 'meta_only=true&';
			}
			if(offset) {
				feedUrl += 'offset=' + offset + '&';
			}
			if(max) {
				feedUrl += 'max=' + max + '&';
			}
			
			feedUrl = feedUrl.substr(0, feedUrl.length-1);
			
			var request = $.ajax({ type: 'POST', url: feedUrl, contentType: "application/json", dataType: 'json'});
			request.done(function(data) {
				callback(data);
			});
			request.fail( function(xhr, stat, message) {
				if(message == 'Authorization Required') {
					window.location = 'https://' + location.host + '/myhawaii/?session=1'
				}
				else {
					error_modal();
				}
			});
		},
		modal: function(data, tile_id) {
			//start html by creating title
			var html = '<h2>My Camping Reservations <i class="icon-question-sign myhi_info"> </i></h2>';
			
			//info text
			html += '<div class="myhi_info_content"><p>This page shows camping and cabin reservations made through: <a href="https://camping.ehawaii.gov" target="_blank">State Parks Camping</a> & <a href="https://hawaiicounty.ehawaii.gov/camping" target="_blank">Hawaii County Camping</a>. Reservations made offline or through other means are not included.</p></div>';
	
			//make table
			if(data.meta.count > 0) {
				html += 
						'<div class="modal_table"><table id="camping_table">' +
							'<thead>' +
								'<tr>' +
									'<th>Permit #</th>' +
									'<th>Purchase Date</th>' +
									'<th>Check-In Date</th>' +
									'<th>Location</th>' +
									'<th>Amount Paid</th>' +
									//'<th>Island</th>' +
									//'<th>Site Type</th>' +
									//'<th>File</th>' +
								'</tr>' +
							'</thead>' +
							'<tbody>';
								//store today's date
								var today = new Date();
								today.setHours(0,0,0,0);
							
								//iterate through data and insert into table
								$.each(data.items, function(key, value) {
									//determine if camping check-in date is in the future or past
									var date = value.start_date;
								    var parts = date.split("-");
								    var date = new Date(parseInt(parts[2], 10),parseInt(parts[0], 10) - 1,parseInt(parts[1], 10));
								    date.setHours(0,0,0,0);
								    if(date < today) {
								        var checkin = 'past';
								    }
								    else {
								        var checkin = 'future';
								    }
								    
								    value['formatted_start_date'] = date;
								    value['checkin'] = checkin;
								});
								
								sort_array(data.items,'formatted_start_date','DESC', false)
								
								$.each(data.items, function(key, value) {
									html += '<tr class="' + value.checkin + '"><td data-title="Permit #"><a href="' + value.pdf_url + '">' + value.permit_number +'</a></td><td data-title="Purchase Date">' + pretty_date(value.purchase_date) + '</td><td data-title="Check-In Date">' + pretty_date(value.start_date) + '</td><td data-title="Location">' + value.location_name +'</td><td data-title="Amount Paid">' + value.amount_paid +'</td>';
										//<td data-title="Island">' + value.island + '</td><td data-title="Site Type">' + value.site_type + '</td><td data-title="File"><a href="' + value.pdf_url + '">Link</td></tr>';
								});
								
				html += '</tbody></table></div><div id="modal_pagination"></div>';
				
				//insert html in modal
				$('#modal_content').html(html);
				
				//show pagination buttons
				modal_pagination(data.meta.offset, data.meta.max, data.meta.count, tile_id, 'Older', 'Newer');
			}
			//show other content if 0 data
			else {
				$.ajax({
					url:"/myhi/proxy/feed-45.json",
					success: function(result) {
						var total = 0;
						var islands = new Array;
						for (x in result.items) {
							total += result.items[x]['qty'];
							if(islands[result.items[x]['island']]) {
								islands[result.items[x]['island']] += result.items[x]['qty'];
						    }
						    else {
						    	islands[result.items[x]['island']] = result.items[x]['qty'];
						    }
						}
					
						html += 
							'<div id="camping_no_content">' +
								'<div class="large-8 columns left">' +
									'<h3>You have <span>0</span> Camping Reservations.</h3>' +
									'<br />' +
									'<span class="others"><span>What others are doing...</span></span>' + 
									'<br />' +
									'<div class="total_camping"><span>' + numberWithCommas(total) + '</span> Total Statewide Reservations (last 30 days)</div>' +
									'<br />' +
									'<h3>By Island</h3>' +
									'<ul class="large-block-grid-5 small-block-grid-1 islands">' +
										'<li class="island_camping hawaii"><div><span>' + (islands['Hawaii'] ? numberWithCommas(islands['Hawaii']) : '0') + '</span><span>Hawaii</span></div><div class="island_back"></div></li>' +
										'<li class="island_camping kauai"><div><span>' + (islands['Kauai'] ? numberWithCommas(islands['Kauai']) : '0') + '</span><span>Kauai</span></div><div class="island_back"></div></li>' +
										'<li class="island_camping maui"><div><span>' + (islands['Maui'] ? numberWithCommas(islands['Maui']) : '0') + '</span><span>Maui</span></div><div class="island_back"></div></li>' +
										'<li class="island_camping molokai"><div><span>' + (islands['Molokai'] ? numberWithCommas(islands['Molokai']) : '0') + '</span><span>Molokai</span></div><div class="island_back"></div></li>' +
										'<li class="island_camping oahu"><div><span>' + (islands['Oahu'] ? numberWithCommas(islands['Oahu']) : '0') + '</span><span>Oahu</span></div><div class="island_back"></div></li>' +
									'</ul>' +
									'<br />' +
									'<h3>Popular Campsites</h3>' +
									'<ul>' +
										'<li>' + result.items[0]['name'] + ', ' + result.items[0]['island'] + ' (' + result.items[0]['qty'] + ' reservations)</li>' +
										'<li>' + result.items[1]['name'] + ', ' + result.items[1]['island'] + ' (' + result.items[1]['qty'] + ' reservations)</li>' +
										'<li>' + result.items[2]['name'] + ', ' + result.items[2]['island'] + ' (' + result.items[2]['qty'] + ' reservations)</li>' +
									'</ul>' +
								'</div>' +
								'<div class="large-4 columns right">' +
									'<div>' +
										'<div class="icon"></div>' +
										'<h3>Enjoy camping sites on:</h3>' +
										'<ul>' +
											'<li>53 State Parks encompassing 25,000 acres</li>' +
											'<li>9 county beach parks on the island of Hawaii</li>' +
											'<li>Hawaii\'s Forest Reserves remote and mountainous locations</li>' +
										'</ul>' +
										'<a href="https://camping.ehawaii.gov" class="no_button" target="_blank"><span>STATE CAMPING</span></a>' +
										'<br />' +
										'<a href="https://hawaiicounty.ehawaii.gov" class="no_button" target="_blank"><span>COUNTY CAMPING</span></a>' +
									'</div>' +
								'</div>' +
							'</div>';
						
						//insert html in modal
						$('#modal_content').html(html);
					}
				});
			}
		},
		paginate: function(data, tile_id) {
			//clear table
			$('#camping_table tbody').html('');

			//declare html variable
			var html = '';
			
			//store today's date
			var today = new Date();
			today.setHours(0,0,0,0);
		
			//iterate through data and insert into table
			$.each(data.items, function(key, value) {
				//determine if camping check-in date is in the future or past
				var date = value.start_date;
			    var parts = date.split("-");
			    var date = new Date(parseInt(parts[2], 10),parseInt(parts[0], 10) - 1,parseInt(parts[1], 10));
			    date.setHours(0,0,0,0);
			    if(date < today) {
			        var checkin = 'past';
			    }
			    else {
			        var checkin = 'future';
			    }
			    
			    value['formatted_start_date'] = date;
			    value['checkin'] = checkin;
			});
			
			sort_array(data.items,'formatted_start_date','DESC', false)
			
			$.each(data.items, function(key, value) {
				html += '<tr class="' + value.checkin + '"><td data-title="Permit #"><a href="' + value.pdf_url + '">' + value.permit_number +'</a></td><td data-title="Purchase Date">' + pretty_date(value.purchase_date) + '</td><td data-title="Check-In Date">' + pretty_date(value.start_date) + '</td><td data-title="Location">' + value.location_name +'</td><td data-title="Amount Paid">' + value.amount_paid +'</td>';
					//<td data-title="Island">' + value.island + '</td><td data-title="Site Type">' + value.site_type + '</td><td data-title="File"><a href="' + value.pdf_url + '">Link</td></tr>';
			});
			
			//replace table entries with new entries
			$('#camping_table tbody').html(html);
			
			//show pagination buttons
			modal_pagination(data.meta.offset, data.meta.max, data.meta.count, tile_id, 'Older', 'Newer');
		}
	}
}

//****************************************************************************************************
// =MAIN FUNCTIONS
//****************************************************************************************************

//check user credentials on page load
function myhawaii_login() {
	myhawaii_is_available();
	
	AuthHandler = MyHi.createAuthHandler({
		baseUrl : authUrl,
		lalaUrl : lalaUrl,
		loginAt : originUrl,
		
		onLoggedIn : function(name) {
			//hide the login form
			$(".myhawaii_login").hide().removeClass('large-12 columns row');
			
			//build html
			var html = 
				'<h2><i class="icon-user"> </i> Aloha ' + name + '</h2>' +
				
				//account bar
				'<div class="large-12 columns">' +
					'<div class="myhi_account_bar">' +
						'<div class="large-6 columns">' +
							'<a href="' + lalaUrl + '/account/update.lala" target="_blank"><i class="icon-gears"> </i> <span>Account Settings</span></a>' +
						'</div>' +
						'<div class="large-6 columns">' +
							'<a href="/myhi/logout"><i class="icon-signout"> </i> <span>Logout</span></a>' +
						'</div>' +
						'<div class="clear"></div>' +
					'</div>' +
				'</div>' +
				
				//transactions tile
				'<div class="large-4 columns myhawaii_tile">' +
					'<a href="transactions/" class="business primary myhawaii_modal" id="myhawaii_transactions">' +
						'<span class="primary_text"></span>' +
						'<span class="secondary_text"></span>' +
						'<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>' +
					'</a>' +
				'</div>' +
				
				//businesses tile
				'<div class="large-4 columns myhawaii_tile">' +
					'<a href="businesses/" class="residents primary myhawaii_modal" id="myhawaii_businesses">' +
						'<span class="primary_text"></span>' +
						'<span class="secondary_text"></span>' +
						'<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>' +
					'</a>' +
				'</div>' +
				
				//camping tile
				'<div class="large-4 columns myhawaii_tile">' +
					'<a href="camping/" class="visitors primary myhawaii_modal" id="myhawaii_camping">' +
						'<span class="primary_text"></span>' +
						'<span class="secondary_text"></span>' +
						'<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>' +
					'</a>' +
				'</div>' +
				
				//empty tile
				'<div class="large-4 columns myhawaii_tile night">' +
					'<a href="timeline/" class="upcoming business primary touch_button" id="uc_notifications">' +
						'<span class="primary_text"><i class="icon-bullhorn"> </i> Coming Soon...</span>' +
						'<img src="/assets/images/myhawaii/img_new_alerts.png" alt="alerts and notifications image" />' +
						'<span class="secondary_text">Alerts &amp; Notifications</span>' +
					'</a>' +
				'</div>' +
				
				//empty tile
				'<div class="large-4 columns myhawaii_tile night">' +
					'<a href="feedback" class="upcoming government primary touch_button" id="uc_feedback">' +
						'<span class="primary_text"><i class="icon-envelope"> </i> What Do You Think...</span>' +
						'<span class="secondary_text">Let us know how to make your experience with us better.</span>' +
						'<div class="upcoming_button">Submit Form <i class="icon-arrow-right"> </i></div>' +
					'</a>' +
				'</div>' +
				
				//empty tile
				'<div class="large-4 columns myhawaii_tile night">' +
					'<a href="https://twitter.com/ehawaiigov" class="upcoming business secondary touch_button" id="uc_twitter" target="_blank" title="ehawaiigov Twitter Account">' +
						'<span class="primary_text"><i class="icon-twitter"> </i> Follow Us</span>' +
						'<span class="secondary_text">Follow us on Twitter to get our latest updates about my.hawaii.gov and eHawaii.gov!</span>' +
						'<div class="upcoming_button">Get Updates <i class="icon-arrow-right"> </i></div>' +
					'</a>' +
				'</div>';
				
				/*'<div class="large-4 columns myhawaii_tile">' +
					'<a href="#" class="empty">' +
						'<i class="icon-plus-sign-alt "> </i>' +
					'</a>' +
				'</div>' */
			
			//insert .myhawaii_content with html
			$(".myhawaii_content").html(html);
			
			//build transactions tile
			myhawaii.transactions.feed(true, 30, null, null, function(data) {
				$('#myhawaii_transactions .primary_text').html(data.meta.count);
				if(data.meta.count > 1 || data.meta.count == 0) {
					$('#myhawaii_transactions .secondary_text').html('Transactions (Last 30 Days)');
				}
				else {
					$('#myhawaii_transactions .secondary_text').html('Transaction (Last 30 Days)');
				}
				$('#myhawaii_transactions .loading_image').hide();
			});
			
			//build businesses tile
			myhawaii.businesses.feed(true, null, null, function(data) {
				$('#myhawaii_businesses .primary_text').html(data.meta.count);
				if(data.meta.count > 1 || data.meta.count == 0) {
					$('#myhawaii_businesses .secondary_text').html('Business Filings');
				}
				else {
					$('#myhawaii_businesses .secondary_text').html('Business Filing');
				}
				$('#myhawaii_businesses .loading_image').hide();
			});
			
			//build camping tile
			myhawaii.camping.feed(true, null, null, function(data) {
				$('#myhawaii_camping .primary_text').html(data.meta.count);
				if(data.meta.count > 1 || data.meta.count == 0) {
					$('#myhawaii_camping .secondary_text').html('Camping Reservations');
				}
				else {
					$('#myhawaii_camping .secondary_text').html('Camping Reservation');
				}
				$('#myhawaii_camping .loading_image').hide();
			});
			
			//adjust height accordingly
			$('.swipe_container').height($('.active_swipe').outerHeight());
			
			//adjust width accordingly (FF Fix)
			var window_width = $('body').width();
			$('.swipe_panels').css('left', $('.active_swipe').index() * -window_width);
		},

		onFail : function(data) {
			if (data.status == '401') {
				//show login form
				$(".myhawaii_login").show();
			} 
			else if (data.status == 'security_violation') {
				//show login form
				$(".myhawaii_login").show();
				
				//show security message
				$('#myhawaii_error').show().html('<i class="icon-warning-sign"> </i>Your password is insecure or expired. You will need to change it in order to access this page. Click <a href="#password_change" onclick="password_change(); return false;">here</a> to change your password.');
			}
			else {
				//show login form
				$(".myhawaii_login").show();
				
				//show other errors
				//$("#content").text("myhawaii_login() Error: " + data.message);
			}
			
			//adjust height accordingly
			$('.swipe_container').height($('.active_swipe').outerHeight());
			
			//adjust width accordingly (FF Fix)
			var window_width = $('body').width();
			$('.swipe_panels').css('left', $('.active_swipe').index() * -window_width);
		}
	});
}

//myhawaii form login
function form_login() {
	myhawaii_is_available();

	AuthHandler.login('#loginForm', {
		onFail : function(data) {
			$('#myhawaii_error').show().html('<i class="icon-warning-sign"> </i>Sorry, you entered an invalid Email or Password. Please try again.');
			$('#myhawaii_error').shake();
			
			//adjust height accordingly
			$('.swipe_container').height($('.active_swipe').outerHeight());
			
			//adjust width accordingly (FF Fix)
			var window_width = $('body').width();
			$('.swipe_panels').css('left', $('.active_swipe').index() * -window_width);
		}
	});
}

//redirect to change password page
function password_change() {
	myhawaii_is_available();

	AuthHandler.passwordChangeRedirect();
}

//****************************************************************************************************
// =MODAL
//****************************************************************************************************

//open modal
function myhawaii_modal(tile_id) {
	// initialize modal
	$(document).foundation('reveal', {closeOnBackgroundClick: true, dismissModalClass: 'close_modal', closed: function() {$('#modal_content').html('<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>')}});
	
	if(tile_id == 'myhawaii_transactions') {
		//get transactions
		myhawaii.transactions.feed(false, 0, null, 10, function(data) {
			myhawaii.transactions.modal(data, tile_id);
		});
	}
	else if(tile_id == 'myhawaii_businesses') {
		//get businesses
		myhawaii.businesses.feed(false, 0, 10, function(data) {
			myhawaii.businesses.modal(data, tile_id);
		});
	}
	else if(tile_id == 'myhawaii_camping') {
		//get camping
		myhawaii.camping.feed(false, 0, 10, function(data) {
			myhawaii.camping.modal(data, tile_id);
		});
	}
			
	//open modal
	$('#modal').removeClass('myhi_feed_error').foundation('reveal', 'open');
	
	//prevent default link action (add ie logic)
	return false;
}

//error modal
function error_modal() {
	//add error class to modal
	$('#modal').addClass('myhi_feed_error');
					
	//start error html
	var html = '<h2><i class="icon-warning-sign"> </i>my.hawaii.gov Error</h2><p>my.hawaii.gov has encountered an error while retreiving your information.  Please try again later.</p><p>If the problem persists, please call customer support at (808) 695-4620.</p>';
	
	//insert html in modal
	$('#modal_content').html(html);
}

//****************************************************************************************************
// =PAGINATION
//****************************************************************************************************

//pagination buttons
function modal_pagination(offset, max, count, tile_id, left_text, right_text) {
	$('#modal_pagination').html('');
	if((offset + max) < count && count > 0) {
		$('#modal_pagination').append('<a href="#older" class="site_button modal_pagination large-1 small-6 columns" id="pagination_older" data-offset="' + (offset + max) + '" data-tile_id = ' + tile_id + '>' + left_text + '</a>');	
	}
	else {
		$('#modal_pagination').append('<div class="large-1 columns"> </div>');
	}
	if((offset - max) >= 0 && count > 0) {
		$('#modal_pagination').append('<a href="#newer" class="site_button modal_pagination large-1 large-offset-10 small-6 columns" id="pagination_newer" data-offset="' + (offset - max) + '" data-tile_id = ' + tile_id + '>' + right_text + '</a>');
	}
}

//****************************************************************************************************
// =HELPER FUNCTIONS
//****************************************************************************************************

//show error message if myhawaii is unavailable
function myhawaii_is_available() {
	if(!window.MyHi) {
		if($('#myhawaii_unavailable').is(':visible')) {
			$('#myhawaii_unavailable').shake();
		}
		else {
			$('#myhawaii_unavailable').show();
			$('#loginForm input').attr('disabled', true);
			$('#loginForm button').attr('disabled', true);
			$('#myhawaii_signup').addClass('disabled');
			$('#loginForm .touch_button').addClass('disabled');
			
			$('#loginForm a').click(function (e) {
			    e.preventDefault();
			});
		}
		throw new Error("myhawaii is unavailable.");
    }
}

//output pretty date
function pretty_date(date) {
    var parts = date.split("-");
    var dt = new Date(parseInt(parts[2], 10),parseInt(parts[0], 10) - 1,parseInt(parts[1], 10));
    var curr_date = dt.getDate();
    var curr_month = dt.getMonth();
    var curr_year = dt.getFullYear();
	if(curr_year <= 2000) {
		curr_year = curr_year + 100;
	}
    
    var month = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    
    return month[curr_month] + ' ' + curr_date + ', ' + curr_year;
}

//error shake
(function ($) {
    $.fn.shake = function (options) {
        // defaults
        var settings = {
            'shakes': 5,
            'distance': 5,
            'duration': 500
        };
        // merge options
        if (options) {
            $.extend(settings, options);
        }
        // make it so
        var pos;
        return this.each(function () {
            $this = $(this);
            // position if necessary
            pos = $this.css('position');
            if (!pos || pos === 'static') {
                $this.css('position', 'relative');
            }
            // shake it
            for (var x = 1; x <= settings.shakes; x++) {
                $this.animate({ left: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
                    .animate({ left: settings.distance }, (settings.duration / settings.shakes) / 2)
                    .animate({ left: 0 }, (settings.duration / settings.shakes) / 4);
            }
        });
    };
}(jQuery));

//url parameters
var QueryString = function () {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
}();

//commas in long numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//sort arrays
function sort_array(array,value,order,isFloat) {
	if(order == 'DESC') {
		array.sort(function(a,b) { 
			if(isFloat && isFloat == true) {
				return parseFloat(b[value]) - parseFloat(a[value]) 
			}
			else {
				return b[value] - a[value];
			}
		});
	}
	else if (order == 'ASC') {
		array.sort(function(a,b) { 
			if(isFloat && isFloat == true) {
				return parseFloat(a[value]) - parseFloat(b[value]) 
			}
			else {
				return a[value] - b[value];
			}
		});
	}
}

//generate array of random numbers
function random_number(count,max) {
	if(count <= max) {
		var random_array = new Array;
		for (var i=0; i < count ;i++) {
			var random = Math.floor((Math.random()*max)+1);
			random_array.push(random);
		}
	
		if(has_duplicates(random_array)) {
			var output = random_number(count,max);   
		}
		else {
			var output = random_array;   
		}
	}
	else {
		var output = "max must be greater than count";  
	}
	
	return output;
}

function has_duplicates(arr) {
	var x = {}, len = arr.length;
		for (var i = 0; i < len; i++) {
			if (x[arr[i]] === true) {
				return true;
			}
			x[arr[i]] = true;
		}
	return false;
}

//****************************************************************************************************
// =HELPER ARRAYS
//****************************************************************************************************

var pretty_filing_status = {
	AGENCY_APPROVED: {status: 'Approved by Agency', tooltip: 'All filed documents sent to the agency have been approved.'},
	AGENCY_RECEIVED: {status: 'Received by Agency', tooltip: 'All filed documents have been received by the agency.'},
	AGENCY_REJECTED: {status: 'Rejected by Agency', tooltip: 'This form sent to the agency and was rejected.'},
	BATCHED: {status: 'Batched', tooltip: 'Filing submitted to the agency.'},
	DELETED: {status: 'Deleted', tooltip: 'You removed this filing from your view.'},
	PAYMENT_PROCESSED: {status: 'Payment Processed', tooltip: 'Payment for this has been processed.'},
	PURCHASED: {status: 'Purchased', tooltip: 'All filing fees have been paid. HBE will submit all documents to the appropriate agency.'},
	SUBMITTED: {status: 'Submitted to Agency', tooltip: 'All filed documents have been or will be submitted to the appropriate agency.'},
	SUBMITTED1: {status: 'Submitted to eHawaii.gov', tooltip: 'All filed documents have been received by eHawaii.gov and are in process of batching prior to sending to DoTAX.'}
}

var business_plurals = {
	BB1: 'Basic Business Applications',
	T1: 'Applications for Registration of Trade Name',
	DC1: 'Articles of Incorporation (Profit)',
	GP1: 'Registration Statements for Partnership',
	DNP1: 'Articles of Incorporation (Non-profit)',
	FC1: 'Applications for Certificate of Authority for Foreign Corp.',
	LLC1: 'Articles of Organization for Limited Liability Company',
	FLLC1: 'Articles of Organization for Limited Liability Company',
	LP1: 'Certificates of Limited Partnership',
	LLP1: 'Certificates of Limited Liability Partnership',
	FLP1: 'Applications for Foreign Limited Partnership Registration',
	FLLP1: 'Applications for Foreign Limited Liability Partnership Registration',
	T2: 'Applications for Registration of Trade Mark',
	T3: 'Applications for Registration of Service Mark',
	X7: 'Statements of Change of Registered Agent By Entity',
	X1: 'Applications for Reservation of Name',
	X2: 'Transfers of Name Reservation',
	X9: 'Statements of Resignation of Registered Agent',
	X8: "Statements of Change of Non-commercial Registered Agent's Business Address or Name",
	DC2: 'Articles of Amendment to Change Corporate Name',
	DNP2: 'Articles of Amendment to Change Corporate Name',
	LLC2: 'Articles of Amendment to Change Limited Liability Company Name',
	LLP2: 'Statements of Amendment',
	FLP2: 'Certificates of Change of Foreign Limited Partnership Registration',
	LP2: 'Certificates of Amendment of Limited Partnership',
	GP2: 'Partnership Change Of Name Statements',
	T4: 'Assignments of Trade Name, Trademark or Service Mark',
	X11: 'Commercial Registered Agent Listing Statements',
	X13: 'Commercial Registered Agent Termination Statements',
	X14: 'Statements of Change by Commercial Registered Agent',
	BREGANNL: 'Annual Filing Renewals Online Payments',
	BREGDOCS: 'Online Documents'
}

//****************************************************************************************************
// =EVENTS
//****************************************************************************************************

$(function() {
	//myhawaii login form detect when user hits enter
	$('body').on('keypress', '#loginForm input', function(event){
		if(event.which == 10 || event.which == 13) {
            form_login();
            return false;
        }
	})
	
	//myhawaii login form button click
	$('body').on('click', '#loginButton', function(event){
		form_login();
	});
	
	//myhawaii modal
	$('body').on('click', '.myhawaii_modal', function(event){
		if(!$('html').hasClass('lt-ie9')) {
			var tile_id = $(this).attr('id').replace('#','');
			myhawaii_modal(tile_id);
			return false;	
		}
		else {
			return true;
		}
	});
	
	//modal pagination
	$('body').on('click', '.modal_pagination', function(event) {
		//get offset from data attribute
		var offset = $(this).data('offset');
		
		//which dataset to fetch
		var tile_id = $(this).data('tile_id');
		
		if(tile_id == 'myhawaii_transactions') {
			//get transactions
			myhawaii.transactions.feed(false, 0, offset, 10, function(data) {
				myhawaii.transactions.paginate(data, tile_id);
			});
		}
		else if(tile_id == 'myhawaii_businesses') {
			//get businesses
			myhawaii.businesses.feed(false, offset, 10, function(data) {
				myhawaii.businesses.paginate(data, tile_id);
			});
		}
		else if(tile_id == 'myhawaii_camping') {
			//get camping
			myhawaii.camping.feed(false, offset, 10, function(data) {
				myhawaii.camping.paginate(data, tile_id);
			});
		}
		
		//prevent default link action (add ie logic)
		return false;
	})
	
	//info button
	$('body').on('click', '.myhi_info', function(event){
		$('.myhi_info_content').slideToggle();
	});
	
	//feedback tile
	$('body').on('click', '#uc_feedback', function(event){
		//feedback iframe
		var html = '<iframe height="732" allowTransparency="true" frameborder="0" scrolling="no" style="width:100%;border:none" src="https://forms.ehawaii.gov/embed.php?id=80" title=" my.hawaii.gov Feedback"><a href="https://forms.ehawaii.gov/view.php?id=80" title=" my.hawaii.gov Feedback"> my.hawaii.gov Feedback</a></iframe>'
		
		//insert html into modal
		$('#modal_content').html(html);
		
		// initialize modal
		$(document).foundation('reveal', {closeOnBackgroundClick: true, dismissModalClass: 'close_modal', closed: function() {$('#modal_content').html('<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>')}});
		
		//open modal
		$('#modal').removeClass('myhi_feed_error').foundation('reveal', 'open');
		
		return false;
	});
	
	//feedback tile
	$('body').on('click', '#uc_notifications', function(event){
		var url = $(this).attr('href') + ' .modal_container';
	
		// initialize modal
		$(document).foundation('reveal', {closeOnBackgroundClick: true, dismissModalClass: 'close_modal', closed: function() {$('#modal_content').html('<div class="loading_image"><img src="/public/assets/images/loading.gif" alt="loading icon" /></div>')}});
		
		//insert html into modal
		$('#modal_content').load(url, function() {
			//open modal
			$('#modal').removeClass('myhi_feed_error').foundation('reveal', 'open');
			$('.loading_image').hide();
		});
		
		return false;
	});
	
	if($('html').hasClass('lt-ie9')) {
		$('.timeline_month').removeAttr('title');
	}
});
