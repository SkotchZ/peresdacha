/**
 * Created by Igor on 15.05.2017.
 */
 var fs    = require('fs');
 var   nconf = require('nconf');
 var   path=require('path');
//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv()
    .env()
    .file({ file: path.join(__dirname,'config.json' )});

module.exports=nconf;