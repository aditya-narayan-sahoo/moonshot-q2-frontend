import { useState } from "react";

const ShareChart = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [sharableURL, setSharableURL] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCookieForShare = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleShare = async () => {
    setError(null);
    setLoading(true);

    try {
      const authToken = getCookieForShare("authToken");

      if (!authToken) {
        throw new Error("User is not authenticated. Please log in.");
      }
      const response = await fetch(`${backendUrl}/api/charts/share`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          dateRange: "2024-01-01 to 2024-01-31",
          filters: { age: "15-25", gender: "Male" },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to share the chart");
      }

      const data = await response.json();
      setSharableURL(data.sharableURL);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sharableURL);
    alert("URL copied to clipboard!");
  };

  return (
    <section className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <header>
        <button
          onClick={handleShare}
          className={`w-full p-3 text-white rounded-lg transition duration-300 
                    ${
                      loading
                        ? "bg-gray-400"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
          disabled={loading}
        >
          {loading ? "Sharing..." : "Share Chart"}
        </button>
      </header>

      {error && (
        <article className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </article>
      )}

      {sharableURL && (
        <section className="mt-4">
          <p className="font-semibold">Sharable URL:</p>
          <div className="overflow-hidden rounded-md bg-gray-100 p-2">
            <a
              href={sharableURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700 break-all"
            >
              {sharableURL}
            </a>
          </div>
          <button
            onClick={copyToClipboard}
            className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800"
          >
            Copy Link
          </button>
        </section>
      )}
    </section>
  );
};

export default ShareChart;
