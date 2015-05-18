f = require('utils').format;
if(casper.cli.has("ROOT_Path")) 											//********************// 
	{ ROOT_Path =casper.cli.get("ROOT_Path")}                               // Prepare the test   //
else                                                                        //                    //
		{ROOT_Path = '..'}                                                  //                    //
phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/initialization.js'); //********************//

casper.test.comment('Step 1 - Launch the pixel tracking recorder');         //*******************//
                                                                            // Start the pixel   //
pixelTrackingRecorder.start();                                              // Tracking          //
nbPixelTracking=pixelTrackingRecorder.getNumberOfPixelTracking();           // Recorder          //
                                                                            //*******************//	
debugger;
casper.test.comment('Step 2 - Visit registration page');                    //*******************//
casper.start('http://btdconf.com/registration/', function() {               // Simulate          //
	                                                                        // Producer          //
	                                                                        // Action            //
                                                                            //*******************//	
casper.waitFor(function check() {
    return pixelTrackingRecorder.getNumberOfPixelTracking()>nbPixelTracking;//*******************//  
	},                                                                      // test              //
	function then() {                                                       //                   //
		casper.test.assertEquals(                                           //                   //
		pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('events')   //                   //
		,"scAdd"                                                            //                   //
		,"add to cart should be tracked");                                  //                   //
	}                                                                       //*******************//
	);
});
casper.then(function() {                                                    //*******************//
	casper.test.comment('Step 3 - Stop the pixel tracking recorder');       // Stop the pixel    //
	pixelTrackingRecorder.stop();                                           // Tracking          //
});                                                                         // Recorder          //
                                                                            //*******************//	
casper.run(function() {
    this.test.done();
});

