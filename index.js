var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen('3003','0.0.0.0',function(){
   console.log('started on port 3003') ;
});