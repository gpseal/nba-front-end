/**
 * Author: Greg Seal
 * Date: June 2020
 * Course:  Introduction to app development
 *
 * For editing or adding records to the Coaches collection
 *
 * onChange: Updates form values
 * getTeams: requests all team data for populating teams drop down menu
 * createForm: Posts new Coach record to Coaches collection
 * updateForm: Updates existing coach record
 * dropDownValues: Populates drop down menus with array values
 */

import { useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

const EditCoachForm = (props) => {
  const BASE_URL = 'https://nba-api-bvui.onrender.com'

  const coach = props.data

  const [teamList, setTeamList] = useState([]) // State variables

  const getTeams = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/teams`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      setTeamList(res.data.data.map((x) => x._id)) //getting existing team IDs for drop down menus
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTeams()
  }, [])

  const [form, setForm] = useState(
    !coach
      ? {
          _id: 0,
          firstName: '',
          lastName: '',
          age: '',
          careerWins: '',
          careerLosses: '',
          team: '',
        }
      : {
          _id: coach._id,
          firstName: coach.firstName,
          lastName: coach.lastName,
          age: coach.age,
          careerWins: coach.careerWins,
          careerLosses: coach.careerLosses,
          team: coach.team._id,
        }
  )

  const label = props.label

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const createForm = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/coaches`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          age: form.age,
          careerWins: form.careerWins,
          careerLosses: form.careerLosses,
          team: form.team,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      if (res.status === 200) {
        form._id = res.data.data[res.data.data.length - 1]._id
        props.createResource(form)
        props.toggle()
        window.location.reload(false)
      }
    } catch (error) {
      alert('There was a problem creating coach data: ' + error.message)
    }
  }

  const updateForm = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/coaches/${coach._id}`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          age: form.age,
          careerWins: form.careerWins,
          careerLosses: form.careerLosses,
          team: form.team,
        },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      )
      if (res.status === 200) {
        alert('Coach updated successfully')
        form._id = coach._id
        props.updateResource(form)
        props.toggle()
        window.location.reload(false)
      }
    } catch (error) {
      alert('There was a problem entering coach data: ' + error.message)
    }
  }

  const dropDownValues = (values) => {
    return values.map((item) => <option>{item}</option>)
  }

  return (
    <Form onSubmit={label === 'Edit' ? updateForm : createForm}>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input
          type="text"
          name="firstName"
          onChange={onChange}
          value={form.firstName === null ? '' : form.firstName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Surname</Label>
        <Input
          type="text"
          name="lastName"
          onChange={onChange}
          value={form.lastName === null ? '' : form.lastName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="age">Age</Label>
        <Input
          type="text"
          name="age"
          onChange={onChange}
          value={form.age === null ? '' : form.age}
        />
      </FormGroup>
      <FormGroup>
        <Label for="careerWins">Carer Wins</Label>
        <Input
          type="text"
          name="careerWins"
          onChange={onChange}
          value={form.careerWins === null ? '' : form.careerWins}
        />
      </FormGroup>
      <FormGroup>
        <Label for="careerLosses">Career Losses</Label>
        <Input
          type="text"
          name="careerLosses"
          onChange={onChange}
          value={form.careerLosses === null ? '' : form.careerLosses}
        />
      </FormGroup>
      <FormGroup>
        <Label for="team">Team</Label>
        <Input type="select" name="team" onChange={onChange} required>
          <option>{form.team === null ? '' : form.team}</option>
          {dropDownValues(teamList)}
        </Input>
      </FormGroup>
      <span className="text-danger">{}</span>{' '}
      <Button className="mt-3" color="primary">
        Submit
      </Button>
    </Form>
  )
}

export default EditCoachForm
