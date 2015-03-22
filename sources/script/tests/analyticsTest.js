f = require('utils').format;

ROOT_Path = '/home/yann/sources/conference/btd2015/sources/script'
phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/injection.js');
var injector = new injection();

injector.loadTools(phantom.page,ROOT_Path);
injector.loadPageObjects(phantom.page,ROOT_Path);
injector.loadEvents(phantom.page,ROOT_Path);

var searchPage = new SearchPage();
var mainMenu = new MainMenu();
var pixelTrackingRecorder = new pixelTrackingRecorder();
var toolBox= new toolBox();
var casperEvents= new casperEvents();

casperEvents.declareOnRessourceReceived(casper,pixelTrackingRecorder);

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

