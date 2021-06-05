import React, { useState } from "react";
import { Alert } from "react-bootstrap";
const Message = ({ variant, children, className }) => {
  const [show, setShow] = useState(true);
  return show ? (
    <Alert variant="danger" onClose={() => setShow(false)}>
      {children}
    </Alert>
  ) : (
    <></>
  );
};

// Message.defaultProps = {
//   variant: "danger",
// };
export default Message;
