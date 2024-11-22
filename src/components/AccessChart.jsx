import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AccessChart = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/api/charts/access/${token}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("authToken") || ""
              }`,
            },
          }
        );

        if (response.status === 401) {
          navigate("/login", {
            state: { redirectTo: `/charts/access/${token}` },
          });
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to load chart.");
        }

        const data = await response.json();
        setChartData(data.chartData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchChart();
  }, [token, navigate, backendUrl]);

  if (error) {
    return (
      <section aria-live="assertive">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  if (!chartData) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <main>
      <header>
        <h2>Chart Data</h2>
      </header>
      <article>
        <pre>{JSON.stringify(chartData, null, 2)}</pre>
      </article>
    </main>
  );
};

export default AccessChart;
