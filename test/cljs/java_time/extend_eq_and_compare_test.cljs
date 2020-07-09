(ns cljs.java-time.extend-eq-and-compare-test
  (:require [clojure.test :refer [deftest is are]]
            [java.time :refer [LocalDate
                               LocalDateTime
                               ZonedDateTime
                               OffsetTime
                               Instant
                               OffsetDateTime
                               LocalTime
                               Year
                               YearMonth
                               Month
                               Duration
                               Period
                               ZoneId
                               DayOfWeek
                               MonthDay]]
            [java.time.format :refer [DateTimeFormatter
                                      DateTimeFormatterBuilder
                                      ResolverStyle]]
            [java.time.temporal :refer [ChronoField
                                        IsoFields]]))

(enable-console-print!)

(def nowable
  [LocalDate
   LocalDateTime
   ZonedDateTime
   OffsetTime
   Instant
   OffsetDateTime
   LocalTime
   Year
   YearMonth
   MonthDay])

(def others [(. Month -MAY)
             (. Duration parse "PT1M")
             (. Period parse "P1D")
             (. ZoneId systemDefault)
             (. DayOfWeek -MONDAY)])

(defn assert-fns [x]
  (println x)
  (is (= x x))
  (is (hash x))
  (is (>= x x))
  (is (<= x x)))

(deftest test-extensions
  (doseq [c nowable]
    (assert-fns (. c now)))
  (doseq [o others]
    (assert-fns o)))

(deftest test-formatter
  (let [formatter (. DateTimeFormatter ofPattern "yyyy MM dd")
        date (. LocalDate now)
        text (. date format formatter)
        parsed (. LocalDate parse text formatter)]
    (is (= date parsed))))

(def chrono-field-fmt
  (-> (new DateTimeFormatterBuilder)
      (.appendLiteral "Date is: ")
      (.appendValue (.. ChronoField -DAY_OF_YEAR) 3)
      (.appendValue (.. ChronoField -YEAR) 4)
      (.toFormatter)))

#_(deftest test-formatter-builder
  (let [date (. LocalDate now)
        text (. date format chrono-field-fmt)
        parsed (. LocalDate parse text chrono-field-fmt)]
    (is (= date parsed))))

(def iso-field-fmt
  (-> (new DateTimeFormatterBuilder)
      (.appendValue (.. IsoFields -DAY_OF_QUARTER)  2)
      (.appendValue (.. IsoFields -QUARTER_OF_YEAR) 1)
      (.appendValue (.. ChronoField -YEAR) 4)
      (.toFormatter)
      (.withResolverStyle (. ResolverStyle -SMART))))

(deftest iso-formatter
  (let [date (. LocalDate of 2019 07 13)
        text (. date format iso-field-fmt)]
    (is (= text "1332019"))))
