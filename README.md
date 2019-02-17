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

To write cross platform code that calls any getter methods on java.time objects, use the
`cljs.java-time.interop/getter` macro

### Shadow Cljs

The npm library that provides the jsr-310 api is provided via Cljsjs, foreign-libs. To make this work with
Shadow, add the following dependency:

`[thheller/shadow-cljsjs "0.0.16"]`

See [this demo](https://github.com/henryw374/tick-on-shadow-cljs-demo) for more info


## License

Copyright © 2018 Widd Industries

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
