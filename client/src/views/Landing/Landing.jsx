import React from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const Landing = () => {

  

  return (
    <div className='landing-button'>
      <Link to='/home' className='landing-link'>Ingresar</Link>
    </div>
  )
}

export default Landing
