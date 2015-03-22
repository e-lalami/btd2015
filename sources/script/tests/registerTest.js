f = require('utils').format;

ROOT_Path = '/home/yann/sources/conference/btd2015/sources/script';
phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/initialization.js');

var searchPage = new SearchPage();
var mainMenu = new MainMenu();


casper.test.comment('Step 1 - Luanch the pixel tracking recorder');
pixelTrackingRecorder.start();
nbPixelTracking=pixelTrackingRecorder.getNumberOfPixelTracking();
	
casper.test.comment('Step 2 - Visit registration page');
casper.start('http://btdconf.com/registration/', function() {



casper.waitFor(function check() {
    return pixelTrackingRecorder.getNumberOfPixelTracking()>nbPixelTracking + 1;  
	}, 
	function then() {
		casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('events'),"scAdd","add to cart should be tracked");
	}
);

});


casper.run(function() {
    this.test.done(1);
});

