// import React, { useState } from 'react'
// import note from "./not.png"
// function Todolist() {
//     const [inputData, setInputData]= useState(" ")
//     const [items, setItems]= useState([])
//     function addItem(){
//         if(!inputData)
//         {

//         }
//         else {
//         setItems([...items, inputData])
//         setInputData("")
//         }
//     }
//     const Delete=(id)=> {
// console.log("deleted")
// const updateditems = items.filter((elem,ind)=>{
//     return (ind!==id)
// });
// setItems(updateditems);
//     }
//     const removeAll=()=> {
//         setItems([]);
//     }
//   return (
//     <>
//     <div className='main ' >
//     <div className='child '>
//         <figure>
//             <img className='noteimg' src={note}/>
//             <figcaption>Enter Text Here</figcaption>
//         </figure>
//         <div className='inputfield'>
//             <input type='text' className='input' placeholder="add some text here... "
//             value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
//             <button className='addbtn' onClick={addItem}>Add</button>
//         </div>
//         <div className='showitem'>
//             {
//                 items.map(( elem, ind) => {
//                     return (
//                         <div className='eachitem' key={ind}>
//                         <h4>{elem}</h4>
//                         <button className='delete' onClick={()=>Delete(ind)}>Delete</button>
//                     </div>

//                     )
//                 })
//             }

//             <div className=''>
//                 <button className='deleteall' onClick={removeAll}>Delete All</button>
//             </div>
//         </div>

//     </div>
//     </div>
//     </>
//   )
// }

// export default Todolist;
import React, { useState, useEffect } from "react";
import note from "./not.png";

function Todolist() {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("todolist_items");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItems, setIsEditItems]= useState(null);

  function addItem() {
    if (!inputData) {
      alert("please write something")
    } else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem)=>{
          if(elem.id===isEditItems){
            return {...elem, name: inputData}
            
          }
          return elem;
        })
      )
      setToggleSubmit(true)
      setInputData(" ");
      setIsEditItems(null);
    }

    else {
      const Allinputdata = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, Allinputdata]);
      setInputData("");
    }
  }

  const Delete = (index) => {
    const updatedItems = items.filter((elem) => index !== elem.id);
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("todolist_items", JSON.stringify(items));
  }, [items]);
  const Edit = (id) => {
    const newEditItems = items.find((elem)=>{
    return (elem.id ===id)
    });
    setToggleSubmit(false)
    setInputData(newEditItems.name);
    setIsEditItems(id);
  };

  return (
    <>
      <div className="main ">
        <div className="child ">
          <figure className="fig">
            <img className="noteimg" src={note} alt="note" />
            <figcaption>Enter Text Here</figcaption>
          </figure>
          <div className="inputfield">
            <input
              type="text"
              className="input"
              placeholder="add some text here... "
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleSubmit ? (
              <button className="addbtn" onClick={addItem}>
                {" "}
                Add{" "}
              </button>
            ) : (
              <button className="editbtn" onClick={addItem}>
                Edit
              </button>
            )}
          </div>
          <div className="showitem">
            {items.map((elem) => (
              <div className="eachitem" key={elem.id}>
                <h4>{elem.name}</h4>
                <div>
                  <button className="editbtn" onClick={() => Edit(elem.id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => Delete(elem.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}

            <div className="">
              <button className="deleteall" onClick={removeAll}>
                Delete All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todolist;
