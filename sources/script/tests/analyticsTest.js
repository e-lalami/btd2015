f = require('utils').format;
if(casper.cli.has("ROOT_Path")) 											//******************// 
	{ ROOT_Path =casper.cli.get("ROOT_Path")}                               // Set up the test  //
else                                                                        //                  //
		{ROOT_Path = '..'}                                                  //                  //
phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/initialization.js'); //******************//

var searchPage = new SearchPage();                                          //**********************//
var mainMenu = new MainMenu();                                              // Declare page objects //
                                                                            //**********************//
casper.test.comment('Step 1 - Open Google');                                
casper.start('http://google.fr/', function() {                              //***************//
                                                                            // Simulate      //
casper.test.comment('Step 2 - Search for btd conf');                        // the producer  //
searchPage.fillSearchFormAndSubmit('btd conf');                             // interactions  //
                                                                            //               //
casper.test.comment('Step 3 - Choose the first result to btd home page');   //               //
searchPage.chooseFirstResult();                                             //               //
                                                                            //               //
casper.test.comment('Step 4 - Contact BTD team');                           //               //
casper.then(function() {                                                    //               //
	pixelTrackingRecorder.start();                                          //               //
	mainMenu.contact();                                                     //***************//
});


var nbPixelTracking = pixelTrackingRecorder.getNumberOfPixelTracking();

casper.waitFor(function check() {
    return pixelTrackingRecorder.getNumberOfPixelTracking()>nbPixelTracking ;  
	}, 
	function then() {
		casper.test.assertEquals(pixelTrackingRecorder.getValueForTheKeyForTheLastRecord('_ref'),
		"http://www.google.fr/search?hl=fr&source=hp&q=btd+conf&gbv=2&oq=&gs_l=",
		"referer should be propagated");
	}
	);
});
casper.then(function() {
	casper.test.comment('Step 6 - Stop the pixel tracking recorder');
	pixelTrackingRecorder.stop();

});


casper.run(function() {
    this.test.done();
    
});

