# arghandle

Module to parse commandline-args and options.


* * *

## Class: ArgHandle

Module to parse commandline-args and options.

**Parameters**

**options**: `object`, defines the options for the argument parser

**options.startIndex**: `number`, index to start parsing arguments

**options.argv**: `array`, command line arguments from the system

**options.definedArgs**: `array`, an array of custom argument handlers

### arghandle.ArgHandle.concat(argObjectArray) 

Concat custom argument handlers

**Parameters**

**argObjectArray**: `array`, an array of custom argument handlers


### arghandle.push(argObject) 

Push custom argument handler

**Parameters**

**argObject**: `object`, custom argument handler


### arghandle.getNext() 

Gets the next argument from argv

**Returns**: `string`, argument

### arghandle.process(argv) 

Starts to process the arguments and sent to the custom even handlers

**Parameters**

**argv**: `system.argv`, command line arguments from the system

**Returns**: `bool`, status of processing arguments [false == failure]



* * *










