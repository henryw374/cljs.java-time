(ns cljs.java-time.locale-en-us
  (:require ["@js-joda/locale_en-us" :as en-us]))

(def Locale (.-Locale en-us))
