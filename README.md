# ts-derive-debug

NOTE: TypeScript 5.0 Beta を使っています

クラスに対して、デバッグ出力の実装を導出するデコレータ

```typescript
import { type Debug, debug, deriveDebug } from '@0918nobita/ts-derive-debug';

interface Foo extends Debug {}

@deriveDebug('a', 'b') // <-- デバッグ出力に含めたいプロパティを列挙する
class Foo {
    a = 12;
    b = 'Hello';
    c = true;
}

const foo = new Foo();
console.log(debug(foo)); // => Foo { a: 12, b: 'Hello' }
```

'c' プロパティはデバッグ出力の内容に含みません

## サンプルの実行

```bash
$ npm i
$ npm run build
$ node dist/example.js
```
