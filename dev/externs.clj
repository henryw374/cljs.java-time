(ns externs
  (:require [clojure.reflect :as r]
            [clojure.string :as string])
  (:import [java.time Period
                      Instant
                      Duration
                      LocalDate
                      LocalTime
                      ZonedDateTime
                      OffsetDateTime
                      OffsetTime
                      LocalDateTime
                      Year
                      YearMonth
                      ZoneId
                      DayOfWeek
                      Month
                      Clock
                      ZoneOffset]
           [java.time.format DateTimeFormatter
                             ResolverStyle]
           [java.time.temporal ChronoUnit
                             ChronoField
                             TemporalAdjusters
                             Temporal
                             TemporalAmount]))

(def classes [Period
              Instant
              Duration
              LocalDate
              LocalTime
              ZonedDateTime
              OffsetDateTime
              OffsetTime
              LocalDateTime
              Year
              YearMonth
              ZoneId
              DayOfWeek
              Month
              Clock
              ZoneOffset
              ChronoUnit
              ChronoField
              TemporalAdjusters
              Temporal
              TemporalAmount
              DateTimeFormatter
              ResolverStyle])

(defn static-method-names [class]
  ;(println "**** " class)
  (let [{:keys [bases members]} (r/reflect class)]
    (concat
      (->> bases
           (map #(-> % resolve))
           (filter #(.startsWith (.getName (.getPackage %)) "java.time"))
           (map
             #(do ;(println "+++++++++ " %)
                (static-method-names %)))
           flatten)
      (->> members
           (filter (complement #((-> % :flags) :private)))
           (filter #((-> % :flags) :static))
           (filter #(:return-type %))
           (map :name)
           ))))

(defn add-js-joda-getters [members]
  (concat members
    (->> members
         (keep (fn [member]
                 (when-let [[_ cap remainder] (re-find #"get([A-Z])(.*)" member)]
                   (str (string/lower-case cap) remainder)))))))

(defn print-static-method-externs! [[class methods]]
  (let [joda-name (-> class (.getSimpleName))]
    (println (str "JSJoda." joda-name))
    (doseq [method methods]
      (println (str "JSJoda." joda-name "." method)))))

(comment

  (def statics
    (->> classes
         ;(take 1)
         (map (juxt identity
                static-method-names))

         #_(map (fn [class]
                  [(.getName class)
                   ((comp add-js-joda-getters
                      #(map str %)
                      set
                      static-method-names)
                     class)]))
         ))
  
  (doseq [s statics]
    (print-static-method-externs! s))

  )
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

