f = require('utils').format;
var analyticUrl="",
    waRecorder_Started=false;
// listening to a custom event
SearchPageInjected= phantom.page.injectJs('./pageObject/SearchPage.js');
phantom.page.injectJs('./pageObject/MainMenu.js');


casper.on('analytics.request', function() {
	/*	this.echo('analytic request : ' + analyticUrl);
		this.echo('-----------');
		this.echo('param is : ' + getUrlParameterByName(analyticUrl,"_ref"));
		this.echo('-----------');*/
});

// Check if a ressource is received
casper.on('resource.received', function(resource) {
    var status = resource.status;
    var url = resource.url;
    var stage = resource.stage;
    
    if (stage=="end" & isAnalyticsUrl(url) & waRecorder_Started ){
	analyticUrl=url;
	//this.echo(isAnalyticsUrl(url));
	this.emit('analytics.request');	 
      }    
});


function startWaRecorder(){
	waRecorder_Started=true;
	}

function stopWaRecorder(){
	waRecorder_Started=false;
	analyticUrl="";
	}

    
function isAnalyticsUrl(url) {
    return url.indexOf("piwik.php") > -1;
}

//require a waRecorder started
function getUrlParameterByName(url,name) {
	searchLocation=url.split("?")[1];
	searchDecoded = decodeURIComponent(searchLocation)
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(searchLocation);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

if (SearchPageInjected){
var searchPage = new SearchPage();
var mainMenu = new MainMenu();
};

casper.test.comment('Step 1 - Open Google');

casper.start('http://google.fr/', function() {

	this.echo('search page injection : ' + SearchPageInjected);
	
		
casper.test.comment('Step 2 - Search for btd conf');
searchPage.fillSearchFormAndSubmit('btd conf');

casper.test.comment('Step 3 - Choose the first result to btd home page');
searchPage.chooseFirstResult();

casper.test.comment('Step 4 - Visit btd home page');  

casper.test.comment('Step 5 - Contact BTD team');
casper.then(function() {
	mainMenu.contact();
	startWaRecorder();
});

casper.then(function() {
	casper.waitForResource(/piwik/, function() {
		casper.test.assertEquals("http://www.google.fr/search?hl=fr&source=hp&q=btd+conf&gbv=2&oq=&gs_l=",getUrlParameterByName(analyticUrl,"_ref"),"referer should be propagated");
		//check with daniel if it is a problem to have strong test  
		//casper.test.assertEquals("http://btdconf.com/contact/",getUrlParameterByName(analyticUrl,"url"),"contat url should be tracked");
		});		
	});
});


casper.run(function() {
    this.test.done(1);
});

