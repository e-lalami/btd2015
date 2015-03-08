function MainMenu() {	
	this.contact = function() {
    casper.then(function () {
      	this.clickLabel('Contact', 'a');
		});
	};
	
}
