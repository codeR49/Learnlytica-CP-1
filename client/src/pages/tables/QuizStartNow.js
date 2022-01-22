
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Button, Col, Row } from '@themesberg/react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from "../../routes";
import { Leaderboard } from "../../components/Tables";
import DevelopmentUrl from "../../constant";

function QuizStartNow(props) {
  const score = useLocation();
  let token = localStorage.getItem('token');
  const [attempt, setattempt] = useState(false);
  const [allowed, setallowed] = useState();
  const [totalscore, settotalscore] = useState(0);

  useEffect(() => {
    sessionStorage.setItem("h", 0);
    sessionStorage.setItem("m", 0);
    sessionStorage.setItem("s", 0);

    async function submithandler() {

      const response = await fetch(DevelopmentUrl + '/attempts/userAttempt/61d6a02eb1be8bb03c273efc', {
        method: "GET",
        headers: {
          "Content-Type": "text/plain",
          "Authorization": `bearer ${token}`
        }
      })
      let v = await (response.json());
      if (v.length != 0) {
        setallowed(v[0].attemptAllowed);
        setattempt(v[0].attemptFlag);
      }
      if (props.location.state != undefined) {
        settotalscore(score.state.from);
      }
    }
    submithandler();
  }, []);

  function Finalscore(props) {
    if (props.attempt) {
      return (
        <Button as={Link} to={Routes.QuizOverview.path} variant="success" className="m-1">Retry now</Button>
      );
    }
    else {
      return (
        <Button as={Link} to={Routes.QuizOverview.path} variant="success" className="m-1">Start now</Button>
      );
    }
  }

  function Score(props) {
    if (props.totalscore) {
      return (
        <h4 class="text-center">You Scored: {props.totalscore}</h4>
      );
    }
    return <></>
  }

  return (
    <React.StrictMode>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Assessment</Breadcrumb.Item>
            <Breadcrumb.Item active>Java Full Stack</Breadcrumb.Item>
          </Breadcrumb>
          <Row className="justify-content-between align-items-center">
            <Col xs={8} md={6} lg={3} xl={4}>
              <h4>Java Full Stack </h4>
            </Col></Row>
          <h6>Instruction</h6>
          <p className="mb-0">
            The objective of this Java Full Stack Assessment the talented and creative minds in competitive programming with some interesting algorithmic problems.The participants will be challenged by Multiple Problem Setters with 4 problems of varying difficulty levels in a duration of 3 hr.
          </p>
        </div>
      </div>
      <Finalscore attempt={attempt} allowed={allowed} />
      <hr></hr>
      <Score totalscore={totalscore} />
      <h4 class="text-center">Live Leaderboard</h4>
      <Leaderboard />
    </React.StrictMode>
  );
};
export default QuizStartNow;