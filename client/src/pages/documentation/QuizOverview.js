import React, {useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Button, Col, Row } from '@themesberg/react-bootstrap';
import { Redirect,useHistory } from 'react-router-dom';

import { Routes } from "../../routes";
import { PageTrafficTable } from "../../components/Tables";
import DevelopmentUrl from "../../constant";



export default () => {
  let history= useHistory();
  const [sss,setsss]=useState(false);
  const [h, seth] = useState(sessionStorage.getItem("h"));
  const [m, setm] = useState(sessionStorage.getItem("m"));
  const [s, sets] = useState(sessionStorage.getItem("s"));
  const [score, setScore] = useState(0)
  let token = localStorage.getItem('token');
  var  userscore=0;
  
  useEffect(data => {
   setTimeout(()=>{
    var hvalue=h
    var mvalue=m
    var svalue=s
    if(hvalue==3){
      sessionStorage.clear();
      setsss(true);
    }
    if(svalue>=60){
      svalue=0
      sessionStorage.setItem("s",svalue)
      sets(svalue)
      mvalue = parseInt(mvalue)+1
      sessionStorage.setItem("m",mvalue)
     
      setm(mvalue)
    }
    if(mvalue>=60){
      mvalue=0
      sessionStorage.setItem("m",mvalue)
      
      setm(mvalue)
      hvalue=parseInt(hvalue)+1
      sessionStorage.setItem("h",hvalue)
      seth(hvalue)
      
    }
      svalue=parseInt(svalue)+1
      sessionStorage.setItem("s", svalue)
      sets(svalue)
    
    
     
      
  }
      
     
    , 1000)

  }, [h,m,s])


  async function submithandler(){
    
    const response = await fetch(DevelopmentUrl+'/quizresults/getscore', {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }
  })
 let  v = await(response.json());
 userscore=v.AvgScore
 history.push({
  pathname:Routes.QuizStartNow.path,
  state:{from:userscore}
})
}


  return (
    <>
    {sss && <Redirect to={Routes.QuizStartNow.path}/>}
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
          </Col>
          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
          <h3 >{h}:{m}:{s}</h3>
          </Col>
          </Row>
          <h6>Instruction</h6>
          <p className="mb-0">
          The objective of this Java Full Stack Assessment the talented and creative minds in competitive programming with some interesting algorithmic problems.The participants will be challenged by Multiple Problem Setters with 4 problems of varying difficulty levels in a duration of 3 hr. 
          </p>
        </div>
        
      </div>
      
      <PageTrafficTable />
      <Button type="link" className="m-1" onClick={submithandler}>Final Submit</Button>
      
      </>
  );
};

