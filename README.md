React Timer App
A simple and intuitive timer app built with React that allows users to create, manage, and interact with multiple customizable timers.

Features

Create new timers with:
Name
Duration (in minutes)
Category (e.g., Work, Break, Study, Custom)
 Grouped view of timers by category
Expandable/collapsible category sections
Start, Pause, Reset controls per timer
Bulk actions per category: Start All, Pause All, Reset All
Progress bar showing time completed
Modal notification when a timer completes
LocalStorage persistence — data stays even after refresh

Setup Instructions:
Prerequisites
Node.js (v14 or higher)
npm (comes with Node.js)
 Step-by-step

git clone https://github.com/avinroy001/healthFlex.git
cd react-timer-app
Install dependencies :
npm install
Start the development server :
npm start
The app will open at http://localhost:3000

📁 Project Structure

react-timer-app/
├── public/
├── src/
│   ├── components/
│   │   ├── AddTimer.js
│   │   ├── TimerItem.js
│   │   ├── TimerList.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── styles/
│       ├── Timer.css
│       ├── TimerItem.css
│       └── ...
├── README.md
└── package.json
Assumptions Made During Development

Timer duration input is in minutes , not seconds.
Timers are stored in localStorage , so all data persists across page reloads.
Each timer has a unique ID generated using Date.now() .
Completed timers are not removed , but marked with status "Completed".
Bulk actions only affect visible (expanded) categories .
Modal appears only once per completion and disappears when closed.
No backend is used — all data is stored locally.
Icons are taken from react-icons (specifically Font Awesome).
React state is used for managing UI logic , and localStorage handles persistent storage.
All components are client-side rendered — no SSR or API calls.

Optional Enhancements (Future Ideas)

Export timer history as JSON
Add sound notifications on completion
Support dark/light mode toggle
Track timer history and display it in a separate screen
Export Timer Data – Allow users to export timer history as a JSON file 
Custom Themes – Add support for light and dark modes with a theme switcher 
Category Filtering – Add a dropdown to filter timers by category 