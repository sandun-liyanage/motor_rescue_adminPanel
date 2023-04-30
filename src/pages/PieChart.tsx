import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import firebase from 'firebase/firestore';
import { db, auth } from "../services/firebase";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    getDocs,
  } from "firebase/firestore";
  

const PieChart = () => {
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const jobsRef = collection(db, "Jobs");

      const requestedJobs = await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'requested')));
      const acceptedJobs = await await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'accepted')));
      const canceledJobs = await await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'canceled')));
      const completedPaidJobs = await await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed/paid/')));
      const completedPaidRatedJobs = await await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed/paid/rated')));
      const completedPaidSkippedRatingJobs = await await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed/paid/skippedRating')));

      setJobData({
        labels: ['Requested', 'Accepted', 'Canceled', 'Completed/Paid', 'Completed/Paid/Rated', 'Completed/Paid/Skipped Rating'],
        datasets: [
          {
            label: 'Job Request Status',
            data: [
              requestedJobs.size,
              acceptedJobs.size,
              canceledJobs.size,
              completedPaidJobs.size,
              completedPaidRatedJobs.size,
              completedPaidSkippedRatingJobs.size,
            ],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#FFCE56',
              '#36A2EB',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#FFCE56',
              '#36A2EB',
            ],
          },
        ],
      });
    };

    fetchData();
  }, []);

  const chartData = {
    datasets: [
      {
        data: Object.values(jobData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FFCE56',
          '#36A2EB',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FFCE56',
          '#36A2EB',
        ],
      },
    ],
    labels: Object.keys(jobData),
  };

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default PieChart;