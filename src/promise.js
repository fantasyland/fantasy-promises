var daggy = require('daggy');
/**
    # Fantasy Promises

    This library implements purely functional, monadic promises.
**/

/**
    ## `Promise(fork)`

    Promise is a constructor which takes a `fork` function. The `fork`
    function takes one argument:

    ### `fork(resolve)`

    The `resolve` callback gets called on a value.
**/
var Promise = daggy.tagged('fork');

/**
    ### `Promise.of(x)`

    Creates a Promise that contains a successful value.
**/
Promise.of = function(x) {
    return new Promise(function(resolve) {
        return resolve(x);
    });
};

/**
    ### `chain(f)`

    Returns a new promise that evaluates `f` when the current promise
    is successfully fulfilled. `f` must return a new promise.
**/
Promise.prototype.chain = function(f) {
    var promise = this;
    return new Promise(function(resolve) {
        return promise.fork(function(a) {
            return f(a).fork(resolve);
        });
    });
};

/**
    ### `map(f)`

    Returns a new promise that evaluates `f` on a value and passes it
    through to the resolve function.
**/
Promise.prototype.map = function(f) {
    var promise = this;
    return new Promise(function(resolve) {
        return promise.fork(function(a) {
            return resolve(f(a));
        });
    });
};

/**
   ### `extract()`

   Executes a promise to get a value.
**/
Promise.prototype.extract = function() {
    return this.fork(function(data) {
        return data;
    });
};

/**
   ### `extend(f)`

   Returns a new promise that evaluates `f` over the promise to get a
   value.
**/
Promise.prototype.extend = function(f) {
    var promise = this;
    return promise.map(function(a) {
        return f(Promise.of(a));
    });
};

// Transformer
Promise.PromiseT = function(M) {
    var PromiseT = daggy.tagged('run');
    PromiseT.of = function(x) {
        return PromiseT(function(resolve) {
            resolve(M.of(x));
        });
    };
    PromiseT.prototype.chain = function(f) {
        var promise = this;
        return PromiseT(function(resolve) {
            promise.run(function(result) {
                resolve(result.map(f));
            });
        });
    };
    PromiseT.prototype.fork = function(f) {
        return this.run(f);
    };
    PromiseT.prototype.map = function(f) {
        return this.chain(function(a) {
            return f(a);
        });
    };
    return PromiseT;
};

exports = module.exports = Promise;
