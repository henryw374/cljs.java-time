(ns java.time.format
  (:require [js-joda]))

(def DateTimeFormatter (.. js/JSJoda -DateTimeFormatter))
(def ResolverStyle (.. js/JSJoda -ResolverStyle))
