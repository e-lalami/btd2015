function toolBox() {
	
	this.isAnalyticsUrl = function(url) {
		  return (url.indexOf("piwik.php") > -1) + (url.indexOf("metrics.rolex.com") > -1) ;
	};
	
	this.waitForPixelTracking=function(casper,pixelTrackingRecorder,nbPixelTracking){
		casper.waitFor(function waitForPixelTracking() {
			return pixelTrackingRecorder.getNumberOfPixelTracking()>nbPixelTracking;  
			}, 
			function then() {casper.log('pixel tracking found' , 'debug');}
			,
			function timeout() { casper.log('No new pixel Tracking Found number of pixel tracking was :' + pixelTrackingRecorder.getNumberOfPixelTracking() + ' and is  : '+ nbPixelTracking  ,'warning');}	
		);};
	
	this.checkForLoader = function(casper){
		 //let's loader come'
		 casper.waitUntilVisible('div.rlx-spinner', 
		 // ok result
		 function() {
			 this.waitWhileVisible('div.rlx-spinner', (function() {	 
					}), (function() {
				this.die("Timeout reached. for rolex spinner visible");
				this.exit();
			})
		// timeout
		, 12000);
			 }
		 ,
		 //ko result
		 function() {
				//this.echo('Snapping ' + url + ' at width ' + view_port_width);
				}
		 // timeout 
		 ,
		  2000
		  );
		};

	this.checkPageKicked = function(casper){
		
		casper.waitFor(
				function waitForPageKicked() {
					return lastMessageRemote=="everything has been loaded, page has been kicked @ ";  
					}
				, function then() {casper.log('/!\\ Paged Kicked /!\\ ' , 'debug');}
				, function timeout() { casper.log('Paged not Kicked' ,'warning');}
				, 12000
				);
	
		};	
	
	this.addFakeGeolocation = function(casper, latitude, longitude) {
	    casper.evaluate(function() {
	        window.navigator.geolocation = function() {
	            var pub = {};
	            var current_pos = {
	                coords: {
	                    latitude: window.__casper_params__.latitude,
	                    longitude: window.__casper_params__.longitude
	                }
	            };
	            pub.getCurrentPosition = function(locationCallback,errorCallback) {
	                locationCallback(current_pos);
	            };
	            return pub;
	        }();
	    }, { latitude: latitude, longitude: longitude });
	};
	
}
