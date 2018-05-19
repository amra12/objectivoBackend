var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');

var mongoose = require('mongoose');
var port = process.env.PORT || 4200;
var UserController = require('./controllers/UserController');
var VocabController = require('./controllers/VocabController');


var databaseConfig = require('./config/database');
const http = require('http');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// connect to MONGODB using mongoose
mongoose.connect(databaseConfig.database);


// bundle FOR MY API ROOT
var apiRoutes = express.Router();

const props = {
    appInfo: {},
    appPort: 4200,
    appHost: '192.168.0.106',
};
const appConfig = require('./appConfig.js').getConfig(props);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('', apiRoutes);

new UserController(apiRoutes);
new VocabController(apiRoutes);

http.createServer(app).listen(appConfig.appPort, '0.0.0.0', function () {
    console.log('APIs on port ' + appConfig.appPort);
});
