import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditButton.css'

const EditButton = (props) => {

    return (
        <Link className="button" to={`/${props.category}/edit/${props.id}`}>Edit</Link>
    )
  };
  
  export default EditButton;