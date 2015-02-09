it('definedArgs Test', function() {
	// require the module
	var arghandle = require('../index'),
		handler = new arghandle({
			startIndex: 5,
			definedArgs: [
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
			],
			argv: process.argv
		});
	
	// Define properties that will get updated
	var appConfig = {
		debug: false,
		port: 8080
	}

	// process arguments & check for any undefined variables
	test.assert(handler.process() == true);
	// check if the properties have been updated
	test.assert(appConfig.debug == true);
	test.assert(appConfig.port == 1994);
});