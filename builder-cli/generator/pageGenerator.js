var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var Mustache = require('mustache');



exports.generate = (appBasePath, templateFolderPath, jsonData) => {

    return new Promise( (resolve,reject) => {
        const pageFileTemplatePath = path.join(templateFolderPath,'/Page/Page.tmp');
        jsonData.pages.forEach( (pageJson, i ) => {
            const pageFolderPath = path.join(appBasePath, '/src/pages/', pageJson.name);
           
            if (!fs.existsSync(pageFolderPath)){
                fs.mkdirSync(pageFolderPath);
            }

            const pageFileGeneratePath = path.join(appBasePath, '/src/pages/', pageJson.name ,pageJson.name + '.js');
            
            fs.readFile(pageFileTemplatePath, function (err, data) {
                if (err) console.log(err);
                Mustache.tags = [ '<%', '%>' ];
                var output = Mustache.render(data.toString(), pageJson);
                fs.writeFile(pageFileGeneratePath, output, err => {
                    if(err) {
                        console.log('Error occured when writing page file!!!');
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
            // SUBPAGES
            if (pageJson.subpages) {
                pageJson.subpages.forEach( (subpageJson, i ) => {
                    let pageFileGeneratePath = path.join(appBasePath, '/src/pages/', pageJson.name  ,subpageJson.name + '.js');
                   
                    fs.readFile(pageFileTemplatePath, function (err, data) {
                        if (err) console.log(err);
                        Mustache.tags = [ '<%', '%>' ];
                        var output = Mustache.render(data.toString(), subpageJson);
                        fs.writeFile(pageFileGeneratePath, output, err => {
                            if(err) {
                                console.log('Error occured when writing page file!!!');
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