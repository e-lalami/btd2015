function pixelTrackingRecorder() {
	this.started=false;
	this.analyticUrl="";
    this.analyticUrls=new Array();

	this.start = function() {
		this.started=true;
	};
	
	this.stop = function() {
		this.started=false;
		this.analyticUrl="";
        this.analyticUrls=[];      
	};
	
	this.isStarted= function(){
		return this.started;
	};
	
	this.addRecord= function(url){
		this.analyticUrls.push(url);
	};
	
	this.getNumberOfPixelTracking=function(){
		return this.analyticUrls.length;
		//pixelTrackingRecorder.getNumberOfPixelTracking
	};
	
	this.getValueForTheKeyForTheLastRecord=function(name) {
	searchLocation=this.analyticUrls[this.analyticUrls.length-1].toString().split("?")[1];
	searchDecoded = decodeURIComponent(searchLocation)
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(searchLocation);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	
	this.getAllPixelTrackings=function(){
		return this.analyticUrls.toString();
	};

}	
