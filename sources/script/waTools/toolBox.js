function toolBox() {
	
	this.isAnalyticsUrl = function(url) {
		  return (url.indexOf("piwik.php") > -1) + (url.indexOf("smetrics") > -1) ;
	};
	
}
