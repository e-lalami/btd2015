f = require('utils').format;
var analyticUrl="",
    waProxy_Started=false;
// listening to a custom event




casper.on('analytics.request', function() {
		this.echo('analytic request : ' + analyticUrl);
		this.echo('-----------');
		this.echo('param is : ' + getUrlParameterByName(analyticUrl,"_ref"));
		this.echo('-----------');
});

// Check if a ressource is received
casper.on('resource.received', function(resource) {
    var status = resource.status;
    var url = resource.url;
    var stage = resource.stage;
    
    if (stage=="end" & isAnalyticsUrl(url) & waProxy_Started ){
	analyticUrl=url;
	this.echo(isAnalyticsUrl(url));
	this.emit('analytics.request');	 
      }    
});


function startWaProxy(){
	waProxy_Started=true;
	}

function stopWaProxy(){
	waProxy_Started=false;
	analyticUrl="";
	}

    
function isAnalyticsUrl(url) {
    return url.indexOf("piwik.php") > -1;
}

//http://btdconf.com/piwik/piwik.php?action_name=btdconf.com%2FBTD2015%20-%20Belgium%20Testing%20Days&idsite=2&rec=1&r=218989&h=0&m=41&s=35&url=http%3A%2F%2Fbtdconf.com%2F&urlref=http%3A%2F%2Fwww.google.fr%2Fsearch%3Fhl%3Dfr%26source%3Dhp%26q%3Dbtd%2Bconf%26gbv%3D2%26oq%3D%26gs_l%3D&_id=789f2f4f4ce21d57&_idts=1425685296&_idvc=1&_idn=1&_refts=1425685296&_viewts=1425685296&_ref=http%3A%2F%2Fwww.google.fr%2Fsearch%3Fhl%3Dfr%26source%3Dhp%26q%3Dbtd%2Bconf%26gbv%3D2%26oq%3D%26gs_l%3D&send_image=0&cookie=1&res=1024x768



//require a proxy started
function getUrlParameterByName(url,name) {
	searchLocation=url.split("?")[1];
	searchDecoded = decodeURIComponent(searchLocation)
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(searchLocation);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



casper.test.comment('Open Google');


casper.start('http://google.fr/', function() {
	
casper.test.comment('Search for btd conf');

casper.thenEvaluate(function(term) {
    document.querySelector('input[name="q"]').setAttribute('value', term);
    document.querySelector('form[name="f"]').submit();
}, 'btd conf');

casper.then(function() {
    // Click on 1st result link

casper.test.comment('Click on fisrt result');

    this.click('h3.r a');
    
});


casper.then(function() {
    // Click on contact link
casper.test.comment('Click Contact Menu');
 this.clickLabel('Contact', 'a');
startWaProxy();
    
});

casper.then(function() {
    

casper.waitForResource(/piwik/, function() {
    casper.test.assertEquals("http://www.google.fr/search?hl=fr&source=hp&q=btd+conf&gbv=2&oq=&gs_l=",getUrlParameterByName(analyticUrl,"_ref"),"referer should be propagated");
    //casper.test.assertEquals("http://btdconf.com/contact/",getUrlParameterByName(analyticUrl,"url"),"contat url should be tracked");
	});
    
});



 
});




casper.run(function() {
    this.test.done(1);
});

