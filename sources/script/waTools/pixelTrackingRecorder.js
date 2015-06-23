function pixelTrackingRecorder(casper) {
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
		//casper.log('pixel addRecord : ' + url , 'debug')
		this.analyticUrls.push(url);
		casper.log('number of url ' + this.getNumberOfPixelTracking() , 'debug');
		this.logUrlParamValue(url);
	};
	
	this.getNumberOfPixelTracking=function(){
		return this.analyticUrls.length;
		//pixelTrackingRecorder.getNumberOfPixelTracking
	};
	
	this.getValueForTheKeyForTheLastRecord=function(name) {
	searchLocation=this.analyticUrls[this.analyticUrls.length-1].toString().split("?")[1];
	searchDecoded = decodeURIComponent(searchLocation);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(searchLocation);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};
	
	this.getAllPixelTrackings=function(){
		return this.analyticUrls.toString();
	};
	
	this.logUrlParamValue=function(url){
		var params = url.substr(url.indexOf("?")+1);
		  
		  params = params.split("&");
		    // split param and value into individual pieces
		    for (var i=0; i<params.length; i++)
		       {
		         temp = params[i].split("=");
		         //if ( [temp[0]] == sname ) { sval = temp[1]; }
		         casper.log(  temp[0] + ' : ' + decodeURIComponent(temp[1]) , 'debug');
		       }
	};

}	
