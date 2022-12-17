import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='homeMain'>
        <div>
          New User?? -<Link to = '/signup'> Sign up</Link> 
        </div>
        <div>
          Already Have an Account? - <Link to = '/login'> Log in</Link>
        </div> 
      </div>
    </div>
  )
}

export default Home