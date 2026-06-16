"use client";

import { useState } from "react";

export default function LoginPage() {

  const [password, setPassword] =
    useState("");

  const login = () => {

    if (
      password === "MiClave123"
    ) {

      document.cookie =
        "admin_token=ok; path=/";

      window.location.href =
        "/admin/chats";

    }

    else {

      alert(
        "Contraseña incorrecta"
      );

    }

  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >

      <div>

        <h2>Login Admin</h2>

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={login}
        >
          Entrar
        </button>

      </div>

    </div>

  );

}