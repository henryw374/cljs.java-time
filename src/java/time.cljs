(ns java.time
  (:require [js-joda]))

(def Period (.. js-joda -Period))
(def Instant (.. js-joda -Instant))
(def Duration (.. js-joda -Duration))
(def LocalDate (.. js-joda -LocalDate))
(def LocalTime (.. js-joda -LocalTime))
(def ZonedDateTime (.. js-joda -ZonedDateTime))
(def LocalDateTime (.. js-joda -LocalDateTime))
(def Year (.. js-joda -Year))
(def YearMonth (.. js-joda -YearMonth))
(def ZoneId (.. js-joda -ZoneId))
(def DayOfWeek (.. js-joda -DayOfWeek))
(def Month (.. js-joda -Month))
(def Clock (.. js-joda -Clock))
(def ZoneOffset (.. js-joda -ZoneOffset))

;; Following are not yet implemented in js-joda https://github.com/js-joda/js-joda/issues/165
(def OffsetDateTime (.. js-joda -ZonedDateTime))
(def OffsetTime (.. js-joda -LocalTime))

