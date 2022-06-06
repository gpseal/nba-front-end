import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Alert } from "reactstrap";
import GetName from "../getData/GetName";
import mongoose from 'mongoose';
import EditButton from "../buttons/EditButton";
import UpdateButton from "../buttons/UpdateButton";
import ModalForm from "../modals/Modal";
// import '../modals/ModalCSS.css'
import '../tables/Table.css'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '3px 15px',
  transition: '0.3s',
  borderRadius: '3px',
  border: 'none'
};

const DataTable = (props) => {
  const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [resources, setResources] = useState([])

  const [pageNum, setPageNum] = useState(1)

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

  const deleteResources = (_id) => {
    const updatedItems = resources.filter((team) => team._id !== _id);
    setResources(updatedItems);
  };

  const deleteResource = async (_id) => {
    let confirmDelete = window.confirm(`Are you sure you want to delete item: ${_id} ?`)
    if (confirmDelete) {
      try {
        const res = axios.delete(`${BASE_URL}/api/v1/${props.category}/${_id}`, {
          headers: {
            "authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })
        if (res.status === 200) alert("Item deleted successfully");
        deleteResources(_id);
      } catch (error) {
        console.log(error)
      }
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/${props.category}?limit=0`, {
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
                <Button 
                // style={buttonStyle}
                className="deleteButton"
                color="danger"
                onClick={() => deleteResource(d._id)}>
                  Delete
                </Button>
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
  console.log(displayData)

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
    <Button 
                  className="button"
                  color="red" onClick={() => {setPageNum(pageNum + 1);
                    getData()}}>
                  Next
                </Button>
    </>
  );
};

export default DataTable;