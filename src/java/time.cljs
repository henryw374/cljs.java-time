(ns java.time
  (:require ["@js-joda/core" :as js-joda]))

(def Period (goog.object/get js-joda "Period"))
(def Instant (goog.object/get js-joda "Instant"))
(def Duration (goog.object/get js-joda "Duration"))
(def LocalDate (goog.object/get js-joda "LocalDate"))
(def LocalTime (goog.object/get js-joda "LocalTime"))
(def ZonedDateTime (goog.object/get js-joda "ZonedDateTime"))
(def LocalDateTime (goog.object/get js-joda "LocalDateTime"))
(def MonthDay (goog.object/get js-joda "MonthDay"))
(def Year (goog.object/get js-joda "Year"))
(def YearMonth (goog.object/get js-joda "YearMonth"))
(def ZoneId (goog.object/get js-joda "ZoneId"))
(def DayOfWeek (goog.object/get js-joda "DayOfWeek"))
(def Month (goog.object/get js-joda "Month"))
(def Clock (goog.object/get js-joda "Clock"))
(def ZoneOffset (goog.object/get js-joda "ZoneOffset"))
(def OffsetDateTime (goog.object/get js-joda "OffsetDateTime"))
(def OffsetTime (goog.object/get js-joda "OffsetTime"))

(extend-protocol IComparable
  Period (-compare [x y] (.compareTo ^js/Object x y))
  LocalDate (-compare [x y] (.compareTo ^js/Object x y))
  LocalDateTime (-compare [x y] (.compareTo ^js/Object x y))
  ZonedDateTime (-compare [x y] (.compareTo ^js/Object x y))
  OffsetTime (-compare [x y] (.compareTo ^js/Object x y))
  Instant (-compare [x y] (.compareTo ^js/Object x y))
  OffsetDateTime (-compare [x y] (.compareTo ^js/Object x y))
  LocalTime (-compare [x y] (.compareTo ^js/Object x y))
  Duration (-compare [x y] (.compareTo ^js/Object x y))
  Year (-compare [x y] (.compareTo ^js/Object x y))
  YearMonth (-compare [x y] (.compareTo ^js/Object x y))
  ZoneId (-compare [x y] (.compareTo ^js/Object x y))
  DayOfWeek (-compare [x y] (.compareTo ^js/Object x y))
  Month (-compare [x y] (.compareTo ^js/Object x y))
  MonthDay (-compare [x y] (.compareTo ^js/Object x y)))
  

(extend-protocol IEquiv
  Period (-equiv [x y] (.equals ^js/Object x y))
  LocalDate (-equiv [x y] (.equals ^js/Object x y))
  LocalDateTime (-equiv [x y] (.equals ^js/Object x y))
  ZonedDateTime (-equiv [x y] (.equals ^js/Object x y))
  OffsetTime (-equiv [x y] (.equals ^js/Object x y))
  Instant (-equiv [x y] (.equals ^js/Object x y))
  OffsetDateTime (-equiv [x y] (.equals ^js/Object x y))
  LocalTime (-equiv [x y] (.equals ^js/Object x y))
  Duration (-equiv [x y] (.equals ^js/Object x y))
  Year (-equiv [x y] (.equals ^js/Object x y))
  YearMonth (-equiv [x y] (.equals ^js/Object x y))
  ZoneId (-equiv [x y] (.equals ^js/Object x y))
  DayOfWeek (-equiv [x y] (.equals ^js/Object x y))
  Month (-equiv [x y] (.equals ^js/Object x y))
  MonthDay (-equiv [x y] (.equals ^js/Object x y)))
  

(extend-protocol IHash
  Period (-hash [x] (.hashCode ^js/Object x))
  LocalDate (-hash [x] (.hashCode ^js/Object x))
  LocalDateTime (-hash [x] (.hashCode ^js/Object x))
  ZonedDateTime (-hash [x] (.hashCode ^js/Object x))
  OffsetTime (-hash [x] (.hashCode ^js/Object x))
  Instant (-hash [x] (.hashCode ^js/Object x))
  OffsetDateTime (-hash [x] (.hashCode ^js/Object x))
  LocalTime (-hash [x] (.hashCode ^js/Object x))
  ; todo - do a PR with the hashCode methods to js-joda
  ; note - impls copied from java.time
  MonthDay (-hash [x] (+ (.dayOfMonth ^js/Object x)
                        (bit-shift-left
                          (let [y (.month ^js/Object x)]
                            (.value ^js/Object y)) 6)))
  Duration (-hash [^js/Object x]
             (+ (* (.nano ^js/Object x) 51)
               (int
                 (bit-xor
                   (.seconds ^js/Object x)
                   (unsigned-bit-shift-right (.seconds ^js/Object x) 32)))))
  Year (-hash [x] (.value ^js/Object x))
  YearMonth (-hash [x] (bit-xor
                         (.year ^js/Object x)
                         (bit-shift-left (.monthValue ^js/Object x) 27)))
  ZoneId (-hash [x] (.hashCode ^js/Object x))
  DayOfWeek (-hash [^js/Object x] (.value ^js/Object x))
  Month (-hash [x] (.value ^js/Object x)))

