const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    console.log('go', goals)
    res.status(200).json(goals)
})

const setGoal = asyncHandler( async(req, res) => {
    if(!req.body.goal){
        res.status(400).json({message: "Please set a goal"})
    }

    const goal = await Goal.create({
        goal: req.body.goal,
        user: req.user.id
    });

    res.status(200).json(goal)
})

const updateGoal = asyncHandler( async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400).json({message: "Goal not found"})
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401).json({message: "User not found"})
    }

    if(goal.user.toString() !== user.id){
        res.status(401).json({message: "User not authorized"})
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedGoal);
})

const deleteGoal = asyncHandler( async(req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400).json({message: "Goal not found"});
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401).json({message: "User not found"});
    }

    if(goal.user.toString() !== user.id){
        res.status(401).json({message: "User not authorized"});
    }

    await goal.deleteOne();
    res.status(200).json({message: `Goal deleted ${req.params.id}`})
})

module.exports = { getGoals, setGoal, updateGoal, deleteGoal }