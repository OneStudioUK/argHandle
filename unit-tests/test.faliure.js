it('Faliure Test', function() {
	// require the module
	var arghandle = require('../index'),
		handler = new arghandle();
	
	// process arguments & check for any undefined variables
	test.assert(handler.process(process.argv) == false);
});