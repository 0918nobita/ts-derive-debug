import chalk from 'chalk';

import { type PrettyPrintTarget, nonStruct, prettyPrint, struct } from './pretty-print.js';

export { type PrettyPrintTarget, nonStruct, prettyPrint, struct };

const debugFmt = Symbol("debugFmt");

type DebugFmt = () => string;

export type Debug = { [debugFmt]: DebugFmt };

type Primitive = boolean | number | bigint | symbol | string | undefined | null;

type Target = Primitive | ({ [_ in string]: Target } & { [debugFmt]?: DebugFmt });

const debugFmtInner = (value: Target): string => {
    if (value === null) return chalk.bold('null');

    switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'bigint':
        case 'symbol':
            return chalk.yellow(String(value));
        case 'string':
            return chalk.green(`'${value.replaceAll('\n', '\\n')}'`);
        case 'undefined':
            return chalk.grey('undefined');
    }

    if (value.hasOwnProperty(debugFmt)) {
        if (typeof value[debugFmt] === 'function') {
            return value[debugFmt]();
        }

        throw new Error(`[debug] property must be a function`);
    }

    const properties =
        Object
            .keys(value)
            .map((key) => `${key}: ${debugFmtInner(value[key])}`)
            .join(', ');

    return properties.length === 0 ? '{}' : `{ ${properties} }`;
};

export const deriveDebug =
    <const Properties extends string>(...properties: Properties[]) =>
    <Base extends new (...args: any) => { [T in Properties]: any }>(
        base: Base,
        context: ClassDecoratorContext
    ): void => {
        base.prototype[debugFmt] = function () {
            const props = properties.map((propertyName) => {
                const propertyValue = this[propertyName];

                if (propertyValue === null) return `${propertyName}: ${chalk.bold('null')}`;

                switch (typeof propertyValue) {
                    case 'boolean':
                    case 'number':
                    case 'bigint':
                    case 'symbol':
                        return `${propertyName}: ${chalk.yellow(String(propertyValue))}`;
                    case 'string':
                        return `${propertyName}: ${chalk.green(`'${propertyValue.replaceAll('\n', '\\n')}'`)}`;
                    case 'undefined':
                        return `${propertyName}: ${chalk.grey('undefined')}`;
                }

                return (typeof propertyValue[debugFmt] === 'function') ?
                    `${propertyName}: ${propertyValue[debugFmt]()}` :
                    `${propertyName}: ${debugFmtInner(propertyValue)}`;
            });

            return props.length === 0 ? `${context.name} {}` : `${context.name} { ${props.join(', ')} }`;
        };
    };

// TODO: pretty-print の際の printWidth を指定できるようにする
export const debug = (target: { [debugFmt]: DebugFmt }, printWidth = 80): string => target[debugFmt]();
