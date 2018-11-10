test:
			clj -Adev:test-cljs
build:
			clj -Adev -m cljs.main -co dev/build.edn -v -c