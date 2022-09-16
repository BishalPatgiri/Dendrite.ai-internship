import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getMusicSuccess } from './Redux/action';
import { getLocalData, saveLocalData } from './utils/localStorage';

const clientId = '917a77ee78214ee3ae74d32a799c6a3d';
const clientSecret = '140913908ed846edbf6e8e99803c0b2d';

export const PlayList = () => {

  const [token,setToken]=useState("")
  const [name,setName]=useState("")
  const [list,setList]=useState([])
  console.log(JSON.parse(getLocalData("playlist")))
  const [mainlist,setMainlist]=useState(JSON.parse(getLocalData("playlist"))||[])
  const dispatch=useDispatch()
  const data=useSelector(pre=>pre.musics)


  const handleCreate=()=>{

    let main={
      playlistName:name,
      songs:[...list]
    }
    setMainlist([...mainlist,main])
    saveLocalData("playlist",JSON.stringify(mainlist))
    setName("")
    setList([])
    // alert("Hemma")
  }

  const handlePlay=(image,songname)=>{
    let data={
      name:songname,
      image:image
    }
    setList([...list,data])
  }
  // console.log(mainlist)

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
  getToken()
  getGenres(token)
},[token])

  return (
    <div>
      <h1 style={{width:"100%",textAlign:"center",marginTop:"20px"}}>Playlists</h1>
      <div style={{width:"20%",margin:"auto",marginTop:"20px"}}>
        <h3>Create New Paylist</h3>
        <input value={name} onChange={(e)=>setName(e.target.value)} style={{width:"300px",height:"35px",marginTop:"15px",borderRadius:"8px",paddingLeft:"15px"}} type="text" name="" id="" placeholder='Enter Name' />
              <br />
              <button onClick={handleCreate} style={{padding:"5px 10px",backgroundColor:"orangered",color:"white",border:"0",borderRadius:"5px",marginTop:"10px",cursor:"pointer"}}>Create</button>
      </div>
      <div className='playlistDiv' style={{marginTop:"20px",borderTop:"1px solid grey",borderBottom:"1px solid grey",padding:"20px 10px"}}>
          {
          mainlist.length>0&&mainlist.map(ele=>(
            <div key={ele.playlistName} style={{width:"90%",margin:"auto",padding:"20px",borderRadius:"10px"}}>
              <h2 style={{marginBottom:"20px"}}>{ele.playlistName}</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"20px"}}>
              {ele.songs.length>0&&ele.songs.map(elem=>(
                  <div key={elem.name}>
                    <img width="100%" src={elem.image} alt="" />
                    <p style={{fontSize:"15px"}}>{elem.name}</p>
                  </div>
                ))} 

              </div>
            </div>
          ))
}


      </div>





      <h1 style={{width:"100%",textAlign:"center",marginTop:"20px"}}>Click to Add Songs</h1>
      <div id='albumDiv'>
                {data.length>0&&data.map(ele=>(
                  <div key={ele.id} onClick={()=>handlePlay(ele.images[1].url,ele.name)} style={{cursor:"pointer"}}>
                    <img width="100%" src={ele.images[1].url} alt="" />
                    <p style={{fontSize:"15px"}}>{ele.name}</p>
                  </div>
                ))}              
            </div>


    </div>
  )
}
