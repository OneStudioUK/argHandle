it('Concat Test', function() {
	// require the module
	const arghandle = require('../index');
	arghandle.reset();
	// define start position
	arghandle.ignoreFirstN(5);
	
	// Define properties that will get updated
	var appConfig = {
		debug: false,
		port: 8080
	}

	// concat custom handlers
	arghandle.concat([
	    {
	        keys: ['--yes-debug', '-D'],
	        method: function (self) {
	            appConfig.debug = true;
	        },
	        description: 'Set application to debug'
	    },
	    {
	        keys: ['--port', '-P'],
	        method: function (self) {
	            appConfig.port = self.getNext();
	        },
	        description: 'Set application listning port'
	    }
	]);

	// process arguments & check for any undefined variables
	test.assert(arghandle.process(process.argv) == true);
	// check if the properties have been updated
	test.assert(appConfig.debug == true);
	test.assert(appConfig.port == 1994);
});