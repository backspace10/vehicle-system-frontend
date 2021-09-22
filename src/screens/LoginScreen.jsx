import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/message/Message";
import FormContainer from "../components/formContainer/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import loginAvatar from "../assets/login_avtr.jpg";

function LoginScreen() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    // setMessage("Login Successfully");
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   // validate(email, password);

  //   try {
  //     const res = await axios.post("http://localhost:9090/api/vehicles/login", {
  //       username: username,
  //       password: password,
  //     });

  //     console.log(res.data);
  //     if (res.data) {
  //       setLogin(true);
  //       setIsLogin(true);
  //       setUser(res.data);
  //     }
  //     setPassword("");
  //     setUsername("");
  //   } catch (err) {
  //     console.log(err);
  //   }

  // dispatch(login(email, password));
  // };

  return (
    // <FormContainer>
    <div className="container-fluid login-page">
      {/* {message && <Message variant="success">{message}</Message>} */}

      {/* 
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Usename</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form> */}
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6 ">
          <h2>Sign In</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
    // </FormContainer>
  );
}

export default LoginScreen;
