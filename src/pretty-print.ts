import chalk from 'chalk';

export const nonStruct = Symbol("nonStruct");

export const struct = Symbol("struct");

type Primitive = boolean | number | bigint | symbol | string | undefined | null;

type NonStruct = { kind: typeof nonStruct, properties: Record<string, PrettyPrintTarget> };

type Struct = { kind: typeof struct, name: string, fields: Record<string, PrettyPrintTarget> };

export type PrettyPrintTarget = Primitive | NonStruct | Struct;

export const prettyPrint = (target: PrettyPrintTarget, printWidth = 80): string => {
    // TODO: target を整形して返す
    return chalk.bold("result of pretty-printing");
};
