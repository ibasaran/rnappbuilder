
var fs = require('fs');
var fse = require('fs-extra');
var jsonData = require('./samples/sampleApp.json');


for ( page in jsonData.pages) {
    console.log(jsonData.pages[page].componentName);
}

