import React ,{useState, useEffect} from 'react'
import axios from 'axios';
import DrpDwnSection from '../../Component/DroupDownSection'
import Heading from '../../Component/Heading';
import AllQusetion from "../Allquestion/Allquestion"
import "../../Component/CSS/Home.css";
import { Link } from 'react-router-dom';

import Timer from '../../Component/Timer';
import { FiSkipBack } from 'react-icons/fi';


export default function QuizSubmit(props) {
    console.log(props);
    let report;
      const[quesdesc, setquesdesc]= useState();
      const[quizid,setquizid]=useState();
      const[currentques,setcurrentques]=useState(quesdesc);
      const[data,setdata]=useState(quesdesc);
      const[quesid,setquesid]=useState();
    var index = props.match.params.index;
    var questionid= props.match.params.id;
    
  const [ state, setState ] = useState([])
  console.log("Rendering with: ", state);
  
  useEffect(data => {
       const getFromServer = axios.get('http://localhost:8080/quiz/javafullstack')
          .then(res => {
              console.log("RES.DATA LOOKS LIKE THIS:, ", res.data);
              console.log(res)
              setState(res.data[0].question[index]);
              setquesdesc(res.data[0].question[index].description)
              setdata(res.data[0].question);
              setquizid(res.data[0].time)
              setquesid(props.match.params.id)
              console.log(quizid)
          })
          .catch (err => console.error("YO YOU GOT AN ERROR IN AXIOS ", err))
  
  },[currentques])



      // let url= 'http://localhost:8080/submit/'+props.match.params.id;
  
  
      // useEffect (()=>{
      //     const fetchPostList = async () =>{
      //       console.log("API HIT 1")
      //       const { data } =await axios(url)
      //       report = data;
      //       console.log("API HIT 2");
      //       console.log(report);
      //       setquesdesc(data.description)
            
      //       console.log(data.description)
  
      //     }
  
      //     fetchPostList()
      //   },)
 

      return(
          <div>
                 <div className='heading' style={{marginTop:"100px"}}>
  {/* <Heading/>   */}

  </div>
  <div className='main-div'>
  <div className='question '>
      <h2>Question : {props.match.params.id}</h2>
      <h3>{quesdesc}</h3>
     <div style={{marginTop:"450px"}}>
     <Link to="/JavaFullStack"><button type='button'className="buttonsubmit" style={{width:"100px"}} >
       <FiSkipBack/>
       Back to Quiz</button> </Link>

     </div>


  </div>
  
  <div className='compiler'   >
  <DrpDwnSection quesid={quesid}/>
  </div>
      
  <h3>{report}</h3>
{/*   
  <button type='button' className='buttonsubmit' style={{marginLeft:"400px", marginTop:"40px",backgroundColor:"blue"}} >Submit Quiz</button> */}
  </div>  
          </div>
      )
  }