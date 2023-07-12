interface ExpectedResult {
    key: string,
    value: string | undefined
}

export interface ValidationTestSuiteInterface {
    useCase: string,
    expected: string,
    payload: Object,
    expectedResult: ExpectedResult[]
}