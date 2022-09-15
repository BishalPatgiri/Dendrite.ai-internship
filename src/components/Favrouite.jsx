import React from 'react'
import { useSelector } from 'react-redux'

export const Favrouite = () => {
  const data=useSelector(pre=>pre.favMusic)
  console.log(data)
  return (
    <div>
      <h1 style={{width:"100%",textAlign:"center",marginTop:"20px"}}>Favrouite Songs</h1>
      <div id='albumDiv' style={{width:"90%",margin:"auto",marginTop:"40px"}}>
                {data.length>0&&data.map(ele=>(
                  <div key={ele.name}>
                    <img width="100%" src={ele.image} alt="" />
                    <p style={{fontSize:"15px"}}>{ele.name}</p>
                  </div>
                ))}              
      </div>
    </div>
  )
}
