# cljs.java.time

A Clojurescript library that provides the jsr-310 (java.time) api.
 
For a Clojure(Script) api that uses this, checkout the cross-platform [tick](https://clojars.org/tick/versions/0.4.0-alpha) (v 0.4+) library
and for tagged literals that read and print these objects, see [jsr310-tagged-literals](https://clojars.org/jsr310-tagged-literals)

## Usage

get it from [Clojars](https://clojars.org/cljs.java-time) 

```
(require '[java.time :refer [LocalDate]])

(.parse LocalDate "2020-01-01")
```

If you would like to be able to use `=` and `sort` with the java.time objects

```
(require 'cljs.java-time.extend-eq-and-compare)
```

## License

Copyright © 2018 Widd Industries

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
