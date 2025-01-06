import {Question} from '../question/question';
import {ComponentTranslation} from "../question/componentTranslation";

export interface AssessmentResponse {
  assessment: number;
  questions: Question[],
  questionTranslationData: ComponentTranslation,
}
