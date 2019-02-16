(ns cljs.java-time.interop
  "unfortunately the java.time getter methods have been renamed in js-joda to remove the 'get' part of the name,
  so in order to write cross platform code that calls a getter, the 'getter' macro can be used"
  #?(:clj
     (:require [net.cgrand.macrovich :as macros])
     :cljs
     (:require-macros 
       [net.cgrand.macrovich :as macros]
       [cljs.java-time.interop :refer [getter]])))

(macros/deftime
  
(defmacro getter 
  "To call .getZone method on object 'zdt' use as follows:
  (cljs.java-time.interop/getter zone zdt)"
  [p t & args]
  (macros/case
    :clj (let [[start & remainder] (str p)]
           (apply list (symbol (str ".get" (clojure.string/upper-case start) (apply str remainder))) t args))
    :cljs (apply list (symbol (str "." p)) t args))))


