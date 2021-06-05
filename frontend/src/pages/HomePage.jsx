import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { shortenUserLink } from "../redux/user/user.actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user.login);
  const {
    from_url,
    loading: userShortenApiLoading,
    error: userShortenApiError,
  } = useSelector((state) => state.user.userShortenApi);
  const [link, setLink] = useState("");
  const [api, setApi] = useState("bitly");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userInfo && userInfo.token) {
      dispatch(shortenUserLink(link, api));
    } else {
      // dispatch(shortenLink(link, api));
    }
  };

  return (
    <div>
      <h1 className="logo text-center pt-3">Shorty</h1>
      <Container className="paper_elevation">
        {userShortenApiError && <Message>{userShortenApiError}</Message>}
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link
              active={api === "bitly"}
              eventKey="link-1"
              onClick={(e) => setApi("bitly")}
            >
              Bitly
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={api === "local"}
              eventKey="link-2"
              onClick={(e) => setApi("local")}
            >
              Shorty
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Form className="p-5 pb-2" onSubmit={onSubmitHandler}>
          <h2 className="text-center p-2">Paste the URL to be shortened</h2>

          <InputGroup className="mb-3">
            <FormControl
              aria-label="Enter the link here"
              aria-describedby="basic-addon2"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="text"
              placeholder="Enter the link here"
            />

            <Button variant="primary" type="submit" id="button-addon2">
              Shorten URL
            </Button>
          </InputGroup>
        </Form>

        {userShortenApiLoading ? (
          <Spinner
            className="mx-auto  d-block p-3 m-3"
            animation="border"
            size="sm"
          />
        ) : (
          from_url && (
            <div className="w-100 text-center py-3">
              <p className="w-100 text-center text-white bg-primary p-2">
                {from_url}
              </p>
            </div>
          )
        )}
      </Container>
    </div>
  );
};

export default HomePage;
