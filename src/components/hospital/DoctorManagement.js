import React, {useEffect,useState} from "react";
import axios from "axios";

function DoctorManagement() {

    const DOCTOR_SERVICE_URL = "http://localhost:9090/api/doctors";
    const [showUpdate, setShowUpdate] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [hospitalAffiliation, setHospitalAffiliation] = useState("");
    const [contactPhone, setContactPhone] = useState("");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        axios.get(DOCTOR_SERVICE_URL)
            .then((response) => {
                if (response.status === 200) {
                    setDoctors(response.data);
                }
            })
            .catch((error) => console.log("Error while fetching doctors", error));
    }



    const handleEdit = (e, index) => {
        e.preventDefault();

        setId(doctors[index].id);
        setName(doctors[index].name);
        setSpecialty(doctors[index].specialty);
        setHospitalAffiliation(doctors[index].hospitalAffiliation);
        setContactPhone(doctors[index].contactPhone);
        setShowUpdate(true);

    }

    const handleDelete = (e, index) => {
        e.preventDefault();
        console.log(DOCTOR_SERVICE_URL + `/${doctors[index].id}`);
        axios.delete(DOCTOR_SERVICE_URL + `/${doctors[index].id}`)
            .then((response) => {
                if (response.status === 204) {
                    alert("Doctor deleted successfully");
                    fetchDoctors();
                }
            })
            .catch((error) => console.log("Error while deleting doctors", error));

    }

    const handleAddUpdate = (e) => {
        e.preventDefault();
        console.log({
            id: id,
            name: name,
            specialty: specialty,
            hospitalAffiliation: hospitalAffiliation,
            contactPhone: contactPhone
        });
        if (showUpdate) {
            axios.put(DOCTOR_SERVICE_URL + `/${id}`, {
                id: id,
                name: name,
                specialty: specialty,
                hospitalAffiliation: hospitalAffiliation,
                contactPhone: contactPhone
            })
                .then((response) => {
                    if (response.status === 200) {
                        alert("Doctors updated successfully");
                        fetchDoctors();
                    }
                })
                .catch((error) => console.log("Error while updating doctor", error));
        } else {
            axios.post(DOCTOR_SERVICE_URL, {
                name: name,
                specialty: specialty,
                hospitalAffiliation: hospitalAffiliation,
                contactPhone: contactPhone
            })
                .then((response) => {
                    if (response.status === 201) {
                        alert("Doctor added successfully");
                        fetchDoctors();
                    }
                })
                .catch((error) => console.log("Error while adding doctor", error));

        }
        setId("");
        setName("");
        setSpecialty("");
        setHospitalAffiliation("");
        setContactPhone("");
        setShowUpdate(false);
    }

    return (
        <div align="center">
            <h3>Doctors List</h3>
            <form>
                <table border={1} class="table table-striped" data-spy="scroll" data-target="#myScrollspy">
                    <thead>
                        <tr>
                            <th>Doctor Id</th>
                            <th>Doctor Name</th>
                            <th>Speciality</th>
                            <th>Hospital Affiliation</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="myScrollspy">
                        {
                            doctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td>{doctor.id}</td>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>{doctor.hospitalAffiliation}</td>
                                    <td>{doctor.contactPhone}</td>
                                    <td>
                                        <button type="submit" class="btn btn-primary" onClick={(e) => handleEdit(e, index)}>Edit</button> &nbsp;&nbsp;
                                        <button type="submit" class="btn btn-danger" onClick={(e) => handleDelete(e, index)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <br />
                <h3>Add/Update Doctor</h3>
                <div class="row">
                    <div class="form-group col-6">
                    Doctor Name : <input class="form-control" type="text" name="name" onChange={(e) => { setName(e.target.value) }} value={name} />
                    </div>
                    <div class="form-group col-6">
                     Specialty : <input class="form-control" type="text" name="specialty" onChange={(e) => { setSpecialty(e.target.value) }} value={specialty} />
                     </div>
                   
                </div>
                <div class="row">
                <div class="form-group col-6">
                Hospital Affiliation  : <input type="text" class="form-control" name="hospitalAffiliation" onChange={(e) => { setHospitalAffiliation(e.target.value) }} value={hospitalAffiliation} />
                </div>
                <div class="form-group col-6">
                Contact Number  : <input type="text" class="form-control" name="contactPhone" onChange={(e) => { setContactPhone(e.target.value) }} value={contactPhone} />
                </div>
                </div>
                <button type="submit" class="bn btn-success" onClick={(e) => handleAddUpdate(e)}>{showUpdate ? "Update" : "Add"}</button>

                
            </form>
        </div>
    )
}
export default DoctorManagement;