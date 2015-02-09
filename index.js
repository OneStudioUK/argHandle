const _ = require('underscore');

function ArgHandle() {
	// create a index to store the itteration
	this.index = 2;
	//argv
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
}

module.exports = new ArgHandle();

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
	// reset index to 2
	this.index = 2;
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