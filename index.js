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
function Promise(fork) {
    this.fork = fork;
}

/**
    ### `Promise.of(x)`

    Creates a Promise that contains a successful value.
**/
Promise.of = function(x) {
    return new Promise(function(resolve) {
        resolve(x);
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
        promise.fork(function(a) {
            f(a).fork(resolve);
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
        promise.fork(function(a) {
            resolve(f(a));
        });
    });
};

module.exports = Promise;

/**
    ## Fantasy Land Compatible

    [
      ![](https://raw.github.com/pufuwozu/fantasy-land/master/logo.png)
    ](https://github.com/pufuwozu/fantasy-land)
**/
