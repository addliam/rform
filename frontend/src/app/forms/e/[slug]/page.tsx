"use client";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Stack } from "react-bootstrap";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import Form from "@/interfaces/Form";
import { v4 as uuidv4 } from "uuid";

interface EditableData {
  title: string;
  description: string;
}

interface Alternative {
  id: string;
  value: string;
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
  const [editableData, setEditableData] = useState<EditableData | null>(null);
  const [formData, setFormData] = useState<Form | null>(null);
  const [numberQuestions, setNumberQuestions] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [inputs, setInputs] = useState<Question[]>([
    {
      id: "1234-4321",
      text: "test",
      list: [
        { id: "2234", value: "a" },
        { id: "2231", value: "b" },
        { id: "2232", value: "c" },
        { id: "2230", value: "d" },
      ],
    },
  ]);

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
    console.log("---------------------------------------");

    if (editableData) {
      console.log(editableData.title, " ", editableData.description);
    }
    console.log(`Logging all Question inner info`);
    console.log(inputs);

    // setTrigger(true);
    // // switch 'off'
    // setTimeout(() => {
    //   setTrigger(false);
    // }, 10);
  };

  const handleAddQuestion = () => {
    // here instantiate default value
    setInputs((prev) => [
      ...(prev as Question[]),
      {
        id: uuidv4(),
        text: "question",
        list: [
          { id: "1231", value: "a" },
          { id: "1232", value: "b" },
          { id: "1233", value: "c" },
          { id: "1234", value: "d" },
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
            <div>
              {inputs.map((input: Question) => {
                return (
                  <div
                    key={input.id}
                    style={{
                      borderColor: "red",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <input
                      key={input.id}
                      type="text"
                      name="text"
                      id={input.id}
                      value={input.text}
                      onChange={(e) => handleInputChange(e, "text")}
                    />
                    <div>
                      {input.list.map(
                        (listElement: Alternatives, indx: number) => (
                          <div
                            key={`${input.id}-list-${indx}`}
                            style={{
                              borderColor: "yellow",
                              borderWidth: "1px",
                              borderStyle: "solid",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
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
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
