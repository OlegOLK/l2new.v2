export interface ComplexFilter {
    name: string;
    rates: Rates[];
    chronicles: Chronicles[];
}

export interface Chronicles {
    label: string;
    selected: boolean;
}

export interface Rates {
    max: number;
    min: number;
    name: string;
}
