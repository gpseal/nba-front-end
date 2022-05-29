import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

const InstitutionsTable = () => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [data, setData] = useState([])

  useEffect(() => {
    const getTeamsData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/teams`, {
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

  console.log(data)

  const displayTeamsData = (
    data.map((d) => {
      return (
        <tr key={d._id}>
          <td>{d.name}</td>
          <td>{d.city}</td>
          <td>{d.conference}</td>
        </tr>
      )
    })
  )

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>Division</th>
        </tr>
      </thead>
      <tbody>
        {displayTeamsData}
      </tbody>
    </Table>
  );
};

export default InstitutionsTable;