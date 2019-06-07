// create the async.map function and use it to solve learnyounode 9
const myMap = require('./myMap_module.js'),
    http = require('http');

myMap(process.argv.slice(2),
    performUrlGetRequest,
    performUrlGetRequestcallback);


function performUrlGetRequest(url, next) {
    http.get(url, (response) => {
        response.setEncoding("utf8");
        let responseBody = "";
        response.on('data', (chunk) => {
            responseBody += chunk;
        });
        response.on('end', () => {
            next(null, responseBody);
        });
    }).on('error', (e) => {
        next(e)
        return;
    })
}

function performUrlGetRequestcallback(err, responseBodies) {
    if (err) {
        console.error(err);
    }
    responseBodies.forEach(responseBody =>
        console.log(responseBody)
    );
}