# Fantasy Promises

This library implements purely functional, monadic promises.

## `Promise(fork)`

Promise is a constructor which takes a `fork` function. The `fork`
function takes two arguments:

    fork(resolve, reject)

Both `resolve` and `reject` are side-effecting callbacks.

### `fork(resolve, reject)`

The `resolve` callback gets called on a "successful" value. The
`reject` callback gets called on a "failure" value.

### `Promise.of(x)`

Creates a Promise that contains a successful value.

### `Promise.error(x)`

Creates a Promise that contains a failure value.

### `chain(f)`

Returns a new promise that evaluates `f` when the current promise
is successfully fulfilled. `f` must return a new promise.

### `reject(f)`

Returns a new promise that evaluates `f` when the current promise
fails. `f` must return a new promise.

### `map(f)`

Returns a new promise that evaluates `f` on a value and passes it
through to the resolve function.

## Fantasy Land Compatible

[
  ![](https://raw.github.com/pufuwozu/fantasy-land/master/logo.png)
](https://github.com/pufuwozu/fantasy-land)
