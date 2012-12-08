

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

    build.buildFile();
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
  },

  buildFile : function(){
    var fs = require('fs'),
        data = build.writeableData,
        filename = build.configData.path + build.configData.filename,
        encoding = build.encoding;

    console.log("Writting data in: " + build.configData.path + build.configData.filename);
    //console.log("writeableData 2: " + build.writeableData);

    fs.writeFileSync(filename, data, encoding);
  }
};


//Init the app
build.init();