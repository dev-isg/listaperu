(function($) {
	window.MyHi = window.MyHi || {};
	
	var AuthHandler = function() {
			this.init = function(settings) {
				
				var onLoggedIn = settings.onLoggedIn;
				var onFail = settings.onFail;
				var $self = this;

				$self.loginAt = settings.loginAt;
				$self.lalaUrl = settings.lalaUrl;
				$self.onLoggedIn = onLoggedIn;
				$self.onFail = onFail;
				$self.baseUrl = settings.baseUrl || '';
				
				var posting1 = $.ajax({
		    	   type: 'POST',
		    	   url: $self.baseUrl + '/lalaName.json',
		    	   async: false,
		    	   jsonpCallback: 'jsonCallback',
		    	   contentType: "application/json",
		    	   dataType: 'jsonp'
			    });
				
				posting1.done(function(data) {
					
		        	if ( (typeof data.redirect) == "undefined") {

		    		  if (onLoggedIn) {
		    			  onLoggedIn.apply($self, [data.name]);
		    		  }
		    		  
		        	} else {
		        		
		        	  // try to register service
		        	  var lalaLogin = $.ajax({
		        		    type: 'GET',
		        		    url: data.redirect,
		        		    async: false,
		        		    jsonpCallback: 'jsonCallback',
		        		    contentType: "application/json",
		        		    dataType: 'jsonp'
		        	  });
		        	  
		       		  lalaLogin.done(function(lalaData) {
		       			  
			       		  if ( (typeof lalaData.error) == "undefined") {
			       			  
			        		var firstEntry = $.ajax({
			        		    type: 'GET',
			        		    url: lalaData.redirectUrl,
			        		    async: false,
			        		    jsonpCallback: 'jsonCallback',
			        		    contentType: "application/json",
			        		    dataType: 'jsonp',
			        		    data: {"X-Requested-With": "XMLHttpRequest"}
			        		});
			        		
			        		firstEntry.done(function(fdata) {
			        			
				        	      /* get data */
				        	      var posting2 = $.ajax({
				        	    	   type: 'POST',
				        	    	   url: $self.baseUrl + '/lalaName.json',
				        	    	   async: false,
				        	    	   jsonpCallback: 'jsonCallback',
				        	    	   contentType: "application/json",
				        	    	   dataType: 'jsonp'
				        	      });
				        	      
				        	      posting2.done(function(sdata) {
				        	    	  
				        	    	if (onLoggedIn) {
				        	    		onLoggedIn.apply($self, [sdata.name]);
				        	    	}
				        	    	
				        	      });
			        	      
				        	      posting2.fail(function(jqXHR, stat, err) {
				        	    	  if (onFail) {
						       				onFail.apply($self, [{status: stat, message : err}]);
						       		  }
				        	      });
			        		});
			        		
			        		firstEntry.fail(function(jqXHR, stat, err) {
								if (onFail) {
									onFail.apply($self, [{status: stat, message : err}]);
								}
							});
			        		
			       		  }  else {
			       			  var err = lalaData.error == "security_violation" ? lalaData.error : '401';
			       			  if (onFail) {
			       				onFail.apply($self, [{status: err, message : lalaData.error}]);
			       			  }
			       			  
			         	  }
			       		  
		       		  });
		       		  
		        	}
		          });
				
				posting1.fail(function(jqXHR, stat, err) {
					if (onFail) {
						onFail.apply($self, [{status: stat, message : err}]);
					}
				});
			},
			
			this._initLogin = function(selector, options) {
				var $self = this;
				var loginForm;
				
				if (typeof selector == 'string') {
					loginForm = $(selector);
				} else {
					loginForm = selector;
				}
				
				if (!loginForm.prop('action')) {
					loginForm.prop('action', $self.lalaUrl + '/register');
				}
				
				var _method = loginForm.prop('method') || '';
				if (_method.toUpperCase() != 'POST') {
					loginForm.prop('method', 'POST');
				}
				
				if (loginForm.find('input[name="login-at"]').length == 0) {
					loginForm.append($('<input/>', {type : 'hidden', name : 'login-at', value : $self.loginAt}));
				}
				
				$self._loginForm=loginForm;
				return loginForm;
			},
			
			this.login = function(selector, options) {
				var $self = this;
				$self.baseUrl = $self.baseUrl || '';
				
				var loginForm = $self._loginForm;
				
				if (!loginForm) {
					loginForm = $self._initLogin(selector, options);
				}
				
				var posting = $.post($self.baseUrl + '/validate.html', loginForm.serialize());
	        	posting.done(function(data) {
	        		loginForm.submit();
	          	});
	        	
	        	posting.fail(function(jqXHR, stat, err) {
	        		if (options.onFail) {
	        			options.onFail.apply($self, [{status: stat, message : err}]);
	        		}
	          	});
			},
			
			this.passwordChangeRedirect = function() {
				var $self = this;
				var _form = $('<form/>', {action : $self.lalaUrl + '/register', method : 'POST', style : "position : absolute; left: 9999px"})
   			    .append($('<input/>', {type : 'hidden', name : 'login-at', value : $self.loginAt}))
   			    .append($('<input/>', {type : 'submit', value : ""}))
   			    .appendTo('body')
   			    .submit();
			}
	};
	
	MyHi.createAuthHandler = function(settings) {
		var authHandler = new AuthHandler();
		authHandler.init(settings);
		return authHandler;
	};
	
})(jQuery);