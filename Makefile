SHELL := bash
.SHELLFLAGS := -O globstar -e -u -o pipefail -c
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-builtin-variables

PATH := ./node_modules/.bin:$(PATH)

###

.PHONY: dev build fmt lint test doc clean outdated upgrade

# dev:
#     tsc --watch

build:
	tsc

fmt:
	prettier --write .

lint:
	eslint --ext=".ts" src
	prettier --check .

test: build
	NODE_OPTIONS=--experimental-vm-modules jest --coverage --rootDir=./dist/test/ --verbose=true

doc:
	typedoc \
		--out doc \
		--cleanOutputDir \
		--readme none \
		--excludePrivate \
		--excludeProtected \
		--plugin typedoc-plugin-markdown \
		src/index.ts

clean:
	-rm -rfv ./dist

outdated:
	pnpm outdated

upgrade:
	pnpm update --latest # --interactive
