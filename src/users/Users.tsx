import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc
} from "firebase/firestore";

import '../assets/modal.css';

export default function users() {
  const [user, setuser] = useState("drivers");
  const [btnclass, setbtnclass] = useState(
    "btn btn-outline-primary btn-lg active"
  );
  const [btnclass2, setbtnclass2] = useState("btn btn-outline-primary");

  const [filteredDrivers, setFilteredDrivers] = useState<any[]>([]);
  const [filteredMechanics, setFilteredMechanics] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [drivers, setDrivers] = useState<any[]>([]);
  const driversRef = collection(db, "Drivers");

  const [mechanics, setMechanics] = useState<any[]>([]);
  const mechanicsRef = collection(db, "Mechanics");

  //-------------------------------------------------

  useEffect(() => {
    const queryDrivers = query(driversRef);
    const unsuscribe = onSnapshot(queryDrivers, (snapshot) => {
      let drivers: any = [];
      snapshot.forEach((doc) => {
        drivers.push({ ...doc.data(), id: doc.id });
      });
      console.log(drivers);
      setDrivers(drivers);
    });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const filteredDrivers = drivers.filter((driver) => {
      const fname = driver.fname || "";
      const lname = driver.lname || "";
      const email = driver.email || "";
      const address = driver.address || "";
      const phone = driver.phone || "";

      return (
        fname.toLowerCase().includes(search.toLowerCase()) ||
        lname.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase()) ||
        address.toLowerCase().includes(search.toLowerCase()) ||
        phone.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredDrivers(filteredDrivers);
  }, [search, drivers]);

  //---------------------------------------

  useEffect(() => {
    const queryMechanics = query(mechanicsRef);
    const unsuscribe = onSnapshot(queryMechanics, (snapshot) => {
      let mechanics: any = [];
      snapshot.forEach((doc) => {
        mechanics.push({ ...doc.data(), id: doc.id });
      });
      console.log(mechanics);
      setMechanics(mechanics);
    });

    return () => unsuscribe();
  }, []);

  useEffect(() => {
    const filteredMechanics = mechanics.filter((mechanic) => {
      const fname = mechanic.fname || "";
      const lname = mechanic.lname || "";
      const email = mechanic.email || "";
      const address = mechanic.address || "";
      const phone = mechanic.phone || "";
      const rating = mechanic.rating ? mechanic.rating.toString() : "";

      return (
        fname.toLowerCase().includes(search.toLowerCase()) ||
        lname.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase()) ||
        address.toLowerCase().includes(search.toLowerCase()) ||
        phone.toLowerCase().includes(search.toLowerCase()) ||
        rating.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredMechanics(filteredMechanics);
  }, [search, mechanics]);

  //-----------------------------------------

  function btnClick(usertype: any) {
    if (usertype == "drivers") {
      setbtnclass("btn btn-outline-primary btn-lg active");
      setbtnclass2("btn btn-outline-primary");
      setuser("drivers");
    }
    if (usertype == "mechanics") {
      setbtnclass("btn btn-outline-primary");
      setbtnclass2("btn btn-outline-primary btn-lg active");
      setuser("mechanics");
    }
  }

  //------------------------------------------

  function _deleteDoc(id: any, collection:any){
    const docRef = doc(db, collection, id);
    deleteDoc(docRef)
    .then(() => {
        console.log("Document has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    })
  }

  //----------------------------------------------

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  var rowNum = 1;

  if (user == "drivers") {
    return (
      <>
        <center>
          <button
            type="button"
            className={btnclass}
            style={{ marginTop: "25px", marginBottom: "10px" }}
            onClick={(e) => btnClick("drivers")}
          >
            Drivers
          </button>
          <button
            type="button"
            className={btnclass2}
            style={{ marginTop: "25px", marginBottom: "10px" }}
            onClick={(e) => btnClick("mechanics")}
          >
            Mechanics
          </button>
        </center>

        <center>
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
              <th scope="col">First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => {
              return (
                <tr key={driver.id}>
                  <th scope="row" style={{ width: "50px" }}>
                    {rowNum++}
                  </th>
                  <td>{driver.fname}</td>
                  <td> {driver.lname}</td>
                  <td>
                    {" "}
                    <a href={"mailto:" + driver.email}> {driver.email}</a>
                  </td>
                  <td> {driver.address}</td>
                  <td> {driver.phone}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={(e) => _deleteDoc(driver.id, "Drivers")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <center>
          <button
            type="button"
            className={btnclass}
            style={{ marginTop: "25px", marginBottom: "10px" }}
            onClick={(e) => btnClick("drivers")}
          >
            Drivers
          </button>
          <button
            type="button"
            className={btnclass2}
            style={{ marginTop: "25px", marginBottom: "10px" }}
            onClick={(e) => btnClick("mechanics")}
          >
            Mechanics
          </button>
        </center>

        <center>
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
              <th scope="col">First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredMechanics.map((mechanic) => {
              return (
                <tr key={mechanic.id}>
                  <th scope="row" style={{ width: "50px" }}>
                    {rowNum++}
                  </th>
                  <td>{mechanic.fname}</td>
                  <td> {mechanic.lname}</td>
                  <td>
                    {" "}
                    <a href={"mailto:" + mechanic.email}> {mechanic.email}</a>
                  </td>
                  <td> {mechanic.address}</td>
                  <td> {mechanic.phone}</td>
                  <td> {mechanic.rating}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      style={{ marginRight: "10px" }}
                      onClick={toggleModal}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      style={{ marginLeft: "10px" }}
                      
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {modal && (
        <div className="modalz">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modalz-content">
            <h2>Warning</h2>
            <p>
              Do you want to delete the selected document?
            </p>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
            <div className="btnClass">
            <button type="button" className="btn btn-outline-primary" style={{marginRight:"10px"}} onClick={toggleModal}>Cancel</button>
            <button type="button" className="btn btn-danger" >Delete</button>
            </div>
          </div>
        </div>
      )}
      
        
      </>
    );
  }
}
