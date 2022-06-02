import axios from "axios";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import './Forms.css'


const EditTeamForm = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [firstName, setFirstName] = useState("");
  // const [city, setCity] = useState("");
  // const [stadium, setStadium] = useState("");
  // const [division, setDivision] = useState("");
  // const [conference, setConference] = useState("");

  const [authError, setAuthError] = useState(false); // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false); // Used for network errors

  const [data, setData] = useState([])

  // const { id } = useParams()

  useEffect(() => {
    setFirstName(props.data.firstName)
    // setCity(props.data.city)
    // setStadium(props.data.stadium)
    // setDivision(props.data.division)
    // setConference(props.data.conference)
  }, [])

  console.log(props.data.firstName)
  console.log(props.id)

  const updateTeam = async () => {

    try {
      const res = await axios.put(`${BASE_URL}/api/v1/coaches/${props.id}`, {
        firstName: firstName,
        // city: city,
        // stadium: stadium,
        // division: division,
        // conference: conference
      },
      { headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },}
      );

    } catch (error) {
      console.log(error);

      if (error.response.status === 401) {
        setAuthError(true);
      } else {
        setUnknownError(true);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTeam();
  };
  
  const navigate = useNavigate(); //for going back a page (on exit)

  const validateEmail = (e) => {
    const emailRex = "SouthWest";
    const { validate } = this.state;

    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success';
    } else {
      validate.emailState = 'has-danger';
    }

    this.setState({ validate });
  }

  return (
    <>
    <button className="button" style={{ float: 'right', marginTop: '10px'}} onClick={() => navigate(-1)}>X</button>
    <h1 style={{ marginTop: "10px" }}>Edit Team</h1>
 
      <Form onSubmit={handleSubmit}>
      
        <FormGroup>
          <label>First Name</label>
          <Input
            type="text"
            name="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        
        
        {/* 
          Display an alert message if there is either an authentication or network error
        */}
        {authError ? (
          <Alert color="danger">
            Cannot recognize your credentials. Please try again.
          </Alert>
        ) : null}
        {unknownError ? (
          <Alert color="danger">
            There was a problem submitting your data.
          </Alert>
        ) : null}
        <Button className="button" >Submit</Button>

      </Form>
    </>
  );
};

export default EditTeamForm;