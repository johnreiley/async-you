const http = require('http'),
    async = require('async')

async.each(process.argv.slice(2),
    performGetRequest,
    function (err) {
        if (err) {
            console.error(err)
        }
    })

function performGetRequest(url, callback) {
    http.get(url, (response) => {
        response.on('data', (chunk) => {})
        response.on('end', () => {
            callback(null);
        })
    }).on('error', (e) => {
        callback(e)
    });
}