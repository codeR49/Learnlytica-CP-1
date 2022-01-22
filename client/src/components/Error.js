
import React from "react";
import { Alert } from '@themesberg/react-bootstrap';
export default (props) => {

  return (
    <Alert variant="danger">
    {props.message}
  </Alert>
  
  );
};
