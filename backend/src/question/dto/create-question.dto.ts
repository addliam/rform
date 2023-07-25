interface OptionsData {
  choices: string[];
  correct_answers: number[];
}
interface ConstraintsData {
  required: boolean;
}
export class CreateQuestionDto {
  form_id: number;
  question_text: string;
  question_type: string;
  puntuation: number;
  options: OptionsData;
  constraints: ConstraintsData;
}
