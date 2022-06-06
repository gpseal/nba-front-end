import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import GetName from "../getData/GetName";
import mongoose from 'mongoose';
import EditButton from "../buttons/EditButton";
import UpdateButton from "../buttons/UpdateButton";
import ModalForm from "../modals/Modal";

const DataTable = (props) => {
  const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [resources, setResources] = useState([])

  const createResource = (resource) => {
    setResources([...resources, resource]); //what do the three dots mean?
  };

  const updateResource = (resource) => {
    const resourceIndex = resources.findIndex(
      (data) => data.id === resource.id
    );
    const newArray = [
      ...resources.slice(0, resourceIndex),
      resource,
      ...resources.slice(resourceIndex + 1),
    ];
    setResources(newArray);
  };

  const deleteResource = (_id) => {
    const updatedItems = resources.filter((team) => team._id !== _id);
    setResources(updatedItems);
  };

  const deleteTeam = async (_id) => {
    let confirmDelete = window.confirm(`Are you sure you want to delete team: ${_id} ?`)
    if (confirmDelete) {
      try {
        const res = axios.delete(`${BASE_URL}/api/v1/teams/${_id}`, {
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        if (res.status === 200) alert("Team deleted successfully");
        deleteResource(_id);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/${props.category}?limit=5`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      })

      setResources(res.data.data)
    } catch (error) {
      console.log(error)
    }   
  }

  useEffect(() => {
    getData()
  }, [])

  // console.log(props.fields)
  // console.log(resources)

  const displayFields = (
    props.fields.map((f) => {
      if (f === "edit") {
        return " "
      }
      else {
        return (
          <th>{f}</th>
        )
      }

    })

  )

  const displayData = (
    resources.map((d) => {
      return (
        <tr key={d._id}>
          {props.fields.map((f) => {
            switch (f) {
              case "edit":
                console.log(d)
                return <td>
                <ModalForm
                buttonLabel="Edit"
                data={d}
                updateResource={updateResource}
                category={props.category}
              />
              </td>
                break;
              case "coach":
                if (d[f]) {
                  return <td>{`${d[f].firstName} ${d[f].lastName}`}</td>
                }
                else return <td>n/a</td>
                
                break;           
              case "team":
                if (d[f]) {
                  return <td>{d[f].name}</td>
                }
                else return <td>n/a</td>
                // return <td>{d[f].name}</td>
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
  const label = `Add ${props.category}`

  return (
    <>
    <Table>
      <thead>
        <tr>
          {displayFields}
        </tr>
      </thead>
      <tbody>
        {displayData}
      </tbody>
      {/* <EditButton category={props.category} id={ "none" }/> */}
    </Table>
    <ModalForm buttonLabel={label} createResource={createResource} />
    </>
  );
};

export default DataTable;