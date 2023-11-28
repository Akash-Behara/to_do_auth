import React, { useState } from 'react'
import moment from 'moment';

import { LuClipboardEdit } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

import GoalModal from './GoalModal';
import EditGoalModal from './EditGoalModal';


const ToDoCard = ({ goal, deleteGoal, fetchGoals }) => {
  const token = localStorage.getItem('access_token_todo');

  const [showModal, setShowModal] = useState(false)
  const [showEditGoalModal, setShowEditGoalModal] = useState(false)
  const [selectedGoalId, setSelectedGoalId] = useState("")

  const editGoal = (id, data) => {
    fetch(`http://localhost:4000/api/goals/${selectedGoalId._id}`, {
      method: "PUT",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((data) => {
      fetchGoals()
      setShowEditGoalModal(false)
    })
  }

  const deleteModal = () => {
    setShowModal(true)
  }

  return (
    <div className='border min-w-[280px] min-h-[120px] p-2 flex flex-col justify-between shadow-lg rounded-md backdrop-blur-xl backdrop-brightness-150 bg-opacity-60 mb-2'>
      <div className='text-white flex flex-col pt-2'>
        <h1 className='text-lg font-semibold break-words'>{goal.goal}</h1>
        {/* <h2 className='text-gray-300 text-[12px]'>{moment(goal.createdAt).format('MMM Do YYYY, h:mm:ss a')}</h2> */}
      </div>
      <div className='w-full flex justify-between gap-2'>
        <h2 className='text-gray-300 text-[12px]'>{moment(goal.createdAt).format('MMM Do YYYY, h:mm:ss a')}</h2>
        <div className='flex items-center'>
          <button className='text-sm text-white font-semibold hover:scale-105 transition-all duration-100'><LuClipboardEdit onClick={() => {setShowEditGoalModal(true); setSelectedGoalId(goal)}} size={15} className=''/> </button>
          <button className='text-sm text-white font-semibold hover:scale-105 transition-all duration-100' onClick={() => {deleteModal(goal._id)}}><MdDeleteOutline size={20} className='text-red-500'/></button>
        </div>
      </div>
      {showModal && <GoalModal showModal={showModal} closeModal={() => setShowModal(false)} deleteGoal={() => {deleteGoal(goal._id)}}/>}
      {showEditGoalModal && <EditGoalModal showModal={showEditGoalModal} editGoal={editGoal} selectedGoal={selectedGoalId} close={setShowEditGoalModal}/> }

    </div>
  )
}

export default ToDoCard