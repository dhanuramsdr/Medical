import React, { createContext, useEffect, useRef, useState } from 'react'
import Sample3 from './Sample3';
     
export const UserContext=createContext()


function Sample2() {

     const[Values,setValue]=useState('');
     const[Values1,setValue1]=useState('');

     const ref=useRef('')

useEffect(()=>{
console.log('value1',Values1);
console.log('values',Values);

},[Values])

  return (
<>
<label>values:</label>
<input placeholder='enter the values' value={Values} onChange={(e)=>setValue(e.target.value)} />
<label>values1:</label>
<input placeholder='enter the values' value={Values1} onChange={(e)=>setValue1(e.target.value)} />

<label>Ref:</label>
<input placeholder='enter the values' value={ref.current} onChange={(e)=>{ref.current=e.target.value}} />
<br/>
ref.current:{ref.current}

<UserContext.Provider value={{Values,Values1}}>
<Sample3/>
</UserContext.Provider>
</>

)
}

export default Sample2