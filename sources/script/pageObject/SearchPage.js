function SearchPage() {
	this.fillSearchFormAndSubmit = function(searchTerms) {
		casper.thenEvaluate(function(term) {
		document.querySelector('input[name="q"]').setAttribute('value', term);
		document.querySelector('form[name="f"]').submit();
	}, searchTerms);
	};
	
	this.chooseFisrtResult = function() {
    casper.then(function () {
      this.click('h3.r a');
		});
	};
	
}

