
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var navGenerator = require('./navigationGenerator');
var ncp = require('ncp').ncp;
var pageGenerator = require('./pageGenerator.js');
var reduxGenerator = require('./reduxGenerator');
var componentGenerator = require('./componentGenerator');

const installDependencies =   () => {
    return new Promise(  (resolve,reject) => {
        const { spawn } = require('child_process');
        const renameJob = spawn('yarn', ['install']);
        
        
        renameJob.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });

        renameJob.stderr.on('data', data => {
            //reject();
        });

        renameJob.on('close', (code) => {
            console.log("Api install finished...");
            resolve();
        });
    });
}

const renameCopiedProject = (appBasePath,name) => {
    return new Promise( (resolve, reject) => {
        const { spawn } = require('child_process');
        const renameJob = spawn('npx', ['react-native-rename',name]);
        //process.chdir(appBasePath);

        renameJob.stdout.on('data', (data) => {
            console.log(`rename: ${data}`);
        });

        renameJob.stderr.on('data', data => {
            console.log('Error occured when rename')
            //reject();
        }); 

        renameJob.on('close', async (code) => {
            console.log("Rename finished...");
            resolve();
        });
    });
}

const create = (name, uiPath, appBasePath,jsonData,templatesPath) => {
 // copy template
    ncp(uiPath, appBasePath , async (err) => {
        if(err){
            if (!err.toString().includes('no such file') && !err.toString().includes('Cannot')) {
                console.log('copy error : ' + err)
            }
        }
        console.log('Successfully copied. Renaming project...');

        // Go to copied project dir
        process.chdir(appBasePath);

        // rename copied template with project name
        renameCopiedProject(appBasePath,name).then(() => {
            // install dependensies
            console.log('Installing dependencies')
            installDependencies().then( () => {
                console.log('Install app finished.');

                pageGenerator.generate(appBasePath,templatesPath, jsonData).then( () => {
                    console.log('Successfully genrated pages file.');
                    navGenerator.generate(appBasePath,templatesPath, jsonData).then( () => {
                        console.log('Successfully genrated navigation file.')
                    }).catch( () => console.log('ERROR WHEN GENERATING NAVIGATION FILE!!!'));
                }).catch( () => console.log('ERROR WHEN GENERATING PAGE FILE!!!'));

                
            }).catch( err => console.log(err));
        }).catch( err => console.log(err)); 
    });
}


const update = (appBasePath,jsonData,templatesPath) => {
    pageGenerator.generate(appBasePath,templatesPath, jsonData).then( () => {
        console.log('Successfully genrated pages file.');
        navGenerator.generate(appBasePath,templatesPath, jsonData).then( () => {
            console.log('Successfully genrated navigation file.');
            reduxGenerator.generate(appBasePath,templatesPath, jsonData).then(() => {
                console.log('Successfully genrated redux file.');
                componentGenerator.generate(appBasePath,templatesPath, jsonData).then( () => {
                    console.log('Component generated success');
                }).catch( () => console.log('ERROR OCCURED GENERATING COMPONENT'));
            }).catch( () => console.log('ERROR OCCURED GENERATING REDUX'));
        }).catch( () => console.log('ERROR WHEN GENERATING NAVIGATION FILE!!!'));
    }).catch( () => console.log('ERROR WHEN GENERATING PAGE FILE!!!'));

}

exports.generate = async (isCreate,name, jsonFilePath) => {

    let appBasePath = path.join(__dirname, '../tmp/',name);
    let appTemplatesPath = path.join(__dirname,'../app_templates');
    let uiPath = path.join(appTemplatesPath, '/nbTemplate');
    let templatesPath = path.join(__dirname,'../templates');
    let jsonData =  JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));


    if (isCreate) {
        console.log('Copying template...');
        create(name, uiPath, appBasePath,jsonData,templatesPath);
    } else {
        update(appBasePath,jsonData,templatesPath);
    }

   

}