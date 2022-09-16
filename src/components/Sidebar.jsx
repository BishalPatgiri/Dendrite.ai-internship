import { faHeart, faList, faPlayCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = ({showSearch,setshowSearch}) => {
  return (
    <div id='sidebar'>
        <div>
            <FontAwesomeIcon icon={faList} />
            <Link className='list' to="/" >Home</Link>
        </div>
        <div>
            <FontAwesomeIcon icon={faSearch}/>
            <p onClick={()=>setshowSearch(!showSearch)}>Search</p>
        </div>
        <div>
            <FontAwesomeIcon icon={faHeart} />
            <Link className='list' to="/favourites">Favrouites</Link>
        </div>
        <div>
        <FontAwesomeIcon icon={faPlayCircle} />
            <Link className='list' to="/playlist">Playlist</Link>
        </div>     
    </div>
  )
}
