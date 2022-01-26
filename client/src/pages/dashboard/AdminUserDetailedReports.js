import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Button, Col, Row } from '@themesberg/react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';

import { Routes } from "../../routes";
import { PageTrafficTable, UsersList } from "../../components/Tables";
import DevelopmentUrl from "../../constant";
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { propTypes } from "@themesberg/react-bootstrap/lib/esm/Image";

export default (props) => {
  const [users, setUsers] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [search, setSearch] = useState('')
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSpinner(true);
    axios.get(DevelopmentUrl + '/users', {
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }
    }
    )
      .then(res => {
        setUsers(res.data);
        setSpinner(false);
      })
      .catch(err => console.error(err))

  }, [])
  const filteredUsers = search.length === 0 ? users.filter(item => item.admin === false && item.name) :
    users
      .filter(item => item.admin === false && item.name)
      .filter(item => item.name.
        toLowerCase().includes(search.toLowerCase()))

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
      <input
        type="text"
        className="form-control"
        placeholder="Search name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /><br></br>
      {spinner ? <Spinner /> :
        <UsersList state={filteredUsers} />}</>
  );
};

