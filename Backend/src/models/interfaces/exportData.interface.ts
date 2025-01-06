export interface ExportData {
    fromDatePicker: Date;
    toDatePicker: Date;
    countries: string[];
    assessment: string;
    population: string[];
    language: string;
    minimumScore: number;
    processActivePersons: boolean;
    dataContainsTestFilter: boolean;
}
