const express=require('express')
const{getGoalTask,createGoalTask,deleteGoalTask,updateGoalTask,getGoalTaskByID}=require('../controllers/GoalTask')
const router=express.Router()
router.get('/getall',async(req,res)=>{
    await getGoalTask(req,res)
})
router.post('/create',async(req,res)=>{
    await createGoalTask(req.body,res)
})
router.delete('/remove/:id',async(req,res)=>{
    await deleteGoalTask(req,res)
})
router.put('/update/:id',async(req,res)=>{
    await updateGoalTask(req,res)
})
router.get('/getbyid/:id',async(req,res)=>{
    await getGoalTaskByID(req,res)
})
module.exports=router
