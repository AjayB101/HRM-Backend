const orgModel = require("../model/OrgModel");
const getOrgs = async (req, res) => {
  try {
    const orgData = await orgModel.find({});
    return res
      .status(200)
      .json({ message: "The Data is Fetched From Server", orgData });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createOrg = async (req,res)=>{
  try {
    const {hrName,managerName }=req.body
    const createOrgData = new orgModel({
        hrName,
        managerName
    })
    await createOrgData.save()
    .then((data)=>{
        res.status(200).json({message:'The Data Has Been Saved Successfully',data})
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)})
  } catch (error) {
    res.status(500).json(error)
    console.log(error) 
  }
}
module.exports = {
  getOrgs,
  createOrg
};
