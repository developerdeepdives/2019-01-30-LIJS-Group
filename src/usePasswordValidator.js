import { useState, useEffect } from "react";
function usePasswordValidator(config = { min: 6, max: 10 }) {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setPasswordError("");
    if (!password) return;

    if (password.length < config.min) {
      setPasswordError(`Must be at least ${config.min} characters.`);
    } else if (password.length > config.max) {
      setPasswordError(`Must be no more than  ${config.max} characters.`);
    }
  });

  return [password, setPassword, passwordError];
}

export default usePasswordValidator;
