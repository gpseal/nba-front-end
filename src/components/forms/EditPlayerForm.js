/**
 * Author: Greg Seal
 * Date: June 2020
 * Course:  Introduction to app development
 *
 * For editing or adding records to the Players collection
 *
 * onChange: Updates form values
 * getTeams: requests all team data for populating teams drop down menu
 * createForm: Posts new player record to Players collection
 * updateForm: Updates existing player record
 * dropDownValues: Populates drop down menus with array values
 */

import { useState, useEffect } from 'react'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

const EditPlayerForm = (props) => {
    const BASE_URL = 'https://id607001-sealgp1.herokuapp.com'

    const player = props.data

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
        !player
            ? {
                  _id: 0,
                  firstName: '',
                  lastName: '',
                  position: '',
                  age: '',
                  team: ''
              }
            : {
                  _id: 0,
                  firstName: player.firstName,
                  lastName: player.lastName,
                  position: player.position,
                  age: player.age,
                  team: player.team._id,
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
                `${BASE_URL}/api/v1/players`,
                {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    position: form.position,
                    age: form.age,
                    team: form.team
                },
                {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            if (res.status === 200) {
                
                alert('Player added successfully')
                console.log(form)
                // form._id = res.data.data[res.data.data.length - 1]._id - Please check in future
                props.createResource(form)
                props.toggle()
                refreshPage()
                
            }
        } catch (error) {
            alert('There was a problem creating player data: ' + error.message)
            refreshPage()
        }
    }

    const updateForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(
                `${BASE_URL}/api/v1/players/${player._id}`,
                {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    position: form.position,
                    age: form.age,
                    team: form.team
                },
                {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            if (res.status === 200) {
                alert('Player updated successfully')
                form._id = player._id
                props.updateResource(form)
                props.toggle()
                refreshPage()
            }
        } catch (error) {
            alert('There was a problem entering player data: ' + error.message)
        }
    }

    const positions = [
        'Center',
        'Power Forward',
        'Small Forward',
        'Point Guard',
        'Shooting Guard',
    ]

    const dropDownValues = (values) => {
        return values.map((item) => <option>{item}</option>)
    }

    function refreshPage() {
        window.location.reload(false)
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
                <Label for="position">Position</Label>
                <Input type="select" name="position" onChange={onChange}>
                    <option>
                        {form.position === null ? '' : form.position}
                    </option>
                    {dropDownValues(positions)}
                </Input>
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
                <Label for="team">Team</Label>
                <Input
                    type="select"
                    name="team"
                    onChange={onChange}
                    required
                >
                    <option>
                        {form.team === null ? '' : form.team}
                    </option>
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

export default EditPlayerForm
