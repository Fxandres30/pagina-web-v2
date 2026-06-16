"use client";

import { useState } from "react";
import "./login.css";

export default function LoginPage() {

  const [password, setPassword] =
    useState("");

  const login = () => {

    if (
      password === "efaat2025"
    ) {

      document.cookie =
  "admin_token=ok; path=/; max-age=14400";

      window.location.href =
        "/admin/chats";

      return;
    }

    alert(
      "Contraseña incorrecta"
    );

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <h1 className="login-title">
          EFAAT CRM
        </h1>

        <p className="login-subtitle">
          Panel administrativo
        </p>

        <input
          type="password"
          className="login-input"
          placeholder="Ingrese la contraseña"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {
              login();
            }

          }}
        />

        <button
          className="login-button"
          onClick={login}
        >
          Ingresar
        </button>

      </div>

    </div>

  );

}