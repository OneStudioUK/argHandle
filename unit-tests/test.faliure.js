it('Faliure Test', function() {
	// require the module
	const arghandle = require('../index');
	arghandle.reset();
	// define start position
	arghandle.ignoreFirstN(5);
	
	// process arguments & check for any undefined variables
	test.assert(arghandle.process(process.argv) == false);
});