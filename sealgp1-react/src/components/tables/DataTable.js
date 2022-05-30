import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import GetName from "../getData/GetName";
import mongoose from 'mongoose';

const DataTable = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [data, setData] = useState([])

  useEffect(() => {
    const getTeamsData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/${props.category}?limit=20`, {
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

  console.log(props.fields)

  const displayFields = (
    props.fields.map((f) => {
      return (
        <th>{f}</th>
      )
    })

  )

  const displayData = (
    data.map((d) => {
      return (
        <tr key={d._id}>
              {props.fields.map((f) => {
                console.log(d[f])
                if (d[f].length === 24 && !/\s/.test(d[f])) {
                  switch (f) {
                    case "team":
                      return (
                        <td><GetName id={d[f]} category={"teams"}/></td>
                      )
                      break;
                      case "coach":
                        return (
                          <td><GetName id={d[f]} category={"coaches"}/></td>
                        )
                        break;
                    default:
                      break;
                  }

                }
                else
                return (
                <td>{d[f]}</td>
              )
    })}
          {/* {props.fields.map((f) => {<td>{d[f]}</td>)} */}
        </tr>
      )
    })
  )

  return (
    <Table>
      <thead>
        <tr>
          {displayFields}
        </tr>
      </thead>
      <tbody>
        {displayData}
      </tbody>
    </Table>
  );
};

export default DataTable;