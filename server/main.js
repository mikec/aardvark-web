var path = require('path');
var url = require('url');
var express = require('express');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');

var globalConfig = {
    minify: process.env.MINIFY == 'yes' ? true : false
};

var rootPath = path.dirname(__dirname);
var port = Number(process.env.PORT || 9999);
var app = express();

app.set('views', path.join(rootPath, 'server'));
app.engine('html', cons.handlebars);
app.set('view engine', 'html');

app.use(cookieParser());

app.use(function(req, res, next) {
    var config = configFromReq(req);
    var parsedUrl = url.parse(req.url);
    var splittedPath = parsedUrl.pathname.split(path.sep);
    var fileExt = getFileExtension(parsedUrl.pathname);

    if (fileExt == 'js' || fileExt == 'css' || fileExt == 'html') {
        splittedPath.splice(1, 0, getMinPrefix(config));
    }

    parsedUrl.pathname = splittedPath.join(path.sep);
    req.url = url.format(parsedUrl);

    console.log('URL: ' + req.url);

    req.config = config;
    next();
});

app.use('/', express.static(path.join(rootPath, 'app')));

app.get('/:anything', function(req, res) {
    console.log('PARAM');
    renderView(req.config, res, 'index');
});

app.get('/', function(req, res) {
    console.log('RENDER INDEX');
    renderView(req.config, res, 'index');
});

app.use(function(req, res) {
    console.log('REDIRECT');
    res.redirect('/');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});

function renderView(config, res, view) {
    res.render(getMinPrefix(config) + '/views/' + view);
}

function configFromReq(req) {
    var config = {};
    config.minify = req.cookies.minify == 'true' ? true : false;
    return config;
}

function getMinPrefix(conf) {
    return conf.minify || globalConfig.minify ? 'minified' : 'unminified';
}

function getFileExtension(filePath) {
    return filePath.split('.').pop();
}
