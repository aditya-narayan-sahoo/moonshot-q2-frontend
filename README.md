<h1 align="center">Chart Frontend</h1>
<div align="center">
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=Chart.js&logoColor=white" alt="chart.js"/>
    <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=black" alt="react-router"/>
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Local Setup](#setup)

### <a name="introduction">🤖 Introduction</a>

This is the frontend part of the app that fetches users data from a backend hosted on the repo : [Backend Repository](https://github.com/aditya-narayan-sahoo/moonshot-q2-backend).

### <a name="tech-stack">⚙️ Tech Stack</a>

- Vite
- React.js
- Tailwind CSS

### <a name="features">🔋 Features</a>

👉 **Bar Chart:** A bar chart to represent the Features. A,B,C,D,E,F are features and x axis is total time spent between the selected date range.

👉 **Line Chart:** line chart to display the time trend of a particular category upon clicking in the bar chart.

👉 **Zoom/Pan:** The line chart havs pan, zoom-in, zoom-out options on time range.

👉 **Advanced Filtering:** Include 2 filters:

- Age (15 - 25, greater than 25)
- Age (male, female).

👉 **Date Range Selector:** Has a date range selector component that allows users to choose a specific time range for analytics data.<br/>
The app automatically updates the graph based on the selected time range and filters

👉 **Cookie Management:** Has a cookie management system to store user preferences of filters and date range.

👉**User Authentication Storage:** Users and their details are stored in a mongodb database configured on the backend.

👉 **URL Sharing:** Users are able to share a chart created with date range and filters to another user via a URL. <br/>
The second user will have to log in first to view the chart because the data is confidential.

👉 **Responsiveness:** The app is responsive and works seamlessly on various devices, including desktops, tablets, and mobiles.

### <a name="setup">🤸 Local Setup</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites:**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Clone the Repository:**

```
git clone https://github.com/aditya-narayan-sahoo/moonshot-q2-frontend.git
```

**Change the Directory:**

```
cd moonshot-q2-frontend
```

**Installation**

Install the project dependencies using npm:

```
npm install
```

**Make a .env file in the root directory:**

```
VITE_BACKEND_URL=your_backend_url
```

**Running the Project**

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
