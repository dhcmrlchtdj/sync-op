SHELL := bash
.SHELLFLAGS = -O globstar -c
PATH := ./node_modules/.bin:$(PATH)

###

.PHONY: dev build fmt lint test clean outdated upgrade

# dev:
#     tsc --watch

build:
	tsc

fmt:
	prettier --write .

lint:
	eslint --ext=".ts" src test

test: $(test_compiled)
	jest --rootDir=./test $^

clean:
	-rm -rfv ./lib

outdated:
	pnpm outdated

upgrade:
	pnpm update --latest # --interactive
