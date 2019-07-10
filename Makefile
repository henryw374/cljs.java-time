.PHONY: 		watch default deploy test

pom:
			rm -f pom.xml; clojure -Spom; echo "Now use git diff to add back in the non-generated bits of pom"
deploy:
			rm -rf target && mvn deploy
repl:
			clj -Adev -m cljs.main -re node
figwheel:
			clj -R:dev:dev -C:dev:dev -m figwheel.main --build cljs.java-time --repl
test-cljs:
			rm -rf cljs-test-runner-out && mkdir -p cljs-test-runner-out/gen && clojure -Atest-cljs
# hooray for stackoverflow
.PHONY: list
list:
		@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs
