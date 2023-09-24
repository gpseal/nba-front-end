/**
 * Author: Greg Seal
 * Date: June 2020
 * Course:  Introduction to app development
 *
 * For Registering new users
 *
 * registerUser: Posts credentials of new users to be stored in the API database
 */

import axios from 'axios'
import { useState } from 'react'
import { Alert, Button, Form, FormGroup, Input } from 'reactstrap'
import { Navigate } from 'react-router-dom'

const RegistrationForm = (props) => {
  const BASE_URL = 'https://nba-api-bvui.onrender.com'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const [authError, setAuthError] = useState(false) // Used for authentication errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors

  const registerUser = async () => {
    setAuthError(false)
    setUnknownError(false)

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/register`, {
        name: name,
        email: email,
        password: password,
      })

      if (res.status === 201) {
        alert('Registration Successful.')
        setIsRegistered(true)
      }
    } catch (error) {
      console.log(error)

      if (error.response.status === 500) {
        setAuthError(true)
        alert(error.response.data.msg)
      }
      if (error.response.status === 401) {
        setAuthError(true)
      } else {
        setUnknownError(true)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
  }

  if (isRegistered === true) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <h1 style={{ marginTop: '10px' }}>Register</h1>
      {/* 
        When the form is submitted, it will call the handleSubmit 
        function above. You do not need to worry about specifying
        a method and action as you would typically do when dealing 
        with forms
      */}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            There was a problem submitting your credentials.
          </Alert>
        ) : null}
        <Button>Submit</Button>
      </Form>
    </>
  )
}

export default RegistrationForm
