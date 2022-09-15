import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Favrouite } from '../Favrouite'
import { HomePage } from '../HomePage'
import { PlayList } from '../PlayList'

export const AllRotes= () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/favourites' element={<Favrouite/>}></Route>
            <Route path='/playlist' element={<PlayList/>}></Route>

        </Routes>
    </div>
  )
}
