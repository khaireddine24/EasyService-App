import React from 'react'
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Easy Service</h1>
      <Link to={'/login'}>
        <Button>Login</Button>
      </Link>
    </div>
  )
}

export default Home
