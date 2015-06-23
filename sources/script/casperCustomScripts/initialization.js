/*initialization for robot*/

phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/injection.js');
var injector = new injection();

injector.loadTools(phantom.page,ROOT_Path);
injector.loadPageObjects(phantom.page,ROOT_Path);
injector.loadEvents(phantom.page,ROOT_Path);

var pixelTrackingRecorder = new pixelTrackingRecorder(casper);
var toolBox= new toolBox();
var casperEvents= new casperEvents();
//var casperExtensions= new casperExtensions();
var x = require('casper').selectXPath;
var domain='publish.rlx-staging.com';
var lastMessageRemote="";

casperEvents.declareOnRessourceReceived(casper,pixelTrackingRecorder);

casper.on('remote.message', function(msg) {
   // casper.log('remote message caught: ' + msg,'info');
    lastMessageRemote=msg;
});

casper.test.on("fail", function(failure) {
    failure.message = "Message : " + failure.message + "\nLine : "+ failure.line + "\nCode : " + failure.lineContents;
});
