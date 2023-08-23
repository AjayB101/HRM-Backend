const orgModel =require('../model/OrgModel')
const getOrgs=async(req,res)=>{
    try {
        const orgData= await orgModel.find({})
        if(!orgData){
            res.status(400).json({message:'No Data Found'})
        }
        return res.status(200).json({message:'The Data is Fetched From Server',orgData})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports ={
    getOrgs
}