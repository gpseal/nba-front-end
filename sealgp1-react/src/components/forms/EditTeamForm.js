import { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const EditTeamForm = (props) => {
  const BASE_URL = "https://id607001-sealgp1.herokuapp.com";

  const team = props.data;

  console.log("here")

  const [form, setForm] = useState(
    !team ?
      {
        _id: 0,
        name: "",
        city: "",
        stadium: "",
        division: "",
        conference: ""
      } : team
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
        name: form.name,
        city: form.city,
        stadium: form.stadium,
        division: form.division,
        conference: form.conference
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
        `${BASE_URL}/api/v1/teams/${team._id}`,
        {
          name: form.name,
          city: form.city,
          stadium: form.stadium,
          division: form.division,
          conference: form.conference
        }, {
        headers: {
          "authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      }
      );
      if (res.status === 200) {
        alert("Team updated successfully");
        form._id = team._id;
        props.updateResource(form);
        props.toggle();
      }
    } catch (error) {
      // Catch some error
    }
  };

  const divisions = ["Pacific", "Atlantic", "Northwest", "Southwest", "Central", "Southeast"];
  const conferences = ["West", "East"]

  const dropDownValues = (e, value) => {
    if (!value) {
      return (e.map((item) => <option>{item}</option>))
    }
    else {
      return (e.filter(item => (item !== value)).map((item) => <option>{item}</option>))
    }
  }


  console.log(form.division)
  console.log(dropDownValues(divisions, form.division))
  console.log(divisions.filter(item => item !== "Southwest"))

  return (
    <Form onSubmit={label === "Edit" ? updateForm : createForm}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          onChange={onChange}
          value={form.name === null ? "" : form.name}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="city">City</Label>
        <Input
          type="text"
          name="city"
          onChange={onChange}
          value={form.city === null ? "" : form.city}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="stadium">Stadium</Label>
        <Input
          type="text"
          name="stadium"
          onChange={onChange}
          value={form.stadium === null ? "" : form.stadium}
        />
      </FormGroup>
      <FormGroup>
        <Label for="division">Division</Label>
        <Input
          type="select"
          name="division"
          onChange={onChange}
          required>
          <option>{form.division === null ? "" : form.division}</option>
          {dropDownValues(divisions, form.division)}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="conference">Conference</Label>
        <Input
          type="select"
          name="conference"
          onChange={onChange}
          required>
          <option>{form.conference === null ? "" : form.conference}</option>
          {dropDownValues(conferences, form.conference)}
        </Input>
      </FormGroup>
      

      <span className="text-danger">{ }</span>
      {" "}
      <Button className="mt-3" color="primary">Submit</Button>
    </Form>
  );
};

export default EditTeamForm;
