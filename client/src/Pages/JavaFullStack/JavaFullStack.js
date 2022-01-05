import React ,{useState, useEffect} from 'react'
import axios from 'axios';
import Sidebar from "../../Component/Sidebar"
import { Link } from 'react-router-dom';
function JavaFullStack(props) {
//     const params = useParams();
// console.log(params)
const[posts, setPosts]= useState()
useEffect (()=>{
  const fetchPostList = async () =>{
    const  data =await axios("http://localhost:8080/quiz/javafullstack" )

    setPosts(data)
    console.log(data)
    console.log(posts)
// console.log(posts.blogs[0].question[0].title)
  }

  fetchPostList()
},[setPosts])
    return (
      <>
       <div style={{display:"flex"}}>
            {/* <SecondNavbar/> */}
           <div style={{width:"20%"}}>
           <Sidebar/>
           </div>
      <div style={{width:"80%"}}>
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
      
    </tr>
  </thead>
  <tbody>
  {/* {
    posts.blogs && posts.blogs.map((item, index)=>(
<tr key={item[0].question[index]._id}>
<td>{item[0].question[index]}</td>
      <Link to={'/QuizSubmit/'+item[0].question[index]}><td>{item[0].question[index].title}</td></Link>
      <td>Hard</td>
      
</tr>
    ))
  } */}
   
   
  </tbody>
</table>
      </div>
        </div>
      </>
    )
}

export default JavaFullStack
