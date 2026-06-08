import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { loginUser } from "@/services/auth.services";
import { useAuth } from "@/context/AuthContext";
import "@/styles/register.css";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();

  const navigate = Route.useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      console.log(data);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      alert("Login successful!");

      if (
        data.user.role === "admin"
      ) {
        navigate({
          to: "/admin",
        });
      } else {
        navigate({
          to: "/",
        });
      }

    } catch (error) {

      console.error(error);

      alert("Login failed");

    }
  };

  return (
    <div className="register">

      <form
        onSubmit={handleSubmit}
        className="register-form"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}