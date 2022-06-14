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

//break apart URL to determine id and category
    let recordID = "/" + (id.substring(id.indexOf('-') + 1));
    let category = (id.substring(0, id.indexOf('-')))

    console.log(recordID)

    //if URL contains a "-" then table will be populated as this indicates a record EDIT, otherwise recordID and category
    // should be reversed to enable the API URL to function correctly
    if (id.indexOf("-") === -1) {
        category = recordID.substring(1);
        recordID = ""
    }

    console.log(recordID)
    

    // const recordID = "/" + (id.substring(id.indexOf('-') + 1));
    // const category = (id.substring(0, id.indexOf('-')))




//   console.log(id.indexOf("-"))
//   console.log(category)
  


  useEffect(() => {
        console.log("here")
        const getTeamData = async () => {
            try {
              const res = await axios.get(`${BASE_URL}/api/v1/${category}${recordID}`, {
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

  if ( recordID == "") {
    console.log("record undefined")
    // console.log(category)
         if (category === "teams") {
        return <EditTeamForm id = {recordID} data={data} action={"Add"}/>
      }
    }

else{
    if (category === "teams") {
        console.log("record defined")
        return data.name ? <EditTeamForm id = {recordID} data={data} action={"Edit"}/> : <div>Loading....</div> 
      }
    
      if (category === "players") {
        return data.firstName ? <EditPlayerForm id = {recordID} data={data} action={"Edit"}/> : <div>Loading....</div> 
      }
    
      if (category === "coaches") {
        return data.firstName ? <EditCoachForm id = {recordID} data={data} action={"Edit"}/> : <div>Loading....</div> 
      }

}

  
};

export default UpdateData;