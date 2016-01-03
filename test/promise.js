const λ = require('fantasy-check/src/adapters/nodeunit');
const applicative = require('fantasy-check/src/laws/applicative');
const functor = require('fantasy-check/src/laws/functor');
const monad = require('fantasy-check/src/laws/monad');
    
const {identity} = require('fantasy-combinators');
const Identity = require('fantasy-identities');
const Promise = require('../fantasy-promises');

function run(a) {
    return Identity.of(a.fork(identity));
}

exports.promise = {

    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(Promise, run),
    'Identity (Applicative)': applicative.identity(λ)(Promise, run),
    'Composition (Applicative)': applicative.composition(λ)(Promise, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Promise, run),
    'Interchange (Applicative)': applicative.interchange(λ)(Promise, run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(Promise.of, run),
    'Identity (Functor)': functor.identity(λ)(Promise.of, run),
    'Composition (Functor)': functor.composition(λ)(Promise.of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(Promise, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Promise, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Promise, run),
    'Associativity (Monad)': monad.associativity(λ)(Promise, run),

    // Manual tests
    'when testing extend should return correct value': λ.check(
        (a) => {
            const promise = Promise.of(a).extend((x) => x.extract().toUpperCase());
            return promise.extract() === a.toUpperCase();
        },
        [String]
    )
};
