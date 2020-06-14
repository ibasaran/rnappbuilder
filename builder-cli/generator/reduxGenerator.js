var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var Mustache = require('mustache');



exports.generate = (appBasePath, templateFolderPath, jsonData) => {

    return new Promise( (resolve,reject) => {

        const reduxActionFileTemplatePath = path.join(templateFolderPath,'/Redux/actions.tmp');
        const reduxReducerFileTemplatePath = path.join(templateFolderPath,'/Redux/reducers.tmp');
        const pageActionFileTemplatePath = path.join(templateFolderPath,'/Redux/Page/action.tmp');
        const pageReducerFileTemplatePath = path.join(templateFolderPath,'/Redux/Page/reducer.tmp');

        const reduxActionGeneratePath = path.join(appBasePath, '/src/store/actions.js');
        const reduxReducersGeneratePath = path.join(appBasePath, '/src/store/reducers.js');


        fs.readFile(reduxActionFileTemplatePath, function (err, data) {
            if (err) console.log(err);
            Mustache.tags = [ '<%', '%>' ];
            var output = Mustache.render(data.toString(), jsonData);
            fs.writeFile(reduxActionGeneratePath, output, err => {
                if(err) {
                    console.log('Error occured when writing page file!!!');
                    reject();
                } else {
                    fs.readFile(reduxReducerFileTemplatePath, function (err, data) {
                        if (err) console.log(err);
                        Mustache.tags = [ '<%', '%>' ];
                        var output = Mustache.render(data.toString(), jsonData);
                        fs.writeFile(reduxReducersGeneratePath, output, err => {
                            if(err) {
                                console.log('Error occured when writing page file!!!');
                                reject();
                            } else {
                                jsonData.pages.forEach( (pageJson, i ) => {
                                    const pageActionFileGeneratePath = path.join(appBasePath, '/src/pages/', pageJson.name,   'action.js');
                                    const pageReducerFileGeneratePath = path.join(appBasePath, '/src/pages/', pageJson.name,   'reducer.js');
                                    
                                    fs.readFile(pageActionFileTemplatePath, function (err, data) {
                                        if (err) console.log(err);
                                        Mustache.tags = [ '<%', '%>' ];
                                        var output = Mustache.render(data.toString(), pageJson);
                                        fs.writeFile(pageActionFileGeneratePath, output, err => {
                                            if(err) {
                                                console.log('Error occured when writing page file!!!');
                                                reject();
                                            } else {
                                                fs.readFile(pageReducerFileTemplatePath, function (err, data) {
                                                    if (err) console.log(err);
                                                    Mustache.tags = [ '<%', '%>' ];
                                                    var output = Mustache.render(data.toString(), pageJson);
                                                    fs.writeFile(pageReducerFileGeneratePath, output, err => {
                                                        if(err) {
                                                            console.log('Error occured when writing page file!!!');
                                                            reject();
                                                        } else {
                                                            resolve();
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    });
                                });
                            }
                        });
                    });
                }
            });
        });
    });

}