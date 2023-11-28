import React, { useEffect, useState } from 'react'
import ToDoCard from '../components/ToDoCard';
import { BsInboxesFill } from "react-icons/bs";
import CreateGoalModal from '../components/CreateGoalModal';
import EditGoalModal from '../components/EditGoalModal';
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const token = localStorage.getItem('access_token_todo');
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchGoals()
  }, [])

  const fetchGoals = () => {
    fetch('http://localhost:4000/api/goals', {
      method: "GET",
      headers: {
        "authorization": "Bearer " + token
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setGoals(data);
      setIsLoading(false)
    })
  }

  const deleteGoal = (id) => {
    fetch(`http://localhost:4000/api/goals/${id}`, {
      method: "DELETE",
      headers: {
        "authorization": "Bearer " + token
      }
    })
    .then((res) => res.json())
    .then((data) => {
      fetchGoals()
      setIsLoading(false)
    })
  }

  const createGoal = (data) => {
    fetch('http://localhost:4000/api/goals', {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json)
    .then((data) => {
      fetchGoals()
      setShowCreateGoalModal(false)
    })
  }

  const logout = () => {
    localStorage.removeItem('access_token_todo')
    window.location.reload()
  }


  if(isLoading){
    return <div>loading....</div>
  }
  else {
    return goals.length === 0 
    ? <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className='text-white flex justify-end w-full px-10 translate-y-5'><span className='cursor-pointer flex items-center gap-2' onClick={logout}>Logout <FiLogOut className='translate-y-[2px]'/></span></div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='text-white flex flex-col items-center'>
            <BsInboxesFill size={40}/>
            <h2 className='ml-2 text-2xl font-semibold drop-shadow-2xl mt-2'> No Goals Found</h2>
            <div className='mb-10 text-white underline text-lg font-bold cursor-pointer mt-10' onClick={() => setShowCreateGoalModal(true)}>Create Goal +</div>
          </div>
        </div>
        <CreateGoalModal showModal={showCreateGoalModal} createGoal={createGoal} close={setShowCreateGoalModal}/>
      </div> 
    : (
        <div className='w-full h-full'>
        <div className='text-white flex justify-end w-full px-10 translate-y-5'><span className='cursor-pointer flex items-center gap-2' onClick={logout}>Logout <FiLogOut className='translate-y-[2px]'/></span></div>
          <div className='flex flex-col justify-center items-center pt-10'>
            <div className='mb-10 text-white underline text-lg font-bold cursor-pointer' onClick={() => setShowCreateGoalModal(true)}>Create Goal +</div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-10'>
              { goals.map((goal, idx) => 
                <ToDoCard key={idx} goal={goal} deleteGoal={deleteGoal} fetchGoals={fetchGoals}/>
              )}
            </div>
          </div>
          {showCreateGoalModal && <CreateGoalModal showModal={showCreateGoalModal} createGoal={createGoal} close={setShowCreateGoalModal}/>}
        </div>
      )
  } 
}

export default Home