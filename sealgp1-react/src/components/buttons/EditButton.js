import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditButton.css'

const EditButton = (props) => {

    return (
        <Link data={"props.data"} style={{backgroundColor: 'red', color: 'pink'}} to={`/${props.category}/edit/${props.id}`}>EDIT</Link>
    )
  };
  
  export default EditButton;