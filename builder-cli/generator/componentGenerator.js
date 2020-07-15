var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var Mustache = require('mustache');

exports.generate = (appBasePath, templateFolderPath, jsonData) => {
    return new Promise( (resolve,reject) => {
        jsonData.pages.forEach( (pageJson, i ) => {

            if (pageJson.layout) {
                pageJson.layout.map( (row,index) => {
                    const componentTemplatePath = path.join(templateFolderPath,'components',row.component,row.component + '.tmp');
                    const componentGenerateFolderPath = path.join(appBasePath,'src/components',row.name);
                    const componentGeneratePath = path.join(appBasePath,'src/components',row.name,row.name + '.js');

                    if (!fs.existsSync(componentGenerateFolderPath)){
                        fs.mkdirSync(componentGenerateFolderPath);
                    }

                    console.log(componentTemplatePath);

                    fs.readFile(componentTemplatePath, function (err, data) {
                        Mustache.tags = [ '<%', '%>' ];
                        var output = Mustache.render(data.toString(), row.datamap);

                        fs.writeFile(componentGeneratePath, output, err => {
                            if(err) {
                                console.log('Component Generate Error!!!');
                                console.log(err);
                                reject();
                            } else {
                                resolve();
                            }
                        });
                    });

                });
            }
        });
            
    });

}