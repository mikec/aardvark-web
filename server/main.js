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

    if (fileExt == 'js' || fileExt == 'css' ||
            fileExt == 'html' || fileExt == 'jpg' || fileExt == 'png') {
        splittedPath.splice(1, 0, getMinPrefix(config));
    }

    parsedUrl.pathname = splittedPath.join(path.sep);
    req.url = url.format(parsedUrl);

    req.config = config;
    next();
});

app.use('/', express.static(path.join(rootPath, 'app')));

app.get('/:anything', function(req, res) {
    renderIndex(req.config, res);
});

app.get('/', function(req, res) {
    renderIndex(req.config, res);
});

app.use(function(req, res) {
    res.redirect('/');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});

function renderIndex(config, res) {
    renderView(config, res, 'index', {
        aardvarkServerUrl: process.env.AARDVARK_SERVER_URL
    });
}

function renderView(config, res, view, data) {
    res.render(getMinPrefix(config) + '/views/' + view, data);
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
