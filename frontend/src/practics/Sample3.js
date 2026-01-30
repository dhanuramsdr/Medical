import React, { useContext } from 'react'
import { UserContext } from './Sample2'

function Sample3() {
    const user=useContext(UserContext)
  return (
    <div>
        <h1>
           user1: {user?.Values}
           <br/>
           user2:{user?.Values1}
        </h1>
        </div>
  )
}

export default Sample3