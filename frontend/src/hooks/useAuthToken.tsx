"use client";
import { useEffect, useState } from "react";

const useAuthToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    setToken(jwtToken);
    // TODO: if not redirect to home or login page
  }, []);

  return token;
};

export default useAuthToken;
