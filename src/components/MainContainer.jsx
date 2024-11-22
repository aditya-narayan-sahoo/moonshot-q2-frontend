import Sidebar from "./Sidebar";
import Modal from "./Modal";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import ShareChart from "./ShareChart";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

const MainContainer = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [filters, setFilters] = useState({
    ageGroup: "",
    gender: "",
    startDate: null,
    endDate: null,
  });

  const [barChartData, setBarChartData] = useState([0, 0, 0, 0, 0, 0]);
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartLabels, setLineChartLabels] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedFilters = getCookie("userFilters");
    if (savedFilters) {
      setFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    setCookie("userFilters", filters, 7);
  }, [filters]);

  useEffect(() => {
    const token = getCookie("authToken");
    if (!token) {
      navigate("/auth", { state: { from: location.pathname } });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, location]);

  const constructApiUrl = useCallback(() => {
    const { ageGroup, gender, startDate, endDate } = filters;
    let apiUrl = `${backendUrl}/api/data?`;
    if (ageGroup) apiUrl += `ageGroup=${ageGroup}&`;
    if (gender) apiUrl += `gender=${gender}&`;
    if (startDate) apiUrl += `startDate=${startDate}&`;
    if (endDate) apiUrl += `endDate=${endDate}&`;
    return apiUrl.slice(0, -1);
  }, [filters, backendUrl]);

  // Fetch data for bar chart whenever filters change
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const apiUrl = constructApiUrl();
        const response = await fetch(apiUrl);
        const data = await response.json();

        const barData = [
          data.reduce((acc, curr) => acc + (curr.A || 0), 0),
          data.reduce((acc, curr) => acc + (curr.B || 0), 0),
          data.reduce((acc, curr) => acc + (curr.C || 0), 0),
          data.reduce((acc, curr) => acc + (curr.D || 0), 0),
          data.reduce((acc, curr) => acc + (curr.E || 0), 0),
          data.reduce((acc, curr) => acc + (curr.F || 0), 0),
        ];

        setBarChartData(barData);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchBarChartData();
  }, [filters, constructApiUrl]);

  // Fetch data for line chart when a bar is clicked
  useEffect(() => {
    if (!selectedFeature) return;

    const fetchLineChartData = async () => {
      try {
        const apiUrl = constructApiUrl();
        const response = await fetch(apiUrl);
        const data = await response.json();

        const lineData = data.map((item) => item[selectedFeature] || 0);
        const lineLabels = data.map((item) => {
          const dateParts = item.Day.split("/");
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1;
          const year = parseInt(dateParts[2], 10);
          const date = new Date(year, month, day);
          const formattedDay = String(date.getDate()).padStart(2, "0");
          const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
          const formattedYear = date.getFullYear();
          return `${formattedDay}/${formattedMonth}/${formattedYear}`;
        });

        setLineChartData(lineData);
        setLineChartLabels(lineLabels);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };

    fetchLineChartData();
  }, [selectedFeature, filters, constructApiUrl]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSelectedFeature(null);
  };

  const handleBarClick = (feature) => {
    setSelectedFeature(feature);
  };

  const handleShareChartToggle = () => {
    if (isShareModalOpen) {
      setIsShareModalOpen(false);
    } else {
      const { ageGroup, gender, startDate, endDate } = filters;
      const baseUrl = `${window.location.origin}/?`;
      const params = new URLSearchParams({
        ageGroup,
        gender,
        startDate,
        endDate,
      });

      const url = `${baseUrl}${params.toString()}`;
      setShareUrl(url);
      setIsShareModalOpen(true); // Open the ShareChart
    }
  };

  const handleResetPreferences = () => {
    deleteCookie("userFilters");
    setFilters({
      ageGroup: "",
      gender: "",
      startDate: null,
      endDate: null,
    });
    setSelectedFeature(null);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <div className="relative flex flex-col lg:flex-row flex-1">
        <Sidebar onFilterChange={handleFilterChange} />

        <section
          className={`flex-1 p-4 transition-all duration-300 ${
            isShareModalOpen ? "mr-80" : "mx-auto"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleShareChartToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isShareModalOpen ? "Close Share Chart" : "Share Chart"}
            </button>
            <button
              onClick={() => {
                deleteCookie("authToken");
                setIsAuthenticated(false);
                navigate("/auth");
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          <BarChart data={barChartData} onBarClick={handleBarClick} />
          {selectedFeature && (
            <LineChart data={lineChartData} labels={lineChartLabels} />
          )}

          <button
            onClick={handleResetPreferences}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Reset Preferences
          </button>
        </section>

        <Modal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        >
          <ShareChart url={shareUrl} />
        </Modal>
      </div>
    </main>
  );
};

export default MainContainer;
