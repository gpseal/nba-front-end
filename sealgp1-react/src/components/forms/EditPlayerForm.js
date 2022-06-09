import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const EditPlayerForm = (props) => {
  const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const player = props.data;

  console.log("here")

  const [form, setForm] = useState(
    !player ?
      {
        _id: 0,
        firstName: "",
        lastName: "",
        position: "",
        age: "",
        team: ""
      } : 
      {
        _id: 0,
        firstName: player.firstName,
        lastName: player.lastName,
        position: player.position,
        age: player.age,
        team: player.team._id
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
        age: form.age,
        team: form.team._id
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
          age: form.age,
          team: form.team._id
        }, {
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
      );
      if (res.status === 200) {
        alert("Plyer updated successfully");
        form._id = player._id;
        props.updateResource(form);
        props.toggle();
      }
    } catch (error) {
      // Catch some error
    }
  };

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
          type="text"
          name="position"
          onChange={onChange}
          value={form.position === null ? "" : form.position}
        />
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
      <FormGroup>
        <Label for="team">Team</Label>
        <Input
          type="text"
          name="team"
          onChange={onChange}
          value={form.team === null ? "" : form.team}
        />
      </FormGroup>

      <span className="text-danger">{ }</span>
      {" "}
      <Button className="mt-3" color="primary">Submit</Button>
    </Form>
  );
};

export default EditPlayerForm;
