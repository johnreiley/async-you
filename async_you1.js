const fs = require('fs'),
    http = require('http'),
    async = require('async'),
        filepath = process.argv[2];


async.waterfall([
    readFileContents(filepath, callback),
    performUrlGetRequest(url, callback)
], runAsyncWaterfallCallback);


function runAsyncWaterfallCallback(err, responseBody) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(responseBody);
}

function readFileContents(filepath, callback) {
    const url = '';
    try {
        url = fs.readFileSync(filepath, 'utf8');
    } catch (e) {
        callback(e)
        return;
    }
    callback(null, url);
}

function performUrlGetRequest(url, callback) {
    http.get(url, function (response) {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => {
            rawData += chunk;
        })
        response.on('end', () => {
            callback(rawData);
        })
    }).on('error', (e) => {
        callback(e)
        return;
    });
}