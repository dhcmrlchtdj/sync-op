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
	tsgo

fmt:
	prettier --write .

lint:
	oxlint --deny-warnings \
		-D=correctness \
		-D=suspicious \
		-D=pedantic \
		-D=exhaustive-deps \
		-A=ban-ts-comment \
		-A=no-else-return \
		-A=no-negated-condition \
		-A=consistent-function-scoping \
		-A=max-classes-per-file \
		-A=max-dependencies \
		-A=max-depth \
		-A=max-lines \
		-A=max-lines-per-function \
		-A=max-nested-callbacks \
		--promise-plugin \
		--import-plugin
	prettier --check .

t :=
test: build
	@echo "filter test with 'make test t=xxx'"
	NODE_OPTIONS="--experimental-vm-modules --no-warnings" jest --coverage --rootDir=./dist/test/ --verbose=true -t=$(t)

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
