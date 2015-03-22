f = require('utils').format;
var analyticUrl="";
SearchPageInjected= phantom.page.injectJs('./pageObject/SearchPage.js');
phantom.page.injectJs('./pageObject/MainMenu.js');
phantom.page.injectJs('./waTools/pixelTrackingRecorder.js');
phantom.page.injectJs('./waTools/toolBox.js');


// Check if a ressource is received
casper.on('resource.received', function(resource) {
    var status = resource.status;
    var url = resource.url;
    var stage = resource.stage;
    
    if (stage=="end" & toolBox.isAnalyticsUrl(url) & pixelTrackingRecorder.isStarted() ){
	pixelTrackingRecorder.addRecord(url);
//	this.echo("pixel tracking recorded");
    }    
});




if (SearchPageInjected){
var searchPage = new SearchPage();
var mainMenu = new MainMenu();
var pixelTrackingRecorder = new pixelTrackingRecorder();
var toolBox= new toolBox();
};

casper.test.comment('Step 1 - Open Google');

casper.start('http://google.fr/', function() {

casper.test.comment('Step 2 - Search for btd conf');
searchPage.fillSearchFormAndSubmit('btd conf');

casper.test.comment('Step 3 - Choose the first result to btd home page');
searchPage.chooseFirstResult();

casper.test.comment('Step 4 - Visit btd home page');  

casper.test.comment('Step 5 - Contact BTD team');
casper.then(function() {
	mainMenu.contact();
	pixelTrackingRecorder.start();

});

casper.then(function() {
	casper.waitForResource(/piwik/, function() {
		casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('_ref'),"http://www.google.fr/search?hl=fr&source=hp&q=btd+conf&gbv=2&oq=&gs_l=","referer should be propagated");
		});		
	});
});


casper.run(function() {
    this.test.done(1);
});

