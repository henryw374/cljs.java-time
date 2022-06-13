 (ns play
   (:import [java.time LocalDate
                       LocalDateTime
                       ZonedDateTime
                       OffsetTime
                       Instant
                       OffsetDateTime
                       LocalTime
                       Year
                       YearMonth]))

 
 (require '[clojure.reflect :as r])
 


;(require '[clojure.pprint :as p])
;(p/pprint (set (names java.time.Period)))
;(p/pprint (set (names java.time.chrono.ChronoPeriod)))

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
   ])

(doseq [c nowable]
  (let [inst-1 (. LocalDate now)])

  )