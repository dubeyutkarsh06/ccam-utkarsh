export interface Question {
    id: number;
    title: string;
    subTitle: string;
    category: string;
    answers: Array<{ answer: string, type: number }>;
    type: string;
    selectedAnswers: string[];
    mandatory: number;
    filterReq: number[];
    filterAdd: object;
}
