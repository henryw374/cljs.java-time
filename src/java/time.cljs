(ns java.time
  (:require [cljsjs.js-joda]
            [clojure.string :as string]))

; the js-joda implementation differs from java's java.time in that all the getter methods have had the 'get'
; bit of the name removed, for example (.value foo), instead of (.getValue foo). The code in this ns does backflips to dynamically create the getter methods in order
; to match the java implementaion

(def Period)
(def Instant)
(def Duration)
(def LocalDate)
(def LocalTime)
(def ZonedDateTime)
(def LocalDateTime)
(def Year)
(def YearMonth)
(def ZoneId)
(def DayOfWeek)
(def Month)
(def Clock)
(def ZoneOffset)
(def ChronoUnit)
(def ChronoField)
(def TemporalAdjusters)
(def Temporal)
(def TemporalAmount)
(def DateTimeFormatter)
(def ResolverStyle)

(def names (-> (ns-publics 'java.time)
               (dissoc 'names)
               keys))

(defn getter-name [s]
  (apply str "get" (string/upper-case (first s)) (rest s)))

(declare getterize!)

(defn do-gettering! [o]
  ;static
  (getterize! o)
  ;super 1
  (getterize! (. js/Object getPrototypeOf o))
  ;instance
  (getterize! (.-prototype o)))

(defn getterize! [o]
  (let [fields (set (concat (js-keys o) (js/Object.getOwnPropertyNames o)))]
    (doseq [f fields]
      (try
        (let [v (goog.object/get o f)
              getter-name (getter-name f)]
          (when (and (fn? v) (not (fields getter-name)))
            (goog.object/set o getter-name (fn [& args]
                                             ; this rigmarole (as opposed to always calling v directly) 
                                             ; is needed to call implementation of methods inherited from
                                             ; superclass. e.g. getUnits
                                             (this-as this
                                               (or
                                                 (when-let [f (goog.object/get this f)]
                                                   (.apply f this args))
                                                 (.apply v this args))))))
          (when (object? v)
            (do-gettering! v)))
        (catch js/Error e)))))

(doseq [n names]
  (let [o (goog.object/get js/JSJoda (str n))]
    (do-gettering! o)
    (goog.object/set js/java.time (str n) o)))

;OffsetTime is currently missing from JS-Joda 
; 
;(see https:// github.com / js-joda / js-joda/issues/240 and https://github.com/js-joda/js-joda/issues/165. 
;
;OffsetDateTime is also missing but ZonedDateTime has the same functionality
; IOW - do not use the following 2 vars.
(def OffsetDateTime (.. js/JSJoda -ZonedDateTime))
(def OffsetTime (.. js/JSJoda -LocalTime))

; not actually part of java.time of course, but handy for libs using this to have cljs var
(def Date js/Date)

(set! (.-valueOf Month) (fn [x] (goog.object.get Month x)))

