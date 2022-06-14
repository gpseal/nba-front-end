import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

const GetName = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [data, setData] = useState([])

  useEffect(() => {
    const getTeamsData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/${props.category}/${props.id}`, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })

        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }   
    }
    getTeamsData()
  }, [])

  
  
      if (props.category === "teams") {
        return (data.name);
      }
      else
      return (`${data.firstName} ${data.lastName}`);
    
  
};

export default GetName;