import React ,{useState, useEffect} from 'react'
import axios from 'axios';
import DrpDwnSection from '../../Component/DroupDownSection'
import Heading from '../../Component/Heading';
import AllQusetion from "../Allquestion/Allquestion"
import "../../Component/CSS/Home.css";
import { Link } from 'react-router-dom';

import Timer from '../../Component/Timer';


export default function QuizSubmit(props) {
    console.log(props);
    let report;
      const[quesdesc, setquesdesc]= useState();
      const[quesid,setquesid]=useState();
      let url= 'http://localhost:8080/submit/'+props.match.params.id;
  
  
      useEffect (()=>{
          const fetchPostList = async () =>{
            console.log("API HIT 1")
            const { data } =await axios(url)
            report = data;
            console.log("API HIT 2");
            console.log(report);
            setquesdesc(data.description)
            
            console.log(data.description)
  
          }
  
          fetchPostList()
        },)
      return(
          <div>
                 <div className='heading' style={{marginLeft:"1200px"}}>
  {/* <Heading/>   */}
<Timer/>
  </div>
  <div className='main-div'>
  <div className='question '>
      <h2>Question : {props.match.params.id}</h2>
      <h3>{quesdesc}</h3>
     <div style={{marginTop:"450px"}}>
     <button type='button'className="buttonsubmit" >Previous</button> 
{/*      
        <Button className="buttonsubmit" text="Submit"/> */}
        <button type='button' className='buttonsubmit' style={{marginLeft:"400px"}} >Next</button>
     </div>


  </div>
  
  <div className='compiler'   >
  <DrpDwnSection quesid={quesid}/>
  </div>
      
  <h3>{report}</h3>
  
  <button type='button' className='buttonsubmit' style={{marginLeft:"400px", marginTop:"40px",backgroundColor:"blue"}} >Submit Quiz</button>
  </div>  
          </div>
      )
  }