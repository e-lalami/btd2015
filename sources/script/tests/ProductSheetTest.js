//var casper = require('casper').create({
//   verbose: true,
//    logLevel: 'debug'
//});
f = require('utils').format;
if (casper.cli.has("ROOT_Path")) {
    ROOT_Path = casper.cli.get("ROOT_Path")
} else {
    ROOT_Path = '..'
}
phantom.page.injectJs(ROOT_Path + '/casperCustomScripts/initialization.js');

casper.test.comment('Step 0 - Start the Pixel Tracking Recorder');

pixelTrackingRecorder.start();
nbPixelTracking = pixelTrackingRecorder.getNumberOfPixelTracking();

debugger;
casper.test.comment('Step 1 - User Visit Speedy Bandouliere 25 Monogram Canvas - Handbags | LOUIS VUITTON UK');
casper.start('http://uk.louisvuitton.com/eng-gb/products/speedy-bandouliere-25-monogram-008774',
    function() {


        casper.waitFor(function check() {
                return pixelTrackingRecorder.getNumberOfPixelTracking() > nbPixelTracking;
            },
            function then() {
                casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('c17'),
                    "productsheet",
                    "Product Sheet 'c17' is Correctly Tracked");

                casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('v15'),
                    "M41113",
                    "Product model id (SKU) 'v15' is Correctly Tracked");

                casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('v21'),
                    "handbags",
                    "Product Category (handbags) 'v21' is Correctly Tracked");
            });
    });
casper.then(function() {
    casper.test.comment('Step 3 - Stop the Pixel Tracking Recorder');
    pixelTrackingRecorder.stop();
});

casper.run(function() {
    this.test.done();
    casper.exit();
});