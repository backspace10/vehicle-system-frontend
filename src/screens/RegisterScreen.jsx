import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/formContainer/FormContainer";
// import base_url from "../api/Services";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [message, setMessage] = useState("");

  // const registerSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:9090/api/vehicles/register",
  //       {
  //         username: userName,
  //         password: password,
  //         name: name,
  //         lastname: lastName,
  //         email: email,
  //       }
  //     );
  //     // setUser({ name: "", email: "", password: "" });
  //     setName("");
  //     setLastName("");
  //     setEmail("");
  //     setPassword("");
  //     setUserName("");

  //     setError(res.data.msg);
  //   } catch (err) {
  //     err.response.data.msg && setError(err.response.data.msg);
  //   }
  // };
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setMessage("Passwords do not match");
      alert("Passwords do not match");
    } else {
      dispatch(register(userName, name, email, password, address, contact));
      setMessage("User Register Successfully");
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            id="name"
            required
            type="text"
            placeholder="Enter User name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="fname">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="fname"
            required
            type="text"
            placeholder="Enter First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="lname">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control
            id="lname"
            required
            type="text"
            placeholder="Enter Contact No"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            id="address"
            required
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
