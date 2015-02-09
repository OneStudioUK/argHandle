const _ = require('underscore');

function ArgHandle() {
	// create a index to store the itteration
	this.startIndex = 2;
	// argv
	this.argv = [];
	// create an array of args permitted
	this.definedArgs = [];
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
	
	// reset all parameteres
	reset();
}

module.exports = new ArgHandle();

function reset() {
	this.index = this.startIndex;
	this.argv = [];
	this.definedArgs = [];

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

ArgHandle.prototype.reset = reset;

ArgHandle.prototype.ignoreFirstN = function (n) {
	this.startIndex  = n;
}

ArgHandle.prototype.concat = function (argObjectArray) {
	// append customArgs to array
	this.definedArgs = this.definedArgs.concat(argObjectArray);
}

ArgHandle.prototype.push = function (argObject) {
	// append customArgs to array
	this.definedArgs.push(argObject);
}

ArgHandle.prototype.getNext = function() {
	this.index++;
	return this.argv[this.index];
}

ArgHandle.prototype.process = function (argv) {
	// store the arguments
	this.argv = argv;
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