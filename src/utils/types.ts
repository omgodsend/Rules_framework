export interface Rule {
    id: number;
    evaluation: string;
    enabled: boolean;
    operator: string;  
    comparator_value: string;
}

export interface EvaluationResult {
    ruleId: number;
    evaluation: string;
    passed: boolean;
}