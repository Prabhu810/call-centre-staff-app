# CallDesk — Call Centre Staff App

A responsive, original frontend demo for a call-centre staff workspace. Built with React and Vite using sample data; no backend or API keys are required.

## Features

- Responsive staff workspace with sidebar navigation
- Dashboard summary cards and illustrative call activity chart
- Recent calls table with customer, call topic, direction, status, duration, and time
- Search by customer name, call ID, phone number, or call topic
- Filter by call status and incoming/outgoing call type
- View call details and update a call's status
- Add new call records through a validated form
- Customer directory view, call history view, settings view, and toast feedback
- Mobile-friendly navigation and layouts

## Tech stack

- React 18
- Vite 6
- JavaScript (ES modules)
- CSS
- Lucide React icons

## Run locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
call-centre-staff-app/
├── public/
├── src/
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Sample data and limitations

The app runs entirely in the browser. Call records use in-memory sample data, so newly added records and status changes reset when the page is refreshed. The chart and summary values are demo/illustrative values. No real customer information, telephony integration, authentication, or backend is connected.

## AI tools used

- **ChatGPT (OpenAI):** used to help scaffold and write the original React UI, sample data, responsive CSS, interaction logic, and this README.
- **No reference mock source code was copied.** The implementation was created as an original design based on the assignment description.

Review the code, run it locally, and make any changes needed before submission.
