const http = require('http'),
    async = require('async')

const hostname = process.argv[2];
const portNum = process.argv[3];
const options = {
    hostname: hostname,
    port: portNum,
    path: '/users/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

async.series({
    post: sendCreateUserPostRequest,
    get: sendUsersGetRequest
},
    userTaskCallback);


function sendCreateUserPostRequest(callback) {
    async.times(5, function (n, next) {
        http.request(options, function (response) {

        }).end(JSON.stringify({ user_id: n + 1 }))
            .on('error', (e) => {
                callback(e);
            });
    }, callback(null));
}

function sendUsersGetRequest(callback) {
    options.method = 'GET';
    options.path = '/users';
    http.get(options, function (res) {
        res.setEncoding('utf8')
        let responseBody = '';
        res.on('data', (chunk) => {
            responseBody += chunk;
        })
        res.on('end', () => {
            callback(null, responseBody);
        })
    }).on('error', (e) => {
        callback(e)
        return;
    });
}

function userTaskCallback(err, result) {
    if (err) console.error(err);
    console.log(result.get);
}
