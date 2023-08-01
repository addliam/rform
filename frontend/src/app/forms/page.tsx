"use client";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import useAuthToken from "@/hooks/useAuthToken";
import { useRouter } from "next/navigation";

const FormsPage = () => {
  const router = useRouter();
  const accessToken = useAuthToken();
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const data = {
    title: "Sin titulo",
    description: "Descripcion del formulario",
  };
  const createNewForm = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/form`, data, headers)
      .then((res) => {
        console.log(res.data);
        const redirectPath = `/form/e/${res.data!.slug}`;
        console.log("Redirigiendo: ", redirectPath);
        router.push(redirectPath);
      })
      .catch((err) => console.error(err));
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
              Crear nuevo
            </Button>
            <h6 style={{ marginTop: "2em" }}>Formularios recientes</h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormsPage;
