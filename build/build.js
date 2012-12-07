

//The build object
var build = {


  configFile    : '',
  configData    : {},
  encoding      : 'utf8',
  writableData  : '',
  
  //initialize the builder
  init : function(){
    
    build.checkParams();
    
    build.configData = build.readConfigFile();

    build.writeableData = build.readFiles();

  },

  checkParams : function(){
    // Make sure we got a filename on the command line.
    if (process.argv.length < 3) {
      console.log('Usage: node ' + process.argv[1] + ' BUILDER.JSON');
      process.exit(1);
    }

    build.configFile = process.argv[2];

  },

  readConfigFile : function(){
    var fs = require('fs');

    console.log('Reading config file: ' + build.configFile);
    var file = fs.readFileSync(build.configFile, build.encoding);

    configData = JSON.parse(file);
    return configData;
  },

  readFiles : function(){
    var fs = require('fs');
    var writableData = '';

    for (var filename in build.configData.files){
      console.log('Reading: ' + build.configData.path + build.configData.files[filename]);
      writableData += fs.readFileSync(build.configData.path + build.configData.files[filename], build.encoding) + '\n';
    }
    return writableData;
  }
};


//Init the app
build.init();

/*
  var newFile = '';
  for(var file in datap.files){
    fs.readFileSync(datap.path + datap.files[file], 'utf8', function(err, data2) {
      if (err) throw err;
      console.log("Leyendo: " + datap.path + datap.files[file]);
      console.log(datap.path + datap.files[file] + " tiene: " + data2);
      newFile += data2;
      if(file == 'outro'){
        createFile(datap.path + datap.filename, newFile);
      }
    }); 
  }

function createFile(file, data){

  console.log("Readed: " + data);
  fs.unlink(file, function (err) {
    if (err) throw err;
    console.log('Successfully deleted ' + file);
  });
  fs.writeFile(file, data, function (err) {
    if (err) throw err;
    console.log("Escribiendo en: " + file);
  });
}*/