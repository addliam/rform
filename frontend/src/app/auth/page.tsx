import React from "react";
import { cookies } from "next/headers";

const AuthPage = () => {
  const cookieStore = cookies();
  const jwtObject = cookieStore.get("jwtToken");
  return (
    <div>
      <h2>Auth redirection</h2>
      <p>{jwtObject ? jwtObject.value : "Fetching ..."}</p>
    </div>
  );
};

export default AuthPage;
