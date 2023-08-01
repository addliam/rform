"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Stack } from "react-bootstrap";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import Form from "@/interfaces/Form";
import Question from "./Question";

interface EditableData {
  title: string;
  description: string;
}

interface QuestionProps {
  question: string;
  alternatives: string[];
}

/*
  Page for editing form content such as title, description, questions (question and alternatives)
*/
export default function EditFormsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [editableData, setEditableData] = useState<EditableData | null>(null);
  const [formData, setFormData] = useState<Form | null>(null);
  const [questionsData, setQuestionsData] = useState<QuestionProps[]>([]);

  const accessToken = useAuthToken();
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get<Form>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/form/u/${params.slug}`,
        headers
      )
      .then((res) => {
        setFormData(res.data);
        setEditableData({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => console.error(err));
    return () => {};
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableData !== null) {
      setEditableData((prev) => ({
        ...(prev as EditableData),
        title: e.target.value,
      }));
    }
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableData !== null) {
      setEditableData((prev) => ({
        ...(prev as EditableData),
        description: e.target.value,
      }));
    }
  };

  const saveAction = () => {
    console.log("Guardando... ");
    if (editableData) {
      console.log(editableData.title, " ", editableData.description);
    }
  };

  const addQuestion = () => {
    const defaultQuestionData: QuestionProps = {
      question: "Escribe tu pregunta",
      alternatives: [
        "Alternativa",
        "Alternativa",
        "Alternativa",
        "Alternativa",
      ],
    };
    setQuestionsData((prevData) => [...prevData, defaultQuestionData]);
  };

  return (
    <div>
      {editableData ? (
        <>
          <Stack
            gap={3}
            className=""
            style={{ marginLeft: "4em", marginTop: "2em" }}
          >
            <Stack direction="horizontal" gap={3}>
              <div>
                <input
                  style={{
                    fontSize: "2em",
                    border: "none",
                    borderBottom: "4px solid gray",
                  }}
                  onChange={(e) => handleTitleChange(e)}
                  type="text"
                  value={editableData.title}
                  disabled={false}
                />
              </div>
              <div></div>
            </Stack>
            <Stack style={{ width: "auto" }} direction="horizontal" gap={3}>
              <div>
                <input
                  style={{
                    fontSize: "1.2em",
                    border: "none",
                    borderBottom: "4px solid gray",
                    width: "fit-content",
                  }}
                  onChange={(e) => handleDescriptionChange(e)}
                  type="text"
                  value={editableData.description}
                  disabled={false}
                />
              </div>
              <div></div>
            </Stack>
          </Stack>

          <Container className="mt-4">
            <Row>
              <Col>
                <Button onClick={() => addQuestion()} variant="success">
                  {" "}
                  + Agregar pregunta
                </Button>
              </Col>
            </Row>
          </Container>

          {questionsData.map((value, indx) => (
            <Question data={value} />
          ))}

          <Container className="mt-4">
            <Row>
              <Col>
                <Button onClick={() => saveAction()} variant="primary">
                  Guardar
                </Button>
                {"   "}
                <Button variant="outline-danger">Cancelar</Button>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}
