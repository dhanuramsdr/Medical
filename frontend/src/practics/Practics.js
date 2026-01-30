import React, { useState } from 'react'

function Practics() {
 const images = [
    'https://via.placeholder.com/600x400?text=Image+1',
    'https://via.placeholder.com/600x400?text=Image+2',
    'https://via.placeholder.com/600x400?text=Image+3',
  ];
  const[currentIndex,setCurrentIndex]=useState(0);

  const gotoNext=()=>{
    setCurrentIndex((currentIndex-1)%images.length)
  }
  const gotoPrevious=()=>{
    setCurrentIndex((currentIndex-1+images.length)%images.length)
  }

return(
  <>
  <div >
    <button  onClick={gotoNext}> {`>`} </button>
    <image src={images[currentIndex]} alt="carousel"/>
    <button onClick={gotoPrevious}>{`<`}</button>
  </div>
  
  </>
)


// const[showmodel,setShowModal]=useState(false)
//     return(
//     <>
//     <button onClick={()=>setShowModal(true)}>
//         open model

//     </button>

//     {
//         showmodel&&(
//             <div style={style.overlay} onClick={()=>setShowModal(false)}>
//                 <div style={style.modal} onClick={(e)=>e.stopPropagation()}>
//                             <h2>Modal Title</h2>
//             <p>This is simple modal content</p>
//             <button onClick={() => setShowModal(false)}>Close</button>

//                 </div>
//             </div>
//         )
//     }
//     </>
// )

//     const [todo,setTodo]=useState([]);
//     const[text,seteExt]=useState('');
//     const addTodo=()=>{
//         if(text){
//             setTodo([...todo,{text,completed:false}]);
//             seteExt('')
//         }
//     }
//     const toggleTodo=index=>{
//         const newTodo=[...todo];
//         newTodo[index].completed=!newTodo[index].completed;
//     }
//     const removeTodo=index=>{
// const newTodo=[...todo];
// newTodo.splice(index,1)
// setTodo(newTodo)
//     }

//   return (
//     <div>
//         <input value={todo} placeholder='Add-to-do' onChange={(e)=>seteExt(e.target.value)}/>
//         <button onClick={addTodo}>Add</button>
//         <ul>
//             {todo.map((todo,text)=>{
                
//             })}
//         </ul>
//     </div>
//   )
}

export default Practics

const style={
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%'
  }
}
