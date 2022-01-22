import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking, pageVisits2 } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import { Badge } from '@themesberg/react-bootstrap';
import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import DevelopmentUrl from "../constant";
import Spinner from './Spinner';

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};
export const AdminUserAssessmentTable = () => {
  const [state, setState] = useState([])
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(DevelopmentUrl + '/dashboard/quizbyuser',{
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }})
      .then(res => {
        // setState(res.data);
        console.log(res)
      })
      .catch(err => console.error(err))

  }, [])
  const TableRow = (props) => {
    
    const { pageName, views, returnValue, bounceRate, tca } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
        <td>
          {tca}
        </td>
        <td>{views}</td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Assessments Overview</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Assessment Name</th>
            <th scope="col">Avg. Score</th>
            <th scope="col">Participation</th>
            <th scope="col">Avg. T.C.E</th>
            <th scope="col">Assessment Topper</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};
export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate, tca } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
        <td>
          {tca}
        </td>
        <td>{views}</td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Assessments Overview</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Assessment Name</th>
            <th scope="col">Avg. Score</th>
            <th scope="col">Participation</th>
            <th scope="col">Avg. T.C.E</th>
            <th scope="col">Assessment Topper</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};
export const IndividualUserAssessment = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>{returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Assessment Leaderboard</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Assessment Name</th>
            <th scope="col">Score</th>
            <th scope="col">Rank</th>
            <th scope="col">Rank rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits2.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

const Difficulty = (difficulty) => {
  if (difficulty === "Easy")
    return <Badge bg="success" text="dark" className="me-1">{difficulty}</Badge>
  else if (difficulty === "Medium")
    return <Badge bg="warning" text="dark" className="me-1">{difficulty}</Badge>
  else
    return <Badge bg="danger" text="dark" className="me-1">{difficulty}</Badge>
}

export const PageTrafficTable = (props) => {

  const [state, setState] = useState([])
  const [quizid, setquizid] = useState([])
  const setScoreFuncSec = (score, index) => {
    sessionStorage.setItem("score" + index, score)
  }

  useEffect(() => {
    axios.get(DevelopmentUrl + '/quiz/javafullstack')
      .then(res => {
        setState(res.data[0].question);
        setquizid(res.data[0]._id);
      })
      .catch(err => console.error(err))

  }, [])

  const TableRow = (props) => {
    return (
      state && state.map((item, index) => (
        <tr key={item._id}>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{index}</Card.Link>
          </td>
          <td><Link to={{ pathname: Routes.QuizQuestion.path + index + '/' + quizid + '/' + item._id, state: { func: { setScoreFuncSec }, index: index } }}><td>{item.title}</td></Link></td>
          <td>
            {!sessionStorage.getItem("score" + index) ? 0 : sessionStorage.getItem("score" + index)}
          </td>
          <td>
            {Difficulty(item.difficulty)}
          </td>
          <td>
            <Button as={Link} to={{ pathname: Routes.QuizQuestion.path + index + '/' + quizid + '/' + item._id, state: { func: { setScoreFuncSec }, index: index } }} variant="secondary" className="m-1">Solve now</Button>
          </td>
        </tr>))
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Problems</th>
              <th className="border-0">Score</th>
              <th className="border-0">Difficulty</th>
              {/* <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th> */}
            </tr>
          </thead>
          <tbody>
            <TableRow props={props} />
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const UsersList = (props) => {

  const [state, setState] = useState([])
  const [spinner, setSpinner] = useState(false)
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSpinner(true);
    axios.get(DevelopmentUrl + '/users',{
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }})
      .then(res => {
        setState(res.data);
        setSpinner(false);
      })
      .catch(err => console.error(err))

  }, [])

  const TableRow = (props) => {
    return (
      spinner?<Spinner/>:
      state && state
      .filter(item=>item.admin===false)
      .map((item, index) => (
        <tr key={item._id}>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{index+1}</Card.Link>
          </td>
          <td><Link to={{ pathname: Routes.UserDetails.basePath + "/" + item._id + "/" + item.name}}><td>{item.name}</td></Link></td>
          <td>
            {/* {!sessionStorage.getItem("score" + index) ? 0 : sessionStorage.getItem("score" + index)} */}
          </td>
          <td>
            {/* {Difficulty(item.difficulty)} */}
          </td>
          <td>
            <Button as={Link} to={{ pathname: Routes.UserDetails.basePath + "/" + item._id + "/" + item.name }} variant="secondary" className="m-1">View</Button>
          </td>
        </tr>))
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">User</th>
              {/* <th className="border-0">Score</th>
              <th className="border-0">Difficulty</th> */}
              {/* <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th> */}
            </tr>
          </thead>
          <tbody>
            <TableRow props={props} />
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const QuizList = (props) => {

  const [state, setState] = useState([])
  const [spinner, setSpinner] = useState(false)
  const token = localStorage.getItem("token");
  useEffect(() => {
    setSpinner(true);
    axios.get(DevelopmentUrl + '/quiz',{
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }})
      .then(res => {
        setState(res.data);
        setSpinner(false);
      })
      .catch(err => console.error(err))

  }, [])

  const TableRow = (props) => {
    return (
      spinner?<Spinner/>:
      state && state.map((item, index) => (
        <tr key={item._id}>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{index+1}</Card.Link>
          </td>
          <td><Link to={{ pathname: Routes.QuizDetails.basePath + "/" + item._id + "/" + item.quizName}}><td>{item.quizName}</td></Link></td>
          <td>
            {/* {!sessionStorage.getItem("score" + index) ? 0 : sessionStorage.getItem("score" + index)} */}
          </td>
          <td>
            {/* {Difficulty(item.difficulty)} */}
          </td>
          <td>
            <Button as={Link} to={{ pathname: Routes.QuizDetails.basePath + "/" + item._id + "/" + item.quizName }} variant="secondary" className="m-1">View</Button>
          </td>
        </tr>))
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Assessments</th>
              {/* <th className="border-0">Score</th>
              <th className="border-0">Difficulty</th> */}
              {/* <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th> */}
            </tr>
          </thead>
          <tbody>
            <TableRow props={props} />
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const Leaderboard = () => {
  const [state, setState] = useState([])
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setSpinner(true);
    axios.get(DevelopmentUrl + '/quizresults/javaleaderboard')
      .then(res => {
        setState(res.data);
        setSpinner(false);
      })
      .catch(err => console.error(err))
  }, [])

  const TableRow = () => {
    return (
      state && state.map((item, index) => (
        <tr key={index}>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{item[2].Rank}</Card.Link>
          </td>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{item[0]}</Card.Link>
          </td>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{item[1].Q1}</Card.Link>
          </td>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{item[1].Q2}</Card.Link>
          </td>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{item[1].Q3}</Card.Link>
          </td>
          <td>
            <Card.Link href="#" className="text-primary fw-bold">{item[1].totalScore}</Card.Link>
          </td>
        </tr>
        )
        )
    );
  };

  return (
    spinner?<Spinner/>:
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Rank</th>
              <th className="border-0">Name</th>
              <th className="border-0">Q.1</th>
              <th className="border-0">Q.2</th>
              <th className="border-0">Q.3</th>
              <th className="border-0">Total Score</th>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {

  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const [posts, setPosts] = useState({ blogs: [] })
    useEffect(() => {
      const fetchPostList = async () => {
        const { data } = await axios(DevelopmentUrl + "/questions")

        setPosts({ blogs: data })

      }

      fetchPostList()
    }, [setPosts])

    const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";

    return (


      posts.blogs && posts.blogs.map((item, index) => (
        <tr key={item._id}>
          <td>
            {index}
          </td>
          <td>
            <span className="fw-normal">
              <Link to={'/Question/' + item._id}><td>{item.title}</td></Link>
            </span>
          </td>
          <td>
            <span className="fw-normal">
              <td>{Difficulty(item.difficulty)}</td>
            </span>
          </td>
          <td>
            <Button as={Link} to={'/Question/' + item._id} variant="secondary" className="m-1">Solve now</Button>
          </td>
        </tr>
      ))



    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Problems</th>
              <th className="border-bottom">Difficulty</th>
              <th className="border-bottom"></th>
            </tr>
          </thead>
          <tbody>
            <TableRow />
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};