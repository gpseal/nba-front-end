import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EditButton.css'

const EditButton = () => {

    return (
        <Link style={{backgroundColor: 'red', color: 'pink'}} to={"/"}>EDIT</Link>
    )
  };
  
  export default EditButton;