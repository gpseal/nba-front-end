/**
 * Author: Greg Seal
 * Date: June 2020
 * Course:  Introduction to app development
 *
 * For editing or adding records to the Players collection
 *
 * onChange: Updates form values
 * createForm: Posts new player record to Players collection
 * updateForm: Updates existing player record
 */

import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

const EditTeamForm = (props) => {
    const BASE_URL = 'https://id607001-sealgp1.herokuapp.com'

    const team = props.data

    console.log('here')

    const [form, setForm] = useState(
        !team
            ? {
                  _id: 0,
                  name: '',
                  city: '',
                  stadium: '',
                  division: '',
                  conference: '',
              }
            : team
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
                `${BASE_URL}/api/v1/teams`,
                {
                    name: form.name,
                    city: form.city,
                    stadium: form.stadium,
                    division: form.division,
                    conference: form.conference,
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
                form._id = res.data.data[res.data.data.length - 1]._id
                props.createResource(form)
                props.toggle()
            }
        } catch (error) {
            alert('There was a problem creating team data: ' + error.message)
        }
    }

    const updateForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(
                `${BASE_URL}/api/v1/teams/${team._id}`,
                {
                    name: form.name,
                    city: form.city,
                    stadium: form.stadium,
                    division: form.division,
                    conference: form.conference,
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
                alert('Team updated successfully')
                form._id = team._id
                props.toggle()
                props.updateResource(form)
            }
        } catch (error) {
            alert('There was a problem entering team data: ' + error.message)
        }
    }

    //setting values for drop-down menus
    const divisions = [
        'Pacific',
        'Atlantic',
        'Northwest',
        'Southwest',
        'Central',
        'Southeast',
    ]
    const conferences = ['West', 'East']

    const dropDownValues = (values) => {
        return values.map((item) => <option>{item}</option>)
    }

    return (
        <Form onSubmit={label === 'Edit' ? updateForm : createForm}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input
                    type="text"
                    name="name"
                    onChange={onChange}
                    value={form.name === null ? '' : form.name}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="city">City</Label>
                <Input
                    type="text"
                    name="city"
                    onChange={onChange}
                    value={form.city === null ? '' : form.city}
                    required
                />
            </FormGroup>
            <FormGroup>
                <Label for="stadium">Stadium</Label>
                <Input
                    type="text"
                    name="stadium"
                    onChange={onChange}
                    value={form.stadium === null ? '' : form.stadium}
                />
            </FormGroup>
            <FormGroup>
                <Label for="division">Division</Label>
                <Input
                    type="select"
                    name="division"
                    onChange={onChange}
                    required
                >
                    <option>
                        {form.division === null ? '' : form.division}
                    </option>
                    {dropDownValues(divisions)}
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="conference">Conference</Label>
                <Input
                    type="select"
                    name="conference"
                    onChange={onChange}
                    required
                >
                    <option>
                        {form.conference === null ? '' : form.conference}
                    </option>
                    {dropDownValues(conferences)}
                </Input>
            </FormGroup>
            <span className="text-danger">{}</span>{' '}
            <Button className="mt-3" color="primary">
                Submit
            </Button>
        </Form>
    )
}

export default EditTeamForm
