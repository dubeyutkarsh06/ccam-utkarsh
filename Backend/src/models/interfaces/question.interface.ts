export interface IQuestion {
    id: number;
    title: string;
    subTitle: string;
    category: string;
    answers: Array<{ translation: string, type: number }>;
    selectedAnswers: string[];
    type: string;
    mandatory: number;
    filterReq: number[];
    filterAdd: {};
}
