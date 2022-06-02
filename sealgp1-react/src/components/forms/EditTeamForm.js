import axios from "axios";
import { Alert, Button, Form, FormGroup, Input } from "reactstrap";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import './Forms.css'


const EditTeamForm = (props) => {
    const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [stadium, setStadium] = useState("");
  const [division, setDivision] = useState("");
  const [conference, setConference] = useState("");

  const [authError, setAuthError] = useState(false); // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false); // Used for network errors

  const [data, setData] = useState([])

  // const { id } = useParams()

  useEffect(() => {
    setName(props.data.name)
    setCity(props.data.city)
    setStadium(props.data.stadium)
    setDivision(props.data.division)
    setConference(props.data.conference)
  }, [])

  console.log(props.data.name)
  console.log(props.id)

  const updateTeam = async () => {

    try {
      const res = await axios.put(`${BASE_URL}/api/v1/teams/${props.id}`, {
        name: name,
        city: city,
        stadium: stadium,
        division: division,
        conference: conference
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
          <label>Name</label>
          <Input
            type="text"
            name="name"
            value={name}
            /*
              This attribute detects when the value of an input element changes
            */
            onChange={(e) => setName(e.target.value)}
            /*
              You can fetch validation messages from the request. There are plenty 
              of online resources that show you how to do this 
            */
            required
          />
        </FormGroup>
        <FormGroup>
          <label>City</label>
          <Input
            type="text"
            name="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Stadium</label>
          <Input
            type="text"
            name="Stadium"
            value={stadium}
            onChange={(e) => setStadium(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Division</label>
          <Input
            type="text"
            name="division"
            value={division}
            onChange={(e) => {
              validateEmail(e);
              setDivision(e.target.value)}
            }
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Conference</label>
          <Input
            type="text"
            name="conference"
            defaultValue={conference}
            onChange={(e) => setConference(e.target.value)}
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