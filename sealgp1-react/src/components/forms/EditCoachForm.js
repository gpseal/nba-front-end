import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const EditCoachForm = (props) => {
  const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const coach = props.data;

  console.log("here")

  const [form, setForm] = useState(
    !coach ?
      {
        _id: 0,
        firstName: "",
        lastName: "",
        age: "",
        careerWins: "",
        careerLosses: ""
      } : coach
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
      const res = await axios.post(`${BASE_URL}/api/v1/teams`, {
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
        `${BASE_URL}/api/v1/coaches/${coach._id}`,
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
        alert("Team updated successfully");
        form._id = coach._id;
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
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Surname</Label>
        <Input
          type="text"
          name="lastName"
          onChange={onChange}
          value={form.lastName === null ? "" : form.lastName}
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
        <Label for="careerWins">Carer Wins</Label>
        <Input
          type="text"
          name="careerWins"
          onChange={onChange}
          value={form.careerWins === null ? "" : form.careerWins}
        />
      </FormGroup>
      <FormGroup>
        <Label for="careerLosses">Career Losses</Label>
        <Input
          type="text"
          name="careerLosses"
          onChange={onChange}
          value={form.careerLosses === null ? "" : form.careerLosses}
        />
      </FormGroup>

      <span className="text-danger">{ }</span>
      {" "}
      <Button className="mt-3" color="primary">Submit</Button>
    </Form>
  );
};

export default EditCoachForm;
