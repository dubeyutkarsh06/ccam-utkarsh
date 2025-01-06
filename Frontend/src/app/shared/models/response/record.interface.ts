import {Question} from '../question/question';

export interface RecordInterface {
  record: Question[];
  language: {
    id: number,
    name: string,
  };
}
