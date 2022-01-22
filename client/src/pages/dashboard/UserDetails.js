
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup, Breadcrumb } from '@themesberg/react-bootstrap';
import { faHome } from "@fortawesome/free-solid-svg-icons";

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget, BarChartWidget2 } from "../../components/Widgets";
import { AdminUserAssessmentTable, PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders, totalOrders2 } from "../../data/charts";
import GenericPdfDownloader from "../../components/GenericPdfDownloader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item ><Link to={Routes.AdminUserDetailedReports.path}>Users</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{props.match.params.username}</Breadcrumb.Item>
          </Breadcrumb>
        <ButtonGroup>
          <GenericPdfDownloader rootElementId="pragya" downloadFileName="user-report"/>
        </ButtonGroup>
      </div>
<div id="pragya">
      <Row className="justify-content-md-center" >
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Total Problem Solved"
            value="130"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Open Source Contribution"
            title="40"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Average Assessment Score"
            title="75%"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Test case efficiency"
            data={trafficShares} />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <AdminUserAssessmentTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Language Proficiency"
                    value={40}
                    percentage={18.2}
                    data={totalOrders} />
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
      </Row>
      </div>
    </div>
  );
};
