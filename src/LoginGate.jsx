import { useId, useState } from "react";
import "./LoginGate.css";

const sitePassword = import.meta.env.VITE_SITE_PASSWORD;

function LoginGate({ onUnlock }) {
  const inputId = useId();
  const [passphrase, setPassphrase] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!sitePassword) {
      setErrorMessage("Missing site password configuration.");
      return;
    }

    if (passphrase === sitePassword) {
      setErrorMessage("");
      onUnlock();
      return;
    }

    setErrorMessage("Incorrect passphrase.");
  };

  return (
    <main className="login-gate">
      <div className="login-gate__backdrop" aria-hidden="true" />
      <section className="login-gate__card" aria-labelledby="login-gate-title">
        <p className="login-gate__eyebrow">Private preview</p>
        <h1 className="login-gate__title" id="login-gate-title">
          Enter Password
        </h1>
        <p className="login-gate__copy">
          This portfolio preview is shared privately for testing.
        </p>

        <form className="login-gate__form" onSubmit={handleSubmit}>
          <label className="login-gate__label" htmlFor={inputId}>
            Password
          </label>
          <input
            id={inputId}
            className="login-gate__input"
            type="password"
            value={passphrase}
            onChange={(event) => setPassphrase(event.target.value)}
            autoComplete="current-password"
            autoFocus
          />

          {errorMessage ? (
            <p className="login-gate__error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button className="login-gate__button" type="submit">
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginGate;
