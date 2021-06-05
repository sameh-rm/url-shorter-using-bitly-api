import React, { useEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { listUserLinks } from "../../redux/user/user.actions";

const UrlsPage = () => {
  const { links, loading, error } = useSelector((state) => state.user.links);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUserLinks());
  }, [dispatch]);
  return (
    <Container>
      <h2>My Urls</h2>
      {error && <Message>{error}</Message>}
      {loading && (
        <Spinner size="sm" animation="border" className="mx-auto d-block p-3" />
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Long Link</th>
            <th>Short Link</th>
          </tr>
        </thead>
        <tbody>
          {links &&
            links.map((link, idx) => (
              <tr key={idx}>
                <td>{link._id}</td>
                <td>
                  <a href={link.to_url}>{link.to_url}</a>
                </td>
                <td>
                  <a href={link.from_url}>{link.from_url}</a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UrlsPage;
