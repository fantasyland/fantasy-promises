var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),
    
    combinators = require('fantasy-combinators'),
    Identity = require('fantasy-identities'),
    Promise = require('../fantasy-promises'),

    identity = combinators.identity;

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
        function(a) {
            var promise = Promise.of(a).extend(
                function(x) {
                    return x.extract().toUpperCase();
                }
            );
            return promise.extract() === a.toUpperCase();
        },
        [String]
    )
};
