.PHONY: 		watch default deploy test

pom:
			rm pom.xml; clojure -Spom; echo "Now use git diff to add back in the non-generated bits of pom"
# Dev pom is used to created development project with intellij
dev-pom:
			rm -f pom.xml && clj -R:dev:test-cljs -C:dev:test-cljs -Spom

deploy:
			rm -rf target && mvn deploy
figwheel:
			clj -R:dev:dev -C:dev:dev -m figwheel.main --build cljs.java-time --repl
test-cljs:
			rm -rf cljs-test-runner-out && mkdir -p cljs-test-runner-out/gen && clojure -Atest-cljs
# hooray for stackoverflow
.PHONY: list
list:
		@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$' | xargs
