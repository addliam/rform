import React from "react";
import { cookies } from "next/headers";
import LocalStorageSetter from "@/utils/LocalStorageSetter";

// This must run on server-side
function getJwtCookie() {
  const cookieStore = cookies();
  const jwt = cookieStore.get("jwtToken");
  return jwt?.value;
}

const AuthPage = () => {
  const jwt = getJwtCookie();
  // TODO: Delete cookie once is already on jwt-token OR on log-out delete both
  return (
    <div>
      <h2>Redirigiendo</h2>
      <p>{jwt ? <LocalStorageSetter jwtToken={jwt} /> : "Loading ..."}</p>
    </div>
  );
};

export default AuthPage;
