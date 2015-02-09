# argHandle
Library to parse commandline-args and options.

# Usage
##Install
```
npm install arghandle
```
##Implementation
Require this module into your project
```
const arghandle = require('arghandle');
```

You can test this by running 
```
node yourscript.js --help
```
This is a reserved keyword. This will show all the handelers that have been defined

###Defining custom argument handlers
A handler object should be designed like the following:
```
{
    keys: ['--port', '-P'], // e.g. node script.js [--port|-P] 8080
    method: function (self) {
        console.log(self.getNext()); // 8080
    },
    description: 'Set application listning port'
}
```

Their are two methods to append your argument handlers.
####Concating an array of handlers
```
var appConfig = {
    debug: false,
    port: 8080,
    hostname: 'localhost'
};

arghandle.concat([
    {
        keys: ['--debug', '-D'],
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
```
####Appending a single handler
```
arghandle.push({
    keys: ['--hostname', '-H'],
    method: function (self) {
        appConfig.hostname = self.getNext();
    },
    description: 'Set application listning hostname'
});
```

####Defining the start position for arguments
```
arghandle.ignoreFirstN(2);
```

###Processing the arguments
This is done by calling the method as follows
```
arghandle.process(process.argv);
```
This will return false if an undefined argument is sent
