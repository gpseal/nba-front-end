import { useState, useEffect } from "react";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const EditPlayerForm = (props) => {
  const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const player = props.data;

  const [form, setForm] = useState(
    !player ?
      {
        _id: 0,
        firstName: "",
        lastName: "",
        position: "",
        age: ""
      } : 
      {
        _id: 0,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
        age: player.age
      } 
      
  );

  const label = props.label;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/players`, {
        firstName: form.firstName,
        lastName: form.lastName,
        position: form.position,
        age: form.age
      }, {
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      if (res.status === 200) {
        form._id = res.data.data[res.data.data.length - 1]._id
        props.createResource(form);
        props.toggle();
      }
    } catch (error) {
      // Catch some error
    }
  };

  const updateForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/players/${player._id}`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          position: form.position,
          age: form.age
        }, {
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
      );
      if (res.status === 200) {
        alert("Player updated successfully");
        form._id = player._id;
        props.updateResource(form);
        props.toggle();
        window.location.reload(false);
      }
    } catch (error) {
      // Catch some error
    }
  };

const positions = ["Center", "Power Forward", "Small Forward", "Point Guard", "Shooting Guard"]

const dropDownValues = (values) => {
  return (values.map((item) => <option>{item}</option>))
}

function refreshPage() {
  window.location.reload(false);
}


  return (
    <Form onSubmit={label === "Edit" ? updateForm : createForm}>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          onChange={onChange}
          value={form.firstName === null ? "" : form.firstName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Surname</Label>
        <Input
          type="text"
          name="lastName"
          onChange={onChange}
          value={form.lastName === null ? "" : form.lastName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="position">Position</Label>
        <Input
          type="select"
          name="position"
          onChange={onChange}
          >
          <option>{form.position === null ? "" : form.position}</option> 
          {dropDownValues(positions)}
 
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <Input
          type="text"
          name="age"
          onChange={onChange}
          value={form.age === null ? "" : form.age}
        />
      </FormGroup>

      <span className="text-danger">{ }</span>
      {" "}
      <Button className="mt-3" color="primary">Submit</Button>
    </Form>
  );
};

export default EditPlayerForm;
