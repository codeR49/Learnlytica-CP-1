
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, AcquisitionWidget, ScoreWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import DevelopmentUrl from "../../constant";
import axios from 'axios';

export default () => {
  const [totalUsers, setTotalUsers] = useState()
  const [avgScore, setAvgScore] = useState()
  const [avgTCE, setAvgTCE] = useState()
  const token = localStorage.getItem("token");
  useEffect(()=>{
    axios.get(DevelopmentUrl + '/dashboard/getallQuiz', {
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }
    }
    )
      .then(res => {
        console.log(res.data)
        // settotalOrders(res.data.languageProficiency);
        setTotalUsers(res.data["Total Users"])
        setAvgScore(res.data["Average Assessment Score"])
        setAvgTCE(res.data["Average Test Case Efficiency"])
      })
      .catch(err => console.error(err))
  },[])
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup>
      </div>

      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Weekly Problem Solved"
            value="140"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Users"
            title={totalUsers}
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Average Assessment Score"
            title={avgScore}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
        <CounterWidget
            category="Test Case Efficiency"
            title={avgTCE}
            period="3 hours"
            // percentage={18.2}
            percentageDisabled={true}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12}  className="mb-4">
                <BarChartWidget
                    title="Language Proficiency"
                    data={totalOrders}
                    type="dashboard" />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  
                <ProgressTrackWidget />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <ScoreWidget
            title="Weekly Problem Solved"
            value="140"
            percentage={10.57}
          />
        </Col>
      </Row>
    </>
  );
};
