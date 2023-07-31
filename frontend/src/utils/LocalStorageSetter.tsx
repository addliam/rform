"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
interface LocalStorageSetterProps {
  jwtToken: string;
}
/*
 This component runs on client-side the only way i found to use localStorage without interrupting using cookie server-side
*/
const LocalStorageSetter = ({ jwtToken }: LocalStorageSetterProps) => {
  useEffect(() => {
    if (jwtToken) {
      localStorage.setItem("jwtToken", jwtToken);
      redirect("/forms");
    }
    return () => {};
  }, [jwtToken]);

  return <></>;
};

export default LocalStorageSetter;
