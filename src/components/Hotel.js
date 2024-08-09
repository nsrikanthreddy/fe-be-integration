import React, {useState,useEffect}from "react";
import axios from "axios";

function Hotel(){

    const HOTEL_URL = "http://localhost:8092/api/hotels"
    const [hotels,setHotels] = useState([]);
    const [showUpdate,setShowUpdate] = useState(false);
    // const [url,setUrl] = useState("");

    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [about,setAbout] = useState("");
    const [hotelId,setHotelId] = useState("");


    // const [hotelData, setHotelData] = useState({
    //     hotelId: "",
    //     name: "",
    //     location: "",
    //     about: ""
    //   });

    // const handleInput = (e)=>{
    //   const {name, value} =e.target;
    //   setHotelData((prev)=>({
    //     ...prev,
    //     [name] : [value]
    //   }))
    // }


    useEffect(()=>{
        fetchHotels();
    },[]);

    const fetchHotels = ()=>{
        axios.get(HOTEL_URL+"/getAllHotels")
          .then((response)=>{
            if(response.status === 200){
                setHotels(response.data);
            }
           })
          .catch((error)=>console.log("Error while fetching hotels",error));
    }

    const handleEdit = (e,index)=>{
     e.preventDefault();
    
       //alert(index);
    //    setShowUpdate(true);
    //    setHotelData(hotels[index]);
    setHotelId(hotels[index].hotelId)
    setName(hotels[index].name);
    setLocation(hotels[index].location);
    setAbout(hotels[index].about);
    setShowUpdate(true);
       
    }

    const handleDelete = (e,index) => {
        e.preventDefault();
        console.log(HOTEL_URL+`/deleteHotel/${hotels[index].hotelId}`);
        axios.delete(HOTEL_URL+`/deleteHotel/${hotels[index].hotelId}`)
        .then((response)=>{
          if(response.status === 200){
            alert("Hotel deleted successfully");
            fetchHotels();
          }
         })
        .catch((error)=>console.log("Error while fetching hotels",error));
        
    }

    const handleAddUpdate = (e)=>{
       e.preventDefault();
       console.log({
            hotelId: hotelId,
            name: name,
            location: location,
            about: about
          });
    //   console.log(hotelData);
      if(showUpdate){
        // setUrl(HOTEL_URL`/updateHotel/${hotelData.hotelId}`);
        axios.put(HOTEL_URL+`/updateHotel/${hotelId}`,{
            hotelId: hotelId,
            name: name,
            location: location,
            about: about
          })
        .then((response)=>{
          if(response.status === 200){
            alert("Hotel updated successfully");
            fetchHotels();
          }
         })
        .catch((error)=>console.log("Error while fetching hotels",error));
      }else{
        // setUrl(HOTEL_URL+"/createHotel");
        console.log(HOTEL_URL+"/createHotel");
        axios.post(HOTEL_URL+"/createHotel",{
            hotelId: hotelId,
            name: name,
            location: location,
            about: about
          })
          .then((response)=>{
            if(response.status === 201){
                alert("Hotel added successfully");
                fetchHotels();
            }
           })
          .catch((error)=>console.log("Error while fetching hotels",error));
      
      }
      setHotelId("")
    setName("");
    setLocation("");
    setAbout("");
      setShowUpdate(false);
    //   setHotelData({
    //     hotelId: "",
    //     name: "",
    //     location: "",
    //     about: ""
    //   });
     
    }
  


return(
    <div align="center">
     <form>
      <table border={1}>
         <thead>
            <tr>
                <th>Hotel Id</th>
                <th>Hotel Name</th>
                <th>Hotel Location</th>
                <th>About</th>
                <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            {
            hotels.map((hotel,index) => (
                <tr key={index}>
                <td>{hotel.hotelId}</td>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>{hotel.about}</td>
                <td>
                    <button type="submit" onClick={(e)=>handleEdit(e,index)}>Edit</button> 
                    <button type="submit" onClick={(e)=>handleDelete(e,index)}>Delete</button>
                </td>
            </tr>
            ))
        }
         </tbody>
      </table>
      <br/>
      Hotel Name : <input type="text" name="name" onChange={(e)=>{setName(e.target.value)}} value={name}/>
      <br/>
      Hotel Location : <input type="text" name="location" onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
      <br/>
      About Hotel  : <input type="text" name="about" onChange={(e)=>{setAbout(e.target.value)}} value={about}/>
      <br/>
      
      <button type="submit" onClick={(e)=>handleAddUpdate(e)}>{showUpdate ? "Update" : "Add"}</button> 

     </form>
    </div>
)

}
export default Hotel;