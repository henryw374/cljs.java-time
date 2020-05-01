(ns java.time
  (:require ["@js-joda/core" :as js-joda]))

(def Period (.. js-joda -Period))
(def Instant (.. js-joda -Instant))
(def Duration (.. js-joda -Duration))
(def LocalDate (.. js-joda -LocalDate))
(def LocalTime (.. js-joda -LocalTime))
(def ZonedDateTime (.. js-joda -ZonedDateTime))
(def LocalDateTime (.. js-joda -LocalDateTime))
(def MonthDay (.. js-joda -MonthDay))
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

(extend-protocol IComparable
  Period (-compare [x y] (.compareTo x y))
  LocalDate (-compare [x y] (.compareTo x y))
  LocalDateTime (-compare [x y] (.compareTo x y))
  ZonedDateTime (-compare [x y] (.compareTo x y))
  OffsetTime (-compare [x y] (.compareTo x y))
  Instant (-compare [x y] (.compareTo x y))
  OffsetDateTime (-compare [x y] (.compareTo x y))
  LocalTime (-compare [x y] (.compareTo x y))
  Duration (-compare [x y] (.compareTo x y))
  Year (-compare [x y] (.compareTo x y))
  YearMonth (-compare [x y] (.compareTo x y))
  ZoneId (-compare [x y] (.compareTo x y))
  DayOfWeek (-compare [x y] (.compareTo x y))
  Month (-compare [x y] (.compareTo x y))
  MonthDay (-compare [x y] (.compareTo x y)))
  

(extend-protocol IEquiv
  Period (-equiv [x y] (.equals x y))
  LocalDate (-equiv [x y] (.equals x y))
  LocalDateTime (-equiv [x y] (.equals x y))
  ZonedDateTime (-equiv [x y] (.equals x y))
  OffsetTime (-equiv [x y] (.equals x y))
  Instant (-equiv [x y] (.equals x y))
  OffsetDateTime (-equiv [x y] (.equals x y))
  LocalTime (-equiv [x y] (.equals x y))
  Duration (-equiv [x y] (.equals x y))
  Year (-equiv [x y] (.equals x y))
  YearMonth (-equiv [x y] (.equals x y))
  ZoneId (-equiv [x y] (.equals x y))
  DayOfWeek (-equiv [x y] (.equals x y))
  Month (-equiv [x y] (.equals x y))
  MonthDay (-equiv [x y] (.equals x y)))
  

(extend-protocol IHash
  Period (-hash [x] (.hashCode x))
  LocalDate (-hash [x] (.hashCode x))
  LocalDateTime (-hash [x] (.hashCode x))
  ZonedDateTime (-hash [x] (.hashCode x))
  OffsetTime (-hash [x] (.hashCode x))
  Instant (-hash [x] (.hashCode x))
  OffsetDateTime (-hash [x] (.hashCode x))
  LocalTime (-hash [x] (.hashCode x))
  ; todo - do a PR with the hashCode methods to js-joda
  ; note - impls copied from java.time
  MonthDay (-hash [x] (+ (.dayOfMonth x)
                        (bit-shift-left
                          (.value (.month x)) 6)))
  Duration (-hash [x]
             (+ (* (.nano x) 51)
               (int
                 (bit-xor
                   (.seconds x)
                   (unsigned-bit-shift-right (.seconds x) 32)))))
  Year (-hash [x] (.value x))
  YearMonth (-hash [x] (bit-xor
                         (.year x)
                         (bit-shift-left (.monthValue x) 27)))
  ZoneId (-hash [x] (.hashCode x))
  DayOfWeek (-hash [x] (.value x))
  Month (-hash [x] (.value x)))

