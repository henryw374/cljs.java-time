# cljs.java.time

A Clojurescript library that provides the jsr-310 (java.time) api.

Note: this is not a wrapper library, meaning there are not additional Clojurescript
functions, only what java.time provides. 

Underneath this lib is a pure JS implementation of java.time. This extends that by
adding Clojurescript's equivalence, hash and comparison protocols to the java.time
domain objects, providing externs and having the packages of java.time be mirrored by namespaces.
 
## Related Libraries

[cljc.java-time](https://github.com/henryw374/cljc.java-time) offers a one for one mapping of the classes and methods from
java.time into a Clojure(Script) library 
 
Using that library is [tick](https://clojars.org/tick), an intuitive Clojure(Script) library for dealing with time, intended as a replacement for clj-time. 

[time-literals](https://github.com/henryw374/time-literals) is a Clojure(Script) library which provides tagged literals for objects from jsr-310 domain and depends on this library
  
[my talk at Clojure/North 2019](https://www.youtube.com/watch?v=UFuL-ZDoB2U) provides some background

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

### Cross Platform (.cljc) Example

```
(ns foo
  (:require
    #?(:cljs [java.time :refer [LocalDate]])
    [time-literals.read-write]
    [cljs.java-time.interop :as t.i])
   #?(:clj (:import [java.time LocalDate])))
   
   
  (. LocalDate parse "2020-12-01")
  ;=> #time/date"2020-12-01"
  
  (= 
    (. LocalDate parse "2020-12-01")
    (. LocalDate parse "2020-12-01"))
  ; => true  
  
  ; call a getter method
  (let [l (. LocalDate parse "2020-12-01")]
    (t.i/getter dayOfMonth l))
  
```

### Getter Methods
Unfortunately, all java.time getter methods have had the 'get' part of their name removed in the underlying 
 js lib. So instead of 'getNano' method, you have 'nano'. As a workaround, to write cross platform code that calls any getter methods on java.time objects, use the
`cljs.java-time.interop/getter` macro



### Shadow Cljs

The npm library that provides the jsr-310 api is provided via Cljsjs, foreign-libs. To make this work with
Shadow, add the following dependency:

`[thheller/shadow-cljsjs "0.0.16"]`

See [this demo](https://github.com/henryw374/tick-on-shadow-cljs-demo) for more info


## License

Copyright © 2019 Widd Industries

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
