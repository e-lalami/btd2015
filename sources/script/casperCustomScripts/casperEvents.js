function casperEvents() {

	
	this.declareOnRessourceReceived = function(casper,pixelTrackingRecorder) {
	
				// Check if a ressource is received
		
			casper.on('resource.received', function(resource) {
				var status = resource.status;
				var url = resource.url;
				var stage = resource.stage;
				
				if (stage=="end" & toolBox.isAnalyticsUrl(url) & pixelTrackingRecorder.isStarted() ){
					pixelTrackingRecorder.addRecord(url);
				}    
					
				
			});

		
		
		}
		
}
