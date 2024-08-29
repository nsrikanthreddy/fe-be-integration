import React, { useState, useEffect } from "react";
import axios from "axios";

function PatientManagement() {
    //const PATIENT_SERVICE_URL = "http://localhost:9091/api/patients";
    //const DOCTOR_SERVICE_URL = "http://localhost:9090/api/doctors";
    let hostName = window.location.hostname;
    const patient_host = 'https://'+hostName.replace('9092','9091')+"/api/patients";
    const doctor_host = 'https://'+hostName.replace('9092','9090')+"/api/doctors";
    const [showUpdate, setShowUpdate] = useState(false);
    const [patients, setPatients] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [doctorId, setDoctorId] = useState("");
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



    const handleEdit = (e, index) => {
        e.preventDefault();

        setId(patients[index].id);
        setName(patients[index].name);
        setAge(patients[index].age);
        setEmergencyContactPhone(patients[index].emergencyContactPhone);
        setDoctorId(patients[index].doctorId);
        setShowUpdate(true);

    }

    const handleDelete = (e, index) => {
        e.preventDefault();
        //console.log(PATIENT_SERVICE_URL + `/${patients[index].id}`);
        //axios.delete(PATIENT_SERVICE_URL + `/${patients[index].id}`);
        console.log(patient_host + `/${patients[index].id}`);
        axios.delete(patient_host + `/${patients[index].id}`)
            .then((response) => {
                if (response.status === 200) {
                    alert("Patient deleted successfully");
                    fetchPatients();
                }
            })
            .catch((error) => console.log("Error while deleting patient", error));

    }

    const handleAddUpdate = (e) => {
        e.preventDefault();
        console.log({
            id: id,
            name: name,
            age: age,
            emergencyContactPhone: emergencyContactPhone,
            doctorId: doctorId
        });
        if (showUpdate) {
            //axios.put(PATIENT_SERVICE_URL + `/${id}`, {
            axios.put(patient_host + `/${id}`, {
                id: id,
                name: name,
                age: age,
                emergencyContactPhone: emergencyContactPhone,
                doctorId: doctorId
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert("Patient updated successfully");
                        fetchPatients();
                    }
                })
                .catch((error) => console.log("Error while updating patient", error));
        } else {
            //axios.post(PATIENT_SERVICE_URL, {
            axios.post(patient_host, {
                id: id,
                name: name,
                age: age,
                emergencyContactPhone: emergencyContactPhone,
                doctorId: doctorId
            })
                .then((response) => {
                    if (response.status === 201) {
                        alert("Patient added successfully");
                        fetchPatients();
                    }
                })
                .catch((error) => console.log("Error while adding patient", error));

        }
        setId("");
        setName("");
        setAge("");
        setEmergencyContactPhone("");
        setDoctorId("");
        setShowUpdate(false);
    }

    
    return (
        <div align="center">
            <h3>Patients List</h3>
            <form>
                <table border={1} class="table table-striped">
                    <thead>
                        <tr>
                            <th>Patient Id</th>
                            <th>Patient Name</th>
                            <th>Age</th>
                            <th>Emergency ContactPhone</th>
                            <th>DoctorId</th>
                            <th>Actions</th>
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
                                    <td>{patient.doctorId}</td>
                                    <td>
                                        <button type="submit" class="btn btn-primary" onClick={(e) => handleEdit(e, index)}>Edit</button>&nbsp;&nbsp;
                                        <button type="submit" class="btn btn-danger" onClick={(e) => handleDelete(e, index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                            :
                            <tr>No data found.....</tr>
                        }
                    </tbody>
                </table>
                <br />
                <h3>Add/Update Patient</h3>
                <div class="row">
                    <div class="form-group col-6">
                        Patient Name : <input class="form-control" type="text" name="name" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <div class="form-group col-6">
                        Age : <input class="form-control" type="text" name="age" onChange={(e) => { setAge(e.target.value) }} value={age} />
                    </div>

                </div>
                <div class="row">
                    <div class="form-group col-6">
                        Emergency ContactPhone  : <input type="text" class="form-control" name="emergencyContactPhone" onChange={(e) => { setEmergencyContactPhone(e.target.value) }} value={emergencyContactPhone} />
                    </div>
                    <div class="form-group col-6">
                        Doctor  :
                        <select class="form-control" name="doctorId" value={doctorId} onChange={(e) => { setDoctorId(e.target.value) }}>
                            <option value="">select a value</option>
                            {doctors.map((doctor, index) => (
                                <option value={doctor.id}>{doctor.name}--{doctor.specialty}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" class="bn btn-success" onClick={(e) => handleAddUpdate(e)}>{showUpdate ? "Update" : "Add"}</button>

            </form>
        </div>
    )
}
export default PatientManagement;
