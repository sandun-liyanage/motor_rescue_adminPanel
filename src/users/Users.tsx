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
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

import "../assets/modal.css";

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

  function _deleteDoc(id: any, collection: any) {
    const docRef = doc(db, collection, id);
    deleteDoc(docRef)
      .then(() => {
        console.log("Document has been deleted successfully.");
        toggleModal();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //----------------------------------------------

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //----------------------------------------------------

  const [formModal, setFormModal] = useState(false);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  const [docid, setdocid] = useState("");
  const [collectionName, setcollectionName] = useState("");

  async function _editUsers(id: string, collection: string) {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setfname(docSnap.data().fname);
      setlname(docSnap.data().lname);
      setemail(docSnap.data().email);
      setaddress(docSnap.data().address);
      setphone(docSnap.data().phone);

      setdocid(id);
      setcollectionName(collection);
    } else {
      console.log("No such document!");
    }

    toggleFormModal();
  }

  async function handleFormSubmit() {
    const docRef = doc(db, collectionName, docid);
    const docSnap = await getDoc(docRef);

    await updateDoc(docRef, {
      fname: fname,
      lname: lname,
      email: email,
      address: address,
      phone: phone,
    })
      .then((docRef) => {
        console.log("successfully updated");
        toggleupdateModal();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(docRef);
    toggleFormModal();
  }

  const toggleFormModal = () => {
    setFormModal(!formModal);
  };

  if (formModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //----------------------------------------------

  const [updateModal, setupdateModal] = useState(false);
  const toggleupdateModal = () => {
    setupdateModal(!updateModal);
  };

  if (updateModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  //--------------------------------------------------------

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
                      onClick={(e) => _editUsers(driver.id, "Drivers")}
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

        {modal && (
          <div className="modalz">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modalz-content">
              <h2>Alert</h2>
              <p>Document has been deleted successfully.</p>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
              <div className="btnClass">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={toggleModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {formModal && (
          <div className="modalz">
            <div onClick={toggleFormModal} className="overlay"></div>
            <div className="modalz-content" style={{ width: "40%" }}>
              <button className="close-modal" onClick={toggleFormModal}>
                X
              </button>
              <center><h1 className="display-6">Edit User</h1><br/></center>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Enter Last Name"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <br />
                <div className="btnClass">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => handleFormSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {updateModal && (
          <div className="modalz">
            <div onClick={toggleupdateModal} className="overlay"></div>
            <div className="modalz-content">
              <h2>Alert</h2>
              <p>Document has been updated successfully.</p>
              <button className="close-modal" onClick={toggleupdateModal}>
                X
              </button>
              <div className="btnClass">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={toggleupdateModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
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
                      onClick={(e) => _editUsers(mechanic.id, "Mechanics")}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={(e) => _deleteDoc(mechanic.id, "Mechanics")}
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
              <h2>Alert</h2>
              <p>Document has been deleted successfully.</p>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
              <div className="btnClass">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={toggleModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        {formModal && (
          <div className="modalz">
            <div onClick={toggleFormModal} className="overlay"></div>
            <div className="modalz-content" style={{ width: "40%" }}>
              <button className="close-modal" onClick={toggleFormModal}>
                X
              </button>
              <center><h1 className="display-6">Edit User</h1><br/></center>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    placeholder="First Name"
                    value={fname}
                    onChange={(e) => setfname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    placeholder="Enter Last Name"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                  />
                </div>
                <br />
                <div className="btnClass">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => handleFormSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {updateModal && (
          <div className="modalz">
            <div onClick={toggleupdateModal} className="overlay"></div>
            <div className="modalz-content">
              <h2>Alert</h2>
              <p>Document has been updated successfully.</p>
              <button className="close-modal" onClick={toggleupdateModal}>
                X
              </button>
              <div className="btnClass">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={toggleupdateModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
