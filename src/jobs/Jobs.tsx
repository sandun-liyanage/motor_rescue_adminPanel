import { useState, useEffect } from "react";
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
  Timestamp,
} from "firebase/firestore";

interface Job {
  id: string;
  driverEmail: string;
  mechanicEmail: string;
  date: string;
  jobRequestStatus: string;
  fee: number;
  rating: number;
  feedback: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const jobsRef = collection(db, "Jobs");
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const queryJobs = query(jobsRef);
    const unsuscribe = onSnapshot(queryJobs, (snapshot) => {
      let jobs: any = [];
      snapshot.forEach((doc) => {
        jobs.push({ ...doc.data(), id: doc.id });
      });
      console.log(jobs);
      setJobs(jobs);
    });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      const driverEmail = job.driverEmail || "";
      const mechanicEmail = job.mechanicEmail || "";
      const vehicle = job.vehicle || "";
      const date = job.date || "";
      const jobRequestStatus = job.jobRequestStatus || "";
      const fee = job.fee ? job.fee.toString() : "";
      const rating = job.rating ? job.rating.toString() : "";
      const feedback = job.feedback || "";

      return (
        driverEmail.toLowerCase().includes(search.toLowerCase()) ||
        mechanicEmail.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.toLowerCase().includes(search.toLowerCase()) ||
        date.toLowerCase().includes(search.toLowerCase()) ||
        jobRequestStatus.toLowerCase().includes(search.toLowerCase()) ||
        fee.toLowerCase().includes(search.toLowerCase()) ||
        rating.toLowerCase().includes(search.toLowerCase()) ||
        feedback.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredJobs(filteredJobs);
  }, [search, jobs]);

  var rowNum = 1;

  return (
    <>
      <center>
        <h1 className="display-4">Jobs</h1>

        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          style={{ width: "80%" }}
          id="search"
          type="text"
          placeholder="Search Filter"
          onChange={(e) => setSearch(e.target.value)}
        />

        <br />
        <br />
      </center>

      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Driver's Email</th>
            <th>Mechanic's Email</th>
            <th>Vehicle Number</th>
            <th>Job Description</th>
            <th>Date</th>
            <th>Job Status</th>
            <th>Fee</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => {
            return (
              <tr key={job.id}>
                <th scope="row" style={{ width: "50px" }}>
                  {rowNum++}
                </th>
                <td>
                  <a href={"mailto:" + job.driverEmail}> {job.driverEmail}</a>
                </td>
                <td>
                  {" "}
                  <a href={"mailto:" + job.mechanicEmail}>
                    {" "}
                    {job.mechanicEmail}
                  </a>
                </td>
                
                <td> {job.vehicle}</td>
                <td> {job.description}</td>
                <td> {job.date}</td>
                <td> {job.jobRequestStatus}</td>
                <td> {job.fee}</td>
                <td> {job.rating}</td>
                <td> {job.feedback}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
