import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
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

export default function JobsChart() {
    var [requestedJobs,setrequestedJobs] = useState(0);
    var [acceptedJobs,setacceptedJobs] = useState(0);
    var [canceledJobs,setcanceledJobs] = useState(0);
    var [declinedJobs,setdeclinedJobs] = useState(0);
    var [completedJobs,setcompletedJobs] = useState(0);
    var [completedPaidJobs,setcompletedPaidJobs] = useState(0);
    var [completedPaidRatedJobs,setcompletedPaidRatedJobs] = useState(0);
    var [completedPaidSkippedRatingJobs,setcompletedPaidSkippedRatingJobs] = useState(0);
   

    useEffect(() => {
        const fetchData = async () => {
          const jobsRef = collection(db, "Jobs");

      //const requestedJobs = await onSnapshot(query(jobsRefwhere('jobRequestStatus', '==', 'requested')));

    
           const requestedJobs = (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'requested')))).size;
          const acceptedJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'accepted')))).size;
          const canceledJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'canceled')))).size;
          const declinedJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'declined')))).size;
          const completedJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed')))).size;
          const completedPaidJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed/paid')))).size;
          const completedPaidRatedJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed/paid/rated')))).size;
          const completedPaidSkippedRatingJobs = await (await getDocs(query(jobsRef,where('jobRequestStatus', '==', 'completed/paid/skippedRating')))).size;
        
          setrequestedJobs(requestedJobs);
          setacceptedJobs(acceptedJobs);
          setcanceledJobs(canceledJobs);
          setdeclinedJobs(declinedJobs);
          setcompletedJobs(completedJobs);
            setcompletedPaidJobs(completedPaidJobs);
            setcompletedPaidRatedJobs(completedPaidRatedJobs);
            setcompletedPaidSkippedRatingJobs(completedPaidSkippedRatingJobs);
        }
    
        fetchData();
      }, []);


  return (
    <React.Fragment>
      <div className="container-fluid mt-3 mb-3">
        <center><h1 className="display-6">Jobs Analysis</h1></center>
        <Chart
          type="donut"
          width={600}
          height={350}
          series={[requestedJobs, acceptedJobs, canceledJobs, declinedJobs, completedJobs, completedPaidJobs, completedPaidRatedJobs, completedPaidSkippedRatingJobs]}
          options={{
            labels: ["Requested", "Accepted/ Ongoing", "Canceled by Driver", "Declined by Mechanic", "Completed, Not Paid", "Completed and Paid", "Completed, Paid, and Rated", "Completed, Paid, and Skipped Rating"],
            //  title:{
            //     text:"Medal Country Name",
            //     align:"center",
            //  },

            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      showAlways: true,
                      //formatter: () => '343',
                      //fontSize:30,
                      color: "#f90000",
                      
                    },
                  },
                },
              },
            },

            dataLabels: {
              enabled: true,
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
