import React, { useState, useEffect } from 'react';

import "../assets/home.css";
import PieChart from './PieChart';
import JobsChart from './JobsChart';

export default function Home() {
  return (
    <div>
      <center>
        <div className="container shadow p-3 mb-5 bg-white rounded ">
          <center>
            <h1 className="display-6">Total Drivers</h1>
            <strong>
              <h1 className="display-4">15</h1>
            </strong>
          </center>
        </div>

        <div className="container shadow p-3 mb-5 bg-white rounded">
          <center>
            <h1 className="display-6">Total Mechanics</h1>
            <strong>
              <h1 className="display-4">11</h1>
            </strong>
          </center>
        </div>

        <div className="container shadow p-3 mb-5 bg-white rounded">
          <center>
            <h1 className="display-6">Active Jobs</h1>
            <strong>
              <h1 className="display-4">11</h1>
            </strong>
          </center>
        </div>
      </center>

      <div style={{width:"40%"}}>
      <JobsChart />
      </div>
      
    </div>
  );
}
