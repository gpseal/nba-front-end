import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import GetName from "../getData/GetName";
import mongoose from 'mongoose';
import EditButton from "../buttons/EditButton";

const DataTable = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [data, setData] = useState([])

  useEffect(() => {
    const getTeamsData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/${props.category}?limit=5`, {
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
  console.log(data)

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
            switch (f) {
              case "edit":
                return <td><EditButton category={props.category} id={d._id} data={"test"}/></td>
                break;
              case "coach":
                return <td>{`${d[f].firstName} ${d[f].lastName}`}</td>
                break;           
              case "team":
                return <td>{d[f].name}</td>
                break; 
              default:
                return <td>{d[f]}</td>
                break;
            }
            // if (f === "edit") {
            //   return <td><EditButton /></td>
            // }
            // else if (f === Array) {
            //   return <td>array</td>
            //   // switch (f) {
            //   //   case "team":
            //   //     return (
            //   //       <td><GetName id={d[f]} category={"teams"}/></td>
            //   //     )
            //   //     break;

            //   //     case "coach":
            //   //       return (
            //   //         <td>dsfsddf</td>
            //   //       )
            //   //       break;
            //   //   default:
            //   //     break;
            //   // }
            // }
            // else
            // return (
            // <td>{d[f]}</td>
          // )
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