interface QuestionResponse {
  qid: number;
  choice: number[];
}

export class CreateResponseDto {
  form_id: number;
  response_data: QuestionResponse[];
}

/*
{
  "form_id": 4,
  "response_data": [
      {
        "qid": 1,
        "choice": [0]
      },
      {
        "qid": 2,
        "choice": [1]
      } 
  ]
}
*/
