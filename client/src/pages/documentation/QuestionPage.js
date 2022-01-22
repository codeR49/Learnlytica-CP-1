
import React, { useState, useEffect, setState } from 'react'
import axios from 'axios';
import { Row, Col, Card, Container } from '@themesberg/react-bootstrap';
import Editor from '../../components/Editor';
import DevelopmentUrl from "../../constant";


const QuestionPage = (props) => {
  const [quesdesc, setquesdesc] = useState("");
  const [questitle, setquestitle] = useState("");
  const [input, setinput] = useState();
  const [output, setoutput] = useState();
  const [quizid, setquizid] = useState();
  const [currentques, setcurrentques] = useState(quesdesc);
  const [data, setdata] = useState(quesdesc);
  const [quesid, setquesid] = useState();
  var index = window.location.href.substring(window.location.href.indexOf("Question/") + 9);
  
  useEffect(data => {
    axios.get(DevelopmentUrl + `/questions/${index}`)
      .then(res => {
        setquesdesc(res.data.description)
        setquestitle(res.data.title)
        setinput(res.data.sampleInput)
        setoutput(res.data.sampleOutput)
      })
      .catch(err => console.error("YO YOU GOT AN ERROR IN AXIOS ", err))

  }, [currentques])

  return (
    <>
      <Container className="px-0">
        <Row>
          <Col xs={12} className="p-3">
            <Card>
              <Card.Body>
                <article>
                  <h1 className="h2" id="changelog">{questitle} </h1>
                  <p className="fs-5 fw-light">{quesdesc}</p>

                  <p className="fs-7 fw-bold">Input: </p>
                  <p className="fs-8 fw-light">{input}</p>
                  <p className="fs-7 fw-bold">Output: </p>
                  <p className="fs-8 fw-light">{output}</p>
                </article>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Editor/>
      </Container>
    </>
  );
}

export default QuestionPage;
