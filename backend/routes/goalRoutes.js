const express = require('express');
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController');

const goalRouter = express.Router();
const { protectRoute } = require('../middleware/authMiddleware')

goalRouter.get('/', protectRoute, getGoals);
goalRouter.post('/', protectRoute, setGoal);
goalRouter.put('/:id', protectRoute, updateGoal);
goalRouter.delete('/:id', protectRoute, deleteGoal);

module.exports = goalRouter