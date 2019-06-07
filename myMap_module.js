module.exports = function myMap(array, iteratee, callback) {
    let results = array.map(() => "")

    array.forEach((element, i) => {
        iteratee(element, (err, result) => {
            if (err) {
                callback(err)
                return;
            }
            results[i] = result;
            if (!results.includes("")) {
                callback(null, results)
            }
        });
    });
}