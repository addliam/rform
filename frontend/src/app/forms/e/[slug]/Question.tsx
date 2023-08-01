import React from "react";

interface QuestionProps {
  question: string;
  alternatives: string[];
}
const Question = ({ data }: { data: QuestionProps }) => {
  return (
    <div
      style={{ borderColor: "red", borderWidth: "2px", borderStyle: "solid" }}
    >
      <div>
        <p style={{ fontSize: "1.15em", fontWeight: "500", margin: ".25em 0" }}>
          1. Escribe tu pregunta
        </p>
      </div>
      <div>a) Alternativa </div>
      <div>b) Alternativa </div>
      <div>c) Alternativa </div>
      <div>d) Alternativa </div>
    </div>
  );
};

export default Question;
