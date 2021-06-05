import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
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
    <div>
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
            links.map((link) => (
              <tr>
                <td>{link._id}</td>
                <td>{link.to_url}</td>
                <td>{link.from_url}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UrlsPage;
