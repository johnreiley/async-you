const http = require('http'),
    async = require('async')


async.series({
    requestOne: function (callback) {
        performGetRequest(process.argv[2], callback);
    },
    requestTwo: function (callback) {
        performGetRequest(process.argv[3], callback);
    }
}, displayResponseBodyCallback)


function displayResponseBodyCallback(err, responseBodies) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(responseBodies);
}

function performGetRequest(url, callback) {
    http.get(url, (response) => {
        response.setEncoding('utf8')
        let responseBody = '';
        response.on('data', (chunk) => {
            responseBody += chunk;
        })
        response.on('end', () => {
            callback(null, responseBody);
        })
    }).on('error', (e) => {
        callback(e)
        return;
    });
}