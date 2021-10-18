(ns java.time.temporal
  (:require [goog.object]
            ["@js-joda/core" :as js-joda]))

(def TemporalAdjusters (goog.object/get js-joda "TemporalAdjusters"))
(def Temporal (goog.object/get js-joda "Temporal"))
(def TemporalAmount (goog.object/get js-joda "TemporalAmount"))
(def ChronoUnit (goog.object/get js-joda "ChronoUnit"))
(def ChronoField (goog.object/get js-joda "ChronoField"))
(def IsoFields (goog.object/get js-joda "IsoFields"))
(def TemporalAccessor (goog.object/get js-joda "TemporalAccessor"))
(def TemporalAdjuster (goog.object/get js-joda "TemporalAdjuster"))
(def TemporalQuery (goog.object/get js-joda "TemporalQuery"))
(def TemporalQueries (goog.object/get js-joda "TemporalQueries"))
(def TemporalUnit (goog.object/get js-joda "TemporalUnit"))
(def ValueRange (goog.object/get js-joda "ValueRange"))
(def TemporalField (goog.object/get js-joda "TemporalField"))
