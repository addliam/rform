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

/*
{
  "form_id": 4,
  "question_text": "How are you?",
  "question_type": "multiple_choice",
  "puntuation": 10,
  "options": {
      "choices": ["Good", "Not too good", "Bad", "Very bad"],
      "correct_answers": [0]
  },
  "constraints": {
      "required": true
  }
}
*/
