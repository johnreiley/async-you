const http = require('http'),
    async = require('async'),
    url = new URL(process.argv[2]);


async.reduce(['one', 'two', 'three'], 0, function (acc, getSequence, callback) {
    url.search = "number=" + getSequence;
    http.get(url.toString(), function (response) {
        response.setEncoding('utf8');
        let responseBody = '';
        response.on('data', (chunk) => {
            responseBody += chunk;
        })
        response.on('end', () => {
            callback(null, acc + Number(responseBody));
        })
    }).on('error', (e) => {
        callback(e)
        return;
    });

}, function (err, sum) {
    if (err) console.error(err)
    console.log(sum);
})