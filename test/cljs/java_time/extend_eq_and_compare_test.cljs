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
                               MonthDay]]))

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
