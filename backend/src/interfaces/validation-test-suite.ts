interface ExpectedResult {
    key: string,
    value?: string | undefined
}

export interface ValidationTestSuiteInterface {
    describe: string,
    it: string,
    data: Object,
    toHaveProperties: ExpectedResult[]
}