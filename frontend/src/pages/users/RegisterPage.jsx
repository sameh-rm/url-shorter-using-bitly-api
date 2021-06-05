import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { register } from "../../redux/user/user.actions";
import Message from "../../components/Message";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmtPassword] = useState("");
  const [passwordDoesNotMatchError, setPasswordDoesNotMatchError] =
    useState(false);

  const { userInfo } = useSelector((state) => state.user.login);
  const { error, loading } = useSelector((state) => state.user.register);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(username, password, name, email));
    } else {
      setPasswordDoesNotMatchError(true);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <Container className="pt-5 mx-auto col-md-6">
      <h2>SignUp</h2>
      {error && <Message>{error}</Message>}
      {passwordDoesNotMatchError && <Message>Password Does Not Match</Message>}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmtPassword(e.target.value)}
          />
        </Form.Group>
        {loading && (
          <Spinner
            className="d-block mx-auto my-3"
            animation="border"
            size="sm"
          />
        )}

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
