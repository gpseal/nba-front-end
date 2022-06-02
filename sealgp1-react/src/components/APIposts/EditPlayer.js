import axios from "axios";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditTeamForm from "../forms/EditTeamForm";
import EditPlayerForm from "../forms/EditPlayerForm";

const EditPlayer = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [data, setData] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const getTeamData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/teams/${id}`, {
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

  console.log(data.name)
  //waits for data.name to have loaded before rendering
  // return data.name ? <EditTeamForm data={data}/> : <div>Loading....</div> 
  return <EditPlayerForm />
  
};

export default EditPlayer;