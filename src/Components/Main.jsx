import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Main() {
    const [todo, settodo] = useState("")
    const [todos, settodos] = useState([])



    const handleedit = (e, id) => {
        let t = todos.filter(i => i.id === id)
        settodo(t[0].todo)

        let newtodos = todos.filter(item => {
            return item.id !== id
        });
        settodos(newtodos)
    }

    const handledelete = (e, id) => {

        let newtodos = todos.filter(item => {
            return item.id !== id
        });
        settodos(newtodos)

    }


    const handleadd = () => {
        settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
        settodo("")


    }

    const handlechange = (e) => {
        settodo(e.target.value)
    }

    const handlecheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;

        })
        let newtodos = [...todos];
        newtodos[index].iscompleted = !newtodos[index].iscompleted;
        settodos(newtodos)
    }




    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("tod"));
        if (savedTodos && savedTodos.length > 0) {
            settodos(savedTodos);
        }
    }, [])

    // Save todos to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("tod", JSON.stringify(todos));
    }, [todos])




    return (
        <>
            <div className='flex items-center min-h-[80vh] '>
                <div className="container bg-[#7FC7D9]   h-[92.5vh] text-center text-white font-bold text-xl  ">
                    <p className='p-3 text-black'> TO-DO LIST FOR DAILY USES</p>
                    <div className="box bg-[#DCF2F1] h-4/5  w-[80vw] m-auto text-black min-h-[80vh] ">
                        <div className='bg-[#0F1035] p-2'>
                            <input onChange={handlechange} value={todo} type="text" placeholder='Enter Anything You Want to Save' className='w-2/3 font-normal  p-1 text-lg' />
                            <button onClick={handleadd} className='bg-white rounded-3xl px-2 text-black m-2 font-normal'>Add</button>
                        </div>
                        <div className='todos text-sm '>
                            {todos.map(item => {
                                return <div key={item.id} className="todo flex w-1/2 justify-between ">
                                    <div className="flex gap-5">
                                        <input className='mx-5' onChange={handlecheckbox} type="checkbox" name={item.id} value={item.iscompleted} id="" />
                                        <div className={item.iscompleted ? "line-through m-2 font-semibold " : " font-semibold m-2"}>{item.todo}</div>
                                        <div className="buttons">
                                            <button onClick={(e) => { handleedit(e, item.id) }} className=' text-black bg-white px-2 rounded-xl font-bold m-1'>Edit</button>
                                            <button onClick={(e) => { handledelete(e, item.id) }} className=' text-black bg-white px-2 rounded-xl font-bold m-2'>Delete</button>
                                        </div></div>
                                </div>
                            })}
                        </div>

                    </div>

                </div>
            </div >

        </>
    )
}

export default Main
