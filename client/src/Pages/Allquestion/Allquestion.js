import React from 'react'
import QuestionTable from '../../Component/QuestionTable'
import SecondNavbar from '../../Component/SecondNavbar'
import Sidebar from "../../Component/Sidebar"

export default function Allquestion() {
    return (
        <>
        <div style={{display:"flex"}}>
            {/* <SecondNavbar/> */}
           <div style={{width:"20%"}}>
           <Sidebar/>
           </div>
      <div style={{width:"80%"}}>
      <QuestionTable/> 
      </div>
        </div>
        
        </>
    )
}
