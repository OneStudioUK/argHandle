/**
 * Module to parse commandline-args and options.
 * @module arghandle
 */
const _ = require('underscore');

// Exports
module.exports = ArgHandle;

/**
 * @Constructor
 * @param {object} options - defines the options for the argument parser
 * @param {number} options.startIndex - index to start parsing arguments
 * @param {array} options.argv - command line arguments from the system
 * @param {array} options.definedArgs - an array of custom argument handlers
 */
function ArgHandle(options) {
	options = options || {};
	// create a index to store the itteration
	this.startIndex = options.startIndex || 2;
	// argv
	this.argv = options.argv || [];
	// create an array of args permitted
	this.definedArgs = options.definedArgs || [];
	
	// add default help args
	this.definedArgs.push({
		keys: ['--help', '-h'],
		method: function (self) {
			// log all the commands to the terminal [this.args]
			console.log("\nUsage: script <command> \n");
			console.log("Available commands:");
			for (var argObjectIndex in self.definedArgs) {
				var argObject = self.definedArgs[argObjectIndex];
				console.log(" -", argObject.description);
				console.log("    Usage: ", JSON.stringify(argObject.keys), "\n")
			};
			
		},
		description: 'This argument shows the list of arguments available'
	});
}

/**
 * Concat custom argument handlers
 * @param {array} argObjectArray - an array of custom argument handlers
 */
ArgHandle.prototype.concat = function (argObjectArray) {
	// append customArgs to array
	this.definedArgs = this.definedArgs.concat(argObjectArray);
}

/**
 * Push custom argument handler
 * @param {object} argObject - custom argument handler
 */
ArgHandle.prototype.push = function (argObject) {
	// append customArgs to array
	this.definedArgs.push(argObject);
}

/**
 * Gets the next argument from argv
 * @return {string} argument
 */
ArgHandle.prototype.getNext = function() {
	this.index++;
	return this.argv[this.index];
}

/**
 * Starts to process the arguments and sent to the custom even handlers
 * @param  {system.argv} argv - command line arguments from the system
 * @return {bool} status of processing arguments [false == failure]
 */
ArgHandle.prototype.process = function (argv) {
	// store the arguments
	this.argv = argv || this.argv;
	// reset index
	this.index = this.startIndex;
	// Process enviromental variables
	for (var argl = this.argv.length; this.index < argl; this.index++) {
		var arg = this.argv[this.index],
			argObject = _.find(this.definedArgs, function (object) {
				if (object.keys.indexOf(arg) > -1) {
					return object;
				}
			});

		if (!argObject) {
			console.error('Undefined argument', arg);
			return false;
		}

		argObject.method(this)
	}
	return true;
}