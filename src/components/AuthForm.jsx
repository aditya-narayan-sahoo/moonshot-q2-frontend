import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit({
        email,
        password,
        name: type === "signup" ? name : undefined,
      });

      navigate("/");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="auth-form">
      <h1 id="auth-form" className="sr-only">
        {type === "signup" ? "Sign Up Form" : "Login Form"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 max-w-sm mx-auto"
        aria-describedby="form-error"
      >
        {type === "signup" && (
          <fieldset>
            <legend className="sr-only">Personal Information</legend>
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full p-2 mb-4 border rounded"
              required
            />
          </fieldset>
        )}

        <fieldset>
          <legend className="sr-only">Account Information</legend>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 mb-4 border rounded"
            required
          />

          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 mb-4 border rounded"
            required
          />
        </fieldset>

        {error && (
          <div
            id="form-error"
            className="text-red-500 text-sm mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded ${
            loading ? "bg-blue-300" : "bg-blue-500 text-white"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader mr-2"></div>
              Processing...
            </div>
          ) : type === "signup" ? (
            "Sign Up"
          ) : (
            "Log In"
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setEmail("");
            setPassword("");
            setName("");
            setError("");
            if (type === "signup") {
              navigate("/auth?type=login");
            } else {
              navigate("/auth?type=signup");
            }
          }}
          className="mt-4 text-blue-500 hover:underline"
        >
          {type === "signup"
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
