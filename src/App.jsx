import AuthForm from "./components/AuthForm";
import MainContainer from "./components/MainContainer";
import { Routes, Route, useLocation } from "react-router-dom";

const handleAuth = async ({ email, password, name }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const url = name
    ? `${backendUrl}/api/auth/signup`
    : `${backendUrl}/api/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }
  const data = await response.json();
  document.cookie = `authToken=${data.token}; path=/`;
};

function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authType = queryParams.get("type") || "login";

  return (
    <Routes>
      <Route
        path="/auth"
        element={<AuthForm type={authType} onSubmit={handleAuth} />}
      />
      <Route path="/" element={<MainContainer />} />
    </Routes>
  );
}

export default App;
