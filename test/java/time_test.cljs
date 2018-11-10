(ns java.time-test
  (:require [java.time :refer [LocalDate ZoneId DateTimeFormatter]]
            [cljs.java-time.timezone]
            [cljs.java-time.locale-en-us :refer [Locale]]
            [cljs.test :refer [deftest is testing]]))


(deftest loaded 
  (is (. LocalDate parse "2020-01-01"))
  (is (. ZoneId of "Europe/London"))
  (is (.. DateTimeFormatter (ofPattern "yyyy") (withLocale (.-US Locale)))))
