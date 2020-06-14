var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var Mustache = require('mustache');



exports.generate = (appBasePath, templateFolderPath, jsonData) => {

    return new Promise( (resolve,reject) => {
        const navigationFileGeneratePath = path.join(appBasePath, '/src/navigation/Navigation.js');
        const navigationFileTemplatePath = path.join(templateFolderPath,'/Navigation/Navigation.tmp');
        
        fs.readFile(navigationFileTemplatePath, function (err, data) {
            console.log('readded file')
            if (err) console.log(err);
            Mustache.tags = [ '<%', '%>' ];
            var output = Mustache.render(data.toString(), jsonData);
            
            fs.writeFile(navigationFileGeneratePath, output, err => {
                if(err) {
                    console.log('Error occured when writing navigation file!!!');
                    reject();
                } else {
                    resolve();
                }
            });
        });
    });
}