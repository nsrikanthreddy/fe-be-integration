import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [showDoctors, setShowDoctors] = useState(true);
  //const PATIENT_SERVICE_URL = "http://localhost:9091/api/patients";
  //const DOCTOR_SERVICE_URL = "http://localhost:9090/api/doctors";
  let hostName = window.location.hostname;
  let hostNameForDoctorService = window.location.hostname;
  const patient_host = 'https://'+hostName.replace('3000','9091')+"/api/patients";
  const doctor_host = 'https://'+hostNameForDoctorService.replace('3000','9090')+"/api/doctors";
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = () => {
    //axios.get(PATIENT_SERVICE_URL)
    axios.get(patient_host)
      .then((response) => {
        if (response.status === 200) {
          setPatients(response.data);
        }
      })
      .catch((error) => console.log("Error while fetching patients", error));
  }

  const fetchDoctors = () => {
    //axios.get(DOCTOR_SERVICE_URL)
    axios.get(doctor_host)
      .then((response) => {
        if (response.status === 200) {
          setDoctors(response.data);
        }
      })
      .catch((error) => console.log("Error while fetching doctors", error));
  }

  const searchByDoctorName = (name) => {
    //console.log(PATIENT_SERVICE_URL + `/doctor/${name}`);
    console.log(patient_host + `/doctor/${name}`);
    if (name === "" || name === null || name === "undefined") {
      //setPatients([]);
      fetchPatients();
      return;
    }
    //axios.get(PATIENT_SERVICE_URL + `/doctor/${name}`)
    axios.get(patient_host + `/doctor/${name}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length > 0) {
            setPatients(response.data);
          } else {
            setPatients([]);
          }
        } else {
          setPatients([]);
        }
      })
      .catch((error) => console.log("Error while fetching patients", error));
  }
  
  const searchByPatientName = (name) => {
    //console.log(PATIENT_SERVICE_URL + `/searchByName/${name}`);
    console.log(patient_host + `/searchByName/${name}`);

    if (name === "" || name === null || name === "undefined") {
      //setPatients([]);
      fetchPatients();
      return;
    }
    //axios.get(PATIENT_SERVICE_URL + `/searchByName/${name}`)
    axios.get(patient_host + `/searchByName/${name}`)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length > 0) {
            setPatients(response.data);
          } else {
            setPatients([]);
          }
        } else {
          setPatients([]);
        }
      })
      .catch((error) => console.log("Error while fetching patients", error));
  }

  
  const searchByDoctorsName = (name) => {
    //console.log(DOCTOR_SERVICE_URL + "/searchByName");
    console.log(doctor_host + "/searchByName");

    if (name === "" || name === null || name === "undefined") {
      fetchDoctors();
      return;
    }
    //axios.get(DOCTOR_SERVICE_URL + "/searchByName?name="+name)
    axios.get(doctor_host + "/searchByName?name="+name)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.length > 0) {
            setDoctors(response.data);
          } else {
            setDoctors([]);
          }
        } else {
          setDoctors([]);
        }
      })
      .catch((error) => console.log("Error while fetching patients", error));
  }

  return (
    <>
      <br />
      {showDoctors ?
        <div>
          <button type="submit" class="btn btn-success btnleft" onClick={() => setShowDoctors(false)}>View Doctors</button>
          <br />
          <br />
          <div align="center">
            <div class="row">
              <div class="form-group col-6">
                <input class="form-control" type="text" name="name" onChange={(e) => { searchByDoctorName(e.target.value) }} placeholder="Search By Doctor Name" />
              </div>
              <div class="form-group col-6">
                <input class="form-control" type="text" name="name" onChange={(e) => { searchByPatientName(e.target.value) }} placeholder="Search By Patient Name" />
              </div>

            </div>
            <h5>Patients List</h5>
            <table border={1} class="table table-striped">
              <thead>
                <tr>
                  <th>Patient Id</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Emergency ContactPhone</th>
                  <th>Doctor Name</th>
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ?
                  patients.map((patient, index) => (
                    <tr key={index}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.emergencyContactPhone}</td>
                      <td>
                      {doctors.map((doctor) => (
                        doctor.id === patient.doctorId ? doctor.name :""
                      ))}
                      </td>
                    </tr>
                  ))
                  :
                  <tr>No data found.....</tr>
                }
              </tbody>
            </table>

          </div>



        </div>
        :
        <div>
          <button type="submit" class="btn btn-success btnleft" onClick={() => setShowDoctors(true)}>View Patients</button>
          <br />
          <br />
          <div align="center">
            <div class="row">
              <div class="form-group col-12">
                <input class="form-control" type="text" name="name" onChange={(e) => { searchByDoctorsName(e.target.value) }} placeholder="Search By Doctor Name" />
              </div>

            </div>
            <h5>Doctors List</h5>
            <table border={1} class="table table-striped" data-spy="scroll" data-target="#myScrollspy">
              <thead>
                <tr>
                  <th>Doctor Id</th>
                  <th>Doctor Name</th>
                  <th>Speciality</th>
                  <th>Hospital Affiliation</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody id="myScrollspy">
                { doctors.length > 0 ?
                  doctors.map((doctor, index) => (
                    <tr key={index}>
                      <td>{doctor.id}</td>
                      <td>{doctor.name}</td>
                      <td>{doctor.specialty}</td>
                      <td>{doctor.hospitalAffiliation}</td>
                      <td>{doctor.contactPhone}</td>
                    </tr>
                  ))
                  :
                  <tr>No data found.....</tr>
                }
              </tbody>
            </table>

          </div>
        </div>
      }
    </>
  )
}
export default Home;
