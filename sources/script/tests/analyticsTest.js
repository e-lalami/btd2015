f = require('utils').format;

ROOT_Path = '/home/yann/sources/conference/btd2015/sources/script';
phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/initialization.js');

var searchPage = new SearchPage();
var mainMenu = new MainMenu();


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



var nbPixelTracking = pixelTrackingRecorder.getNumberOfPixelTracking();

casper.waitFor(function check() {
    return pixelTrackingRecorder.getNumberOfPixelTracking()>nbPixelTracking ;  
	}, 
	function then() {
		casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('_ref'),"http://www.google.fr/search?hl=fr&source=hp&q=btd+conf&gbv=2&oq=&gs_l=","referer should be propagated");
	}
	);
});
casper.then(function() {
	casper.test.comment('Step 6 - Stop the pixel tracking recorder');
	pixelTrackingRecorder.stop();
});


casper.run(function() {
    this.test.done(1);
});

