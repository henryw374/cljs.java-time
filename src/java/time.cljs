(ns java.time
  (:require [cljsjs.js-joda]))

(def Period (.. js/JSJoda -Period))
(def Instant (.. js/JSJoda -Instant))
(def Duration (.. js/JSJoda -Duration))
(def LocalDate (.. js/JSJoda -LocalDate))
(def LocalTime (.. js/JSJoda -LocalTime))
(def ZonedDateTime (.. js/JSJoda -ZonedDateTime))
(def LocalDateTime (.. js/JSJoda -LocalDateTime))
(def Year (.. js/JSJoda -Year))
(def YearMonth (.. js/JSJoda -YearMonth))
(def ZoneId (.. js/JSJoda -ZoneId))
(def DayOfWeek (.. js/JSJoda -DayOfWeek))
(def Month (.. js/JSJoda -Month))
(def Clock (.. js/JSJoda -Clock))
(def ZoneOffset (.. js/JSJoda -ZoneOffset))

;;todo - remove this after js-joda 299 fixed
(set! (.-valueOf Month) (fn [x] (goog.object.get Month x)))
;; Following are not yet implemented in js-joda https://github.com/js-joda/js-joda/issues/165
(def OffsetDateTime (.. js/JSJoda -ZonedDateTime))
(def OffsetTime (.. js/JSJoda -LocalTime))

