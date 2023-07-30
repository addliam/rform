"use client";
import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const Login = () => {
  const backend_auth_path = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`;
  return (
    <div>
      <Stack gap={2}>
        <div className="p-2">
          <h2>Inicia sesion</h2>
        </div>
        <div className="p-2">
          <Link href={backend_auth_path}>
            <Button variant="primary">Inicia sesion con Google</Button>
          </Link>
        </div>
      </Stack>
    </div>
  );
};

export default Login;
