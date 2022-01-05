import React from 'react'
import CardData from "../../Component/Card"
import Sidebar from "../../Component/Sidebar"

function JavaFullStack() {
    return (
      
          <div style={{display:"flex"}}>
          {/* <SecondNavbar/> */}
         <div style={{width:"20%"}}>
         <Sidebar/>
         </div>
    <div style={{width:"80%"}}>
    <CardData/>
    </div>
      </div>
    )
}

export default JavaFullStack
