import { describe, expect, test } from "@jest/globals"
import { generator, type YieldFn } from "../../generator.js"

describe("yield", () => {
	test("expand tab", async () => {
		const process = (
			text: string,
			...g: ((_: YieldFn<string>) => YieldFn<string>)[]
		) =>
			generator<string>(async (Yield) => {
				const f = g.reduceRight((acc, curr) => curr(acc), Yield)
				await f(text)
			})

		const split = (Yield: YieldFn<string>): YieldFn<string> => {
			return async (text: string) => {
				for (const char of text) {
					await Yield(char)
				}
				await Yield("\n")
			}
		}
		const expandTab =
			(width: number) =>
			(Yield: YieldFn<string>): YieldFn<string> => {
				let pos = 0
				return (char: string) => {
					if (char === "\t") {
						const nextpos = pos + width - (pos % width)
						const space = "".padStart(nextpos - pos)
						pos = nextpos
						return Yield(space)
					} else {
						if (char === "\n") {
							pos = 0
						} else {
							pos++
						}
						return Yield(char)
					}
				}
			}
		const concat = (Yield: YieldFn<string>): YieldFn<string> => {
			let p = ""
			return (char: string) => {
				if (char === "\n") {
					const done = p
					p = ""
					return Yield(done)
				} else {
					p += char
					return Promise.resolve()
				}
			}
		}

		const text = [
			"Lorem\tipsum\tdolor\tsit\tamet,\tconsectetur\tadipiscing\telit,\tsed\tdo\teiusmod\ttempor\tincididunt\tut\tlabore\tet\tdolore\tmagna\taliqua.",
			"Ut\tenim\tad\tminim\tveniam,\tquis\tnostrud\texercitation\tullamco\tlaboris\tnisi\tut\taliquip\tex\tea\tcommodo\tconsequat.",
			"Duis\taute\tirure\tdolor\tin\treprehenderit\tin\tvoluptate\tvelit\tesse\tcillum\tdolore\teu\tfugiat\tnulla\tpariatur.",
			"Excepteur\tsint\toccaecat\tcupidatat\tnon\tproident,\tsunt\tin\tculpa\tqui\tofficia\tdeserunt\tmollit\tanim\tid\test\tlaborum.",
		].join("\n")
		const out = await arrayFromAsync(
			process(text, split, expandTab(4), concat),
		)
		expect(out).toMatchInlineSnapshot(`
		[
		  "Lorem   ipsum   dolor   sit amet,   consectetur adipiscing  elit,   sed do  eiusmod tempor  incididunt  ut  labore  et  dolore  magna   aliqua.",
		  "Ut  enim    ad  minim   veniam, quis    nostrud exercitation    ullamco laboris nisi    ut  aliquip ex  ea  commodo consequat.",
		  "Duis    aute    irure   dolor   in  reprehenderit   in  voluptate   velit   esse    cillum  dolore  eu  fugiat  nulla   pariatur.",
		  "Excepteur   sint    occaecat    cupidatat   non proident,   sunt    in  culpa   qui officia deserunt    mollit  anim    id  est laborum.",
		]
		`)
	})
})

async function arrayFromAsync<T>(g: AsyncIterable<T>): Promise<T[]> {
	const r: T[] = []
	for await (const x of g) {
		r.push(x)
	}
	return r
}
