import React, { useState } from 'react'
import Modal from 'react-modal'
import { IoWarning } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


const GoalModal = ({ showModal, closeModal, deleteGoal }) => {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
            background: "rgba(0, 0, 0, .6)"
        }
    };

    const [goalData, setGoalData] = useState({
      goal: "",
    })
    
    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setGoalData((prev) => ({
        ...prev,
        [name]: value
      }))
    } 

    const delgoal = () => {
        deleteGoal()
        closeModal(false)
    }

  return (
    <Modal
        isOpen={showModal}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        backdrop="static"
        ariaHideApp={false}
    > 
        <div className='w-80'>
          <div className='w-full flex justify-end -translate-y-2'><IoMdClose onClick={() => {closeModal(false)}} className='cursor-pointer'/></div>
            <div>
                <h2 className='flex items-center text-lg'><IoWarning size={36} className='text-red-500 mr-2'/> Are you sure you want to delete!</h2>
                <div className='flex justify-center items-center gap-2 mt-4'>
                    <button onClick={delgoal} className='w-20 h-8 border border-gray-300 rounded-md shadow-sm'>Yes</button>
                    <button className='w-20 h-8 border border-gray-300 rounded-md shadow-sm' onClick={() => {closeModal(false)}}>Cancel</button>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default GoalModal