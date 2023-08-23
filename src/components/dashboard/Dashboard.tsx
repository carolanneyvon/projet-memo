import React from 'react';
import Column from './Column';

function Dashboard() {
  // Fetch data from the server and manage it using useState/useEffect

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard">
        <Column label="À apprendre" />
        <Column label="Je sais un peu" />
        <Column label="Je sais bien" />
        <Column label="Je sais parfaitement" />
      </div>
    </div>
  );
}

export default Dashboard;
