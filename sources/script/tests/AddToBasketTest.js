// var casper = require('casper').create({
//   verbose: true,
//    logLevel: 'debug'
// })
/*=======================================================================================*/
/* Add to Basket Test: The goal of this test is start pixel traking juste before         */
/* user clicks on 'Add To Basket' and make sure that related evente are properly tracked */
/*=======================================================================================*/
f = require('utils').format;


if (casper.cli.has("ROOT_Path")) {
    ROOT_Path = casper.cli.get("ROOT_Path");
} else {
    ROOT_Path = '..';
}
phantom.page.injectJs(ROOT_Path + '/casperCustomScripts/initialization.js');


casper.test.comment('Step 0 - Start the Pixel Tracking Recorder');

//startWaRecorder();
pixelTrackingRecorder.start();



var x = require('casper').selectXPath;
casper.test.comment('Step 1 - User Visit Speedy Bandouliere 25 Monogram Canvas - Handbags | LOUIS VUITTON UK');
casper.start('http://uk.louisvuitton.com/eng-gb/products/speedy-bandouliere-25-monogram-008774',



    function() {
        casper.test.comment('Step 2 - User Add  Product to Shopping Card');
        casper.waitForSelector("#addToCartSubmit",
            function success() {
                this.click("#addToCartSubmit");
                nbPixelTracking = pixelTrackingRecorder.getNumberOfPixelTracking();
            },
            function fail() {
                casper.log('can not add to cart', 'debug');
            });
        casper.then(function() {
            toolBox.waitForPixelTracking(casper, pixelTrackingRecorder, nbPixelTracking);
            casper.then(function check() {
                casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('events'), "event56,scAdd", "Add to Basket 'event56,scAdd' events should be tracked");
            });
        });


        casper.test.comment('Step 3 - User Close Button Modal');
        casper.waitForSelector("#closeButtonModal",
            function success() {
                this.click("#closeButtonModal");
                nbPixelTracking = pixelTrackingRecorder.getNumberOfPixelTracking();
            },
            function fail() {
                casper.log('can not close the box', 'debug');
            });

        casper.test.comment('Step 4 - User View Shopping Card Details');
        casper.waitForSelector(x("//a[normalize-space(text())='View details']"),
            function success() {
                this.click(x("//a[normalize-space(text())='View details']"));
            },
            function fail() {
                casper.log('can not view details', 'debug');
            });
        //check the pixel tracking

        casper.then(function() {
            toolBox.waitForPixelTracking(casper, pixelTrackingRecorder, nbPixelTracking);

            casper.then(function check() {
                casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('events'), "scOpen", "Shopping Card Open event should be tracked");
            });

            casper.then(function check() {
                casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('products'), "handbags;M41113;1;820.00;;", "Products (category, sku, quantity, price) should be tracked when user view Shopping Card Details");
            });


        });

    });
casper.then(function() {
    casper.test.comment('Step 5 - Stop the Pixel Tracking Recorder');
    pixelTrackingRecorder.stop();
});

casper.run(function() {
    this.test.done();
    casper.exit();
});
