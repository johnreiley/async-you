const http = require('http'),
    async = require('async')


async.map(
    process.argv.slice(2),
    performGetRequest,
    displayResponseBodyCallback
)


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