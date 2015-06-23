function injection() {
	
	this.loadTools = function(phantomPage,rootPath) {
	phantomPage.injectJs(rootPath + '/waTools/pixelTrackingRecorder.js');
	phantomPage.injectJs(rootPath + '/waTools/toolBox.js');
	//phantomPage.injectJs(domain+'/path/to/jquery.js');
	};

	this.loadPageObjects =function(phantomPage,rootPath){
	phantomPage.injectJs(rootPath +'/pageObject/SearchPage.js');
	phantomPage.injectJs(rootPath + '/pageObject/MainMenu.js');
	phantomPage.injectJs(rootPath + '/pageObject/watch.js');
	phantomPage.injectJs(rootPath + '/pageObject/home.js');
	};
	
	this.loadEvents = function(phantomPage,rootPath){
	phantomPage.injectJs(rootPath + '/casperCustomScripts/casperEvents.js');
	
	};
	
}
