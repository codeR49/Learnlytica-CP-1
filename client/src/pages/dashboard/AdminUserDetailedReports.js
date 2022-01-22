import React, {useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Button, Col, Row } from '@themesberg/react-bootstrap';
import { Redirect,useHistory } from 'react-router-dom';

import { Routes } from "../../routes";
import { PageTrafficTable, UsersList } from "../../components/Tables";
import DevelopmentUrl from "../../constant";



export default () => {

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
          </Breadcrumb>
          <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
          <h4>Users </h4>
          </Col>
          </Row>
          <p className="mb-0">
          Here is the list of users enrolled, you can navigate to view specific user's report. 
          </p>
        </div>
        
      </div>
      
      <UsersList />
      {/* <Button type="link" className="m-1" onClick={submithandler}>Final Submit</Button> */}
      
      </>
  );
};

