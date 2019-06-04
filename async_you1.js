const fs = require('fs'),
    http = require('http'),
    asynclib = require('async')


asynclib.waterfall([
    readFileContents,
    performUrlGetRequest
], runAsyncWaterfallCallback);


function runAsyncWaterfallCallback(err, responseBody) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(responseBody);
}

function readFileContents(callback) {
    const filepath = process.argv[2];

    let url = '';
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
            callback(null, rawData);
        })
    }).on('error', (e) => {
        callback(e)
        return;
    });
}