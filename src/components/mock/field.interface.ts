export interface IGeneratorCheckboxItem {
    value: boolean,
    text: string,
    varName: string,
}

export type MockFieldType = 'checkbox' | 'select';

export interface MockField {
    key: string;
    label: string;
    type?: MockFieldType;
    options?: (string | number)[];
    value?: any; // Valor inicial
}

export class MockFieldCheckbox implements MockField {
    type: MockFieldType = 'checkbox';
    constructor(public key: string, public label: string, public value: boolean = false) { }
}

export class MockFieldSelect implements MockField {
    type: MockFieldType = 'select';
    constructor(public key: string, public label: string, public options: (string | number)[], public value?: string | number) { }
}

// Representa o estado do formulário: { [chave]: valor }
export type MockState = Record<string, any>;