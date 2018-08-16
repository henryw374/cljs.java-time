(defproject cljs.java-time "0.1.2"
  :description "jsr-310 (java.time) api in Clojurescript"
  :url "http://github.com/henryw374/cljs.java-time"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[cljsjs/js-joda "1.9.1-0"]]
  :profiles {:dev
             {:source-paths ["dev"]
              :dependencies [[org.clojure/clojure "1.9.0"]
                             [org.clojure/clojurescript "1.10.238"]]
              :plugins [[lein-doo "0.1.10"]]}})
