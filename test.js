var Promise = require('./index'),
    fs = require('fs');

exports.testReadFile = function(test) {
    var promise = new Promise(function(resolve, reject) {
        fs.readFile(__filename, 'utf8', function(error, data) {
            if(error) return reject(error);
            resolve(data);
        });
    });

    promise.fork(function(data) {
        test.ok(true);
        test.done();
    });
};

exports.testOf = function(test) {
    var promise = Promise.of(41);
    promise.fork(function(data) {
        test.equal(41, data);
        test.done();
    });
};


exports.testChainOf = function(test) {
    var promise = Promise.of(41).chain(function(a) { return Promise.of(a + 1); });
    promise.fork(function(data) {
        test.equal(42, data);
        test.done();
    });
};

exports.testMap = function(test) {
    var promise = Promise.of(41).map(function(a) { return a + 1; });
    promise.fork(function(data) {
        test.equal(42, data);
        test.done();
    });
};

exports.testJoin = function(test) {
    var promise = Promise.of(Promise.of(42)).chain(function(a) { return a; });
    promise.fork(function(data) {
        test.equal(42, data);
        test.done();
    });
};

exports.testNodeCall = function(test) {
   var node = require('./node');
   var promise = node.call(fs.readFile,__filename, 'UTF-8');
   promise.fork(function(data) {
       test.equal(true, data.indexOf("exports.testNode = function(test)") != -1);
       test.done();
   });
};

exports.testNodeApply = function(test) {
   var node = require('./node');
   var promise = node.apply(fs.readFile, [__filename, 'UTF-8']);
   promise.fork(function(data) {
       test.equal(true, data.indexOf("exports.testNode = function(test)") != -1);
       test.done();
   });
};
