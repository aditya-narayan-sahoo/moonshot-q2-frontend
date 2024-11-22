import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Sidebar = ({ onFilterChange }) => {
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleAgeChange = (e) => {
    setAgeGroup(e.target.value);
    onFilterChange({ ageGroup: e.target.value, gender, startDate, endDate });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    onFilterChange({ ageGroup, gender: e.target.value, startDate, endDate });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onFilterChange({ ageGroup, gender, startDate: date, endDate });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onFilterChange({ ageGroup, gender, startDate, endDate: date });
  };

  return (
    <aside className="w-full lg:w-64 bg-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <section className="mb-6">
        <label
          htmlFor="ageGroup"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Age Group
        </label>
        <select
          id="ageGroup"
          value={ageGroup}
          onChange={handleAgeChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Age Group</option>
          <option value="15-25">15-25</option>
          <option value=">25">&gt;25</option>
        </select>
      </section>

      <section className="mb-6">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={handleGenderChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </section>

      <section className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Range
        </label>
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
            placeholderText="End Date"
          />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
