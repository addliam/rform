"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Stack } from "react-bootstrap";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import Form from "@/interfaces/Form";
import { v4 as uuidv4 } from "uuid";

interface LettersMap {
  [key: number]: string;
}
const lettersMap: LettersMap = {
  1: "a",
  2: "b",
  3: "c",
  4: "d",
  5: "e",
  6: "f",
};

interface EditableData {
  title: string;
  description: string;
}

interface Alternatives {
  id: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  list: Alternatives[];
}

/*
  Page for editing form content such as title, description, questions (question and alternatives)
*/
export default function EditFormsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [titleDescriptionData, setTitleDescriptionData] =
    useState<EditableData | null>(null);
  const [formData, setFormData] = useState<Form | null>(null);
  const [inputs, setInputs] = useState<Question[]>([]);

  const accessToken = useAuthToken();
  // TODO: Query all questions already exist on form
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
        setTitleDescriptionData({
          title: res.data.title,
          description: res.data.description,
        });
      })
      .catch((err) => console.error(err));
    return () => {};
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (titleDescriptionData !== null) {
      setTitleDescriptionData((prev) => ({
        ...(prev as EditableData),
        title: e.target.value,
      }));
    }
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (titleDescriptionData !== null) {
      setTitleDescriptionData((prev) => ({
        ...(prev as EditableData),
        description: e.target.value,
      }));
    }
  };
  const saveAction = () => {
    console.log("---------------------------------------");

    if (titleDescriptionData) {
      console.log(
        titleDescriptionData.title,
        " ",
        titleDescriptionData.description
      );
    }
    console.log(`Logging all Question inner info`);
    console.log(inputs);
  };

  const handleAddQuestion = () => {
    // here instantiate default value
    // Make POST req w default values
    // const a =
    if (!formData) {
      console.log(`FormData is empty not loaded id`);
    } else {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = {
        form_id: formData.form_id,
        question_text: "Pregunta",
        question_type: "multiple_choice",
        puntuation: 10,
        options: {
          choices: ["Alternativa", "Alternativa", "Alternativa", "Alternativa"],
          correct_answers: [0],
        },
        constraints: {
          required: true,
        },
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question`, data, headers)
        .then((res) => {
          console.log(res.data);
          setFormData(res.data);
        })
        .catch((err) => console.error(err));
    }

    setInputs((prev) => [
      ...(prev as Question[]),
      {
        id: uuidv4(),
        text: "question",
        list: [
          { id: "1231", value: "alternativa" },
          { id: "1232", value: "alternativa" },
          { id: "1233", value: "alternativa" },
          { id: "1234", value: "alternativa" },
        ],
      },
    ]);
  };

  const handleInnerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputId: string
  ) => {
    const inputValue = event.target.value;
    const id = event.target.id;
    // inputs[0].list[0].value
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              list: input.list.map((innerInput: Alternatives) =>
                innerInput.id === id
                  ? { ...innerInput, value: inputValue }
                  : innerInput
              ),
            }
          : input
      )
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldname: string
  ) => {
    const inputValue = event.target.value;
    const id = event.target.id;
    // search through the inputs and edit the value. if ids is equal so FOUND
    // once found destructurate others values and edit FIELDNAME to new value
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id
          ? { ...(input as Question), [fieldname]: inputValue }
          : input
      )
    );
    console.log(inputValue, " -> ", id);
  };

  return (
    <div>
      {titleDescriptionData ? (
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
                  value={titleDescriptionData.title}
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
                  value={titleDescriptionData.description}
                  disabled={false}
                />
              </div>
              <div></div>
            </Stack>
          </Stack>

          <Container className="mt-4">
            <Stack direction="vertical" gap={5}>
              {inputs.map((input: Question, indx: number) => {
                return (
                  <Stack direction="vertical" gap={2} key={input.id}>
                    <Stack direction="horizontal" gap={2}>
                      <label htmlFor="question">{indx + 1}.-</label>
                      <input
                        key={input.id}
                        type="text"
                        name="text"
                        id={input.id}
                        value={input.text}
                        onChange={(e) => handleInputChange(e, "text")}
                      />
                    </Stack>
                    <div>
                      <Stack className="mt-2" gap={2}>
                        {input.list.map(
                          (listElement: Alternatives, indx: number) => (
                            <Stack
                              key={`${listElement.id}-list-${indx}`}
                              direction="horizontal"
                              gap={2}
                            >
                              <label>{lettersMap[indx + 1]})</label>
                              <input
                                key={`${listElement.id}`}
                                type="text"
                                name="list-text"
                                id={listElement.id}
                                value={listElement.value}
                                onChange={(e) =>
                                  handleInnerInputChange(e, input.id)
                                }
                              />
                            </Stack>
                          )
                        )}
                      </Stack>
                    </div>
                  </Stack>
                );
              })}
            </Stack>
          </Container>

          <Container className="mt-4">
            <Row>
              <Col>
                <Button onClick={() => handleAddQuestion()} variant="success">
                  {" "}
                  + Agregar pregunta
                </Button>
              </Col>
            </Row>
          </Container>

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
