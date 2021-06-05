import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { login } from "../../redux/user/user.actions";
const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo, error, loading } = useSelector((state) => state.user.login);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <Container className="pt-5 mx-auto col-md-6">
      <h2>Login Page</h2>
      <Form onSubmit={onSubmitHandler}>
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
        {loading && (
          <Spinner
            className="d-block mx-auto my-3"
            animation="border"
            size="sm"
          />
        )}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
