const daggy = require('daggy');
const {identity} = require('fantasy-combinators');
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
const Promise = daggy.tagged('fork');

/**
    ### `Promise.of(x)`

    Creates a Promise that contains a successful value.
**/
Promise.of = function(x) {
    return Promise((resolve) => resolve(x));
};

/**
    ### `ap(x)`

    Returns a new promise that evaluates `f` on a value and passes it
    through to the resolve function.
**/
Promise.prototype.ap = function(a) {
    return Promise((resolve) => {
        return this.fork((f) => a.map(f).fork(resolve));
    });
};

/**
    ### `chain(f)`

    Returns a new promise that evaluates `f` when the current promise
    is successfully fulfilled. `f` must return a new promise.
**/
Promise.prototype.chain = function(f) {
    return Promise((resolve) => {
        return this.fork((a) => f(a).fork(resolve));
    });
};

/**
    ### `map(f)`

    Returns a new promise that evaluates `f` on a value and passes it
    through to the resolve function.
**/
Promise.prototype.map = function(f) {
    return Promise((resolve) => {
        return this.fork((a) => resolve(f(a)));
    });
};

/**
   ### `extract()`

   Executes a promise to get a value.
**/
Promise.prototype.extract = function() {
    return this.fork(identity);
};

/**
   ### `extend(f)`

   Returns a new promise that evaluates `f` over the promise to get a
   value.
**/
Promise.prototype.extend = function(f) {
    return this.map((a) => f(Promise.of(a)));
};

// Export
if (typeof module != 'undefined')
    module.exports = Promise;
