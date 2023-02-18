import { type Debug, type PrettyPrintTarget, debug, deriveDebug, nonStruct, prettyPrint, struct } from './lib.js';

interface Foo extends Debug {}

@deriveDebug('a', 'b')
class Foo {
    a = 2;
    b = { hoge: true, fuga: 'hello' };
    c = "This isn't included in debug output";
}

interface Bar extends Debug {}

@deriveDebug('d', 'e')
class Bar {
    d = new Foo();
    readonly e = null;
}

const bar = new Bar();
console.log(debug(bar));

const prettyPrintTarget: PrettyPrintTarget = {
    kind: struct,
    name: 'Foo',
    fields: {
        a: 2,
        b: {
            kind: nonStruct,
            properties: {
                hoge: true,
                fuga: 'hello',
            },
        },
        c: "This isn't included in debug output",
    }
};

console.log(prettyPrint(prettyPrintTarget));
