/*initialization for robot*/

phantom.page.injectJs(ROOT_Path +'/casperCustomScripts/injection.js');
var injector = new injection();

injector.loadTools(phantom.page,ROOT_Path);
injector.loadPageObjects(phantom.page,ROOT_Path);
injector.loadEvents(phantom.page,ROOT_Path);

var pixelTrackingRecorder = new pixelTrackingRecorder();
var toolBox= new toolBox();
var casperEvents= new casperEvents();

casperEvents.declareOnRessourceReceived(casper,pixelTrackingRecorder);
