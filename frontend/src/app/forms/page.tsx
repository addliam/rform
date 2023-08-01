"use client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import Form from "@/interfaces/Form";

const FormsPage = () => {
  const router = useRouter();
  const accessToken = useAuthToken();
  const [formsData, setFormsData] = useState<Form[]>([]);
  const data = {
    title: "Sin titulo",
    description: "Descripcion del formulario",
  };
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  useEffect(() => {
    if (accessToken) {
      axios
        .get<Form[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/form`, headers)
        .then((res) => {
          setFormsData(res.data);
        })
        .catch((err) => console.error(err));
      return () => {};
    }
  }, [accessToken]);

  const createNewForm = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/form`, data, headers)
      .then((res) => {
        const redirectPath = `/forms/e/${res.data!.slug}`;
        console.log("Redirigiendo: ", redirectPath);
        router.push(redirectPath);
      })
      .catch((err) => console.error(err));
  };
  const shortTextView = (text: string) => {
    const offset = 54;
    if (text.length > offset) {
      return `${text.slice(0, offset)}...`;
    } else {
      return text;
    }
  };
  return (
    <div>
      <Container style={{ marginTop: "1em" }}>
        <Row>
          <Col>
            <h2>Mis formularios</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => createNewForm()} variant="primary">
              + Crear nuevo
            </Button>
            <h6 style={{ marginTop: "2em" }}>Formularios recientes</h6>
          </Col>
        </Row>
        <Row xs={1} md={2} className="" style={{ gap: "1em" }}>
          {formsData.map((formData) => (
            <Card key={formData.form_id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{formData.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(formData.created_at).toLocaleString()}
                </Card.Subtitle>
                <Card.Text>{shortTextView(formData.description)}</Card.Text>
                <Card.Link href={`/forms/e/${formData.slug}`}>Abrir</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FormsPage;
