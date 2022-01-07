import React ,{useState, useEffect, Fragment} from 'react'
import axios from 'axios';
import Sidebar from "../../Component/Sidebar"
import { Link } from 'react-router-dom';
import data from '../../Component/data';
import Timer from '../../Component/Timer';
function JavaFullStack(props) {

  const [ state, setState ] = useState([])
  console.log("Rendering with: ", state);
  
  useEffect(data => {
       const getFromServer = axios.get('http://localhost:8080/quiz/javafullstack')
          .then(res => {
              console.log("RES.DATA LOOKS LIKE THIS:, ", res.data);
              setState(res.data[0].question);
          })
          .catch (err => console.error("YO YOU GOT AN ERROR IN AXIOS ", err))
  
  },[])
  


  // const[posts, setPosts]= useState([])
  // useEffect (()=>{
  //   const fetchPostList = async () =>{
  //     const { data} =await axios("http://localhost:8080/quiz/javafullstack" )
  
  //     setPosts(data)
  //     console.log(posts)
  
  //   }
  
  //   fetchPostList()
  // },[setPosts])
  return (
    <>
     <div style={{display:"flex"}}>
          {/* <SecondNavbar/> */}
         <div style={{width:"20%"}}>
         <Sidebar/>
         </div>
    <div style={{width:"80%"}}>
    <div className='heading' style={{marginLeft:"600px"}}>
  {/* <Heading/>   */}
<Timer/>
  </div>
    <div style={{marginTop:"20px", width:"80%", height:"190px" , border:"1px solid gray"}}>
<bold><h2 style={{fontSize:"20px", marginTop:"10px", marginLeft:"20px"}}>Quiz Instruction</h2></bold>
<table style={{width:"90%" , marginLeft:"20px"}}>
<thead >
  <tr>

    <th>Marks:50</th>
    <th>No. of Questions:10</th>
    <th>Time limit:3h</th>
    <th>Allowed Attempts :3</th>
  </tr>
</thead>
</table>
<bold><h2 style={{fontSize:"20px", marginTop:"10px", marginLeft:"20px"}}> Instruction</h2></bold>
<h3 style={{textAlign:"justify", marginLeft:"20px", marginRight:"20px"}}>This quiz consists of 10 multiple-choice questions. To be successful with the weekly quizzes, it’s important to thoroughly read chapter 5 in the textbook.  It will also be extremely useful to study the key terms at the end of the chapter and review the Test Your Knowledge activity at the end of the chapter. Keep the following in mind:</h3>
    </div>
    <table style={{width:"80%", marginTop:"60px"}}>
<thead>
  <tr>
<th></th>
    <th>Title</th>
    <th>Difficulty</th>
    <th>Start Quiz</th>
    
  </tr>
</thead>
<tbody>
{
  state && state.map((item, index)=>(
<tr key={item._id}>
<td>{index}</td>
    <Link to={'/QuizSubmit/'+index+'/'+item._id}><td>{item.title}</td></Link>
    <td>Hard</td>
    <td>

      
<Link to={'/QuizSubmit/'+index}>
<button type='button' className='buttonsubmit'  >Solve Now</button></Link> </td>
    
</tr>
  ))
}
 
 
</tbody>
</table>

<button type='button' className='buttonsubmit' style={{marginLeft:"400px", marginTop:"40px"}} >Submit Quiz</button> 
    </div>
      </div>
    </>
  )

}
export default JavaFullStack