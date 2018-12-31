var express=require('express');
var app=express();


const middleware = require('./middleware');
middleware(app);

const route = require('./routes/routes');
route(app);

app.listen(8080);
