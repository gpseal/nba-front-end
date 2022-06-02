import axios from "axios";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditTeamForm from "../forms/EditTeamForm";
import EditPlayerForm from "../forms/EditPlayerForm";
import EditCoachForm from "../forms/EditCoachForm";

const UpdateData = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [data, setData] = useState([])

  const {id} = useParams();

  const recordID = id.substring(id.indexOf('-') + 1);
  const category = id.substring(0, id.indexOf('-'))

  console.log(recordID)
  console.log(category)

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/${category}/${recordID}`, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        setData(await res.data.data)
      } catch (error) {
        console.log(error)
      }   
    }
    getTeamData()
  }, [])

  console.log(data)

  //waits for data.name to have loaded before rendering
  if (category === "teams") {
    return data.name ? <EditTeamForm id = {recordID} data={data} /> : <div>Loading....</div> 
  }

  if (category === "players") {
    return data.firstName ? <EditPlayerForm id = {recordID} data={data} /> : <div>Loading....</div> 
  }

  if (category === "coaches") {
    return data.firstName ? <EditCoachForm id = {recordID} data={data} /> : <div>Loading....</div> 
  }
  
      
      
      
      
      
//   return "test"
  
};

export default UpdateData;