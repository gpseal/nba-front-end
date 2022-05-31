import axios from "axios";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditTeamForm from "../forms/EditTeamForm";

const EditTeam = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

    const [email, setEmail] = useState("");

  

  const [isHome, setIsHome] = useState(false);
  const [authError, setAuthError] = useState(false); // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false); // Used for network errors

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

        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }   
    }
    getTeamData()
  }, [])

  console.log(data.name)

  return (
    <EditTeamForm />
  );
};

export default EditTeam;