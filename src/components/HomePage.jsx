import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons'; 
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {Sidebar} from "./Sidebar"
import { useDispatch, useSelector} from 'react-redux';
import { addFav, getMusicSuccess } from './Redux/action';

const clientId = '917a77ee78214ee3ae74d32a799c6a3d';
const clientSecret = '140913908ed846edbf6e8e99803c0b2d';

export const HomePage = () => {

  const [token,setToken]=useState("")
  const [showSearch,setshowSearch]=useState(false)
  // const [data,setData]=useState([])
  const [name,setName]=useState("")
  const dispatch=useDispatch()
  const data=useSelector(pre=>pre.musics)

    // private methods
  const getToken = async () => {

        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
            },
            body: 'grant_type=client_credentials&client_id='+clientId+"&client_secret="+clientSecret
        }).then(res=>res.json())
        .then(data=>setToken(data.access_token))
    }

    const getGenres = async (token) => {

      await fetch(`https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=12`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
      }).then(res=>res.json()).then(data=>dispatch(getMusicSuccess(data.items)))
  }

    useEffect(()=>{
      if(data.length===0){
      getToken()
      getGenres(token)
      }
    },[data.length,token])

    //console.log(data)

    const handleSearch=()=>{
      const arr=data.filter((ele)=>ele.name.toLowerCase()===name.toLowerCase())
      dispatch(getMusicSuccess(arr))
    }

    const handleFav=(image,name)=>{
      alert("Added to Favourites")
      const payload={
        image:image,
        name:name
      }
      dispatch(addFav(payload))
    }



  return (
    <div id='homepage'>
      <div id='mainSidebar'>
          <Sidebar setshowSearch={setshowSearch} showSearch={showSearch}/>
      </div>
      <div id="mainDiv">
          <img height={"320px"} width="100%" src="https://englishproficiency.com/wp-content/uploads/2022/03/Describe-Your-Favorite-Song-2048x832.webp" alt="" />
          <div>
            <div>
            <p style={{fontSize:"20px",color:"grey"}}>RELEASED THIS WEEK</p>
            <div id='search' className={!showSearch?"noDisplay":""}>
              <input value={name} onChange={(e)=>setName(e.target.value)} style={{width:"300px",height:"35px",marginTop:"15px",borderRadius:"8px",paddingLeft:"15px"}} type="text" name="" id="" placeholder='Enter Name' />
              <br />
              <button onClick={handleSearch} style={{padding:"5px 10px",backgroundColor:"orangered",color:"white",border:"0",borderRadius:"5px",marginTop:"10px",cursor:"pointer"}}>Search</button>
            </div>
            </div>
            <div id='albumDiv'>
                {data.length>0&&data.map(ele=>(
                  <div key={ele.id}>
                    <img width="100%" src={ele.images[1].url} alt="" />
                    <p style={{fontSize:"15px"}}>{ele.name}</p>
                    <FontAwesomeIcon style={{fontSize:"25px",color:"red"}} onClick={()=>handleFav(ele.images[1].url,ele.name)} icon={faStar}></FontAwesomeIcon>
                  </div>
                ))}              
            </div>
            
            
          </div>
      </div>
    </div>
  )
}
