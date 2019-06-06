const http = require('http'),
    async = require('async'),
        url = process.argv[2];


let responseBody = "";
let count = 0;
async.whilst(
    isNotMeerkat,
    sendGetRequest,
    (err, iterations) => {
        if (err) {
            console.error(err)
            return;
        };
        console.log(iterations);
    }
)


function isNotMeerkat() {
    return (!responseBody.includes('meerkat'));
}

function sendGetRequest(callback) {
    count++;
    responseBody = '';
    http.get(url, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            responseBody += chunk;
        })
        response.on('end', () => {
            callback(null, count);
        })
    }).on('error', (e) => {
        callback(e)
        return;
    });

}