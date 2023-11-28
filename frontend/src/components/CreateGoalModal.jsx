import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal'

const CreateGoalModal = ({ showModal, createGoal, close }) => {
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

    const goal = () => {
        if(goalData.goal === ""){
            alert('Please Fill Goal')
        } else {
            createGoal(goalData)
            setGoalData({goal: ""})
        }
    }

  return (
    <Modal
        isOpen={showModal}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        backdrop="static"
        ariaHideApp={false}
    >
        <div className='px-2 w-72 md:w-80'>
            <div className='flex justify-end -translate-y-2'><IoMdClose className='cursor-pointer' onClick={() => close(false)}/></div>
            <div>
                <h2 className='text-2xl font-bold mb-2'>Create a Goal</h2>
                <div>
                    <label htmlFor={"goal"} className="text-black font-semibold text-lg">
                        <input
                            type={'text'}
                            name={'goal'}
                            onChange={handleInputChange}
                            placeholder='Goal...'
                            className="w-full rounded-[4px] border border-gray-300 text-black p-1 mt-1 text-md focus:outline-none"
                        />
                    </label>
                    <div className='w-full flex justify-end mt-2'>
                        <button onClick={goal} className='flex justify-end text-sm border border-gray-300 shadow-md px-2 py-1 rounded-md'>Create</button>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
  )
}

export default CreateGoalModal