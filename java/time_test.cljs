 (ns time-test)


(comment
  :cljs/quit
  (node-repl)
  (def o Year)
  (let [o (js-keys (.-prototype o))] (set (concat (js-keys o) (js/Object.getOwnPropertyNames o))))
  (getterize! (.-prototype o))

  (.getValue (Year. 2017))
  (.getUnits (. Period parse "P1D"))
  (.getZone (. Clock systemDefaultZone))

  )