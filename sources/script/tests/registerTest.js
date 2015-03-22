f = require('utils').format;

if(casper.cli.has("ROOT_Path"))
	{ ROOT_Path =casper.cli.get("ROOT_Path")}
else 
	{ROOT_Path = '/home/yann/sources/conference/btd2015/sources/script'}
phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/initialization.js');

casper.test.comment('Step 1 - Launch the pixel tracking recorder');
pixelTrackingRecorder.start();
nbPixelTracking=pixelTrackingRecorder.getNumberOfPixelTracking();
	
casper.test.comment('Step 2 - Visit registration page');
casper.start('http://btdconf.com/registration/', function() {

casper.waitFor(function check() {
    return pixelTrackingRecorder.getNumberOfPixelTracking()>nbPixelTracking;  
	}, 
	function then() {
		casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('events'),"scAdd","add to cart should be tracked");
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

