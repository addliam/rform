interface QuestionResponse {
  qid: number;
  choice: number[];
}

export class CreateResponseDto {
  form_id: number;
  user_id: number;
  response_data: QuestionResponse[];
}
