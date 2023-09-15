const OrgModel = require("../model/OrgModel");
const orgModel = require("../model/OrgModel");
const { ObjectId } = require("mongodb");
const getOrgs = async (req, res) => {
  try {
    const orgData = await orgModel.find({});
    res.status(200).json({
      message: `Data is fetched successfully from the server`,
      orgData,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const createOrg = async (req, res) => {
  try {
    const existingManager = await orgModel.findOne({
      managerName: { $exists: true },
    });
    if (existingManager) {
      return res
        .status(400)
        .json({
          message:
            "A manager already exists. Please delete the existing manager before adding a new one.",
        });
    }
    const existingOrg = await orgModel.findOne();
    if (existingOrg) {
      return res
        .status(400)
        .json({
          message:
            "Organisation Aldready Exist Unsable To Create Organisation Again ",
        });
    }
    const { hrName, managerName } = req.body;
    const createOrgData = new orgModel({
      hrName,
      managerName,
    });

    await createOrgData
      .save()
      .then((data) => {
        res
          .status(200)
          .json({ message: "The Data Has Been Saved Successfully", data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

  const deleteOrg = async (req, res) => {
    const { id, hrId } = req.params; // Add hrId as a route parameter

    if (!id) {
      return res.status(400).json({ message: "No Id Is Provided" });
    }

    const orgData = await orgModel.findById(id).exec();
    if (!orgData) {
      return res
        .status(400)
        .json({
          message: `No Organization Has Found Having The Id ${id}. Please Provide A Valid Id`,
        });
    }
    try {
      if (hrId === 'toptier') {
        // Delete the managerName property from the document
        await orgModel.updateOne({ _id: id }, { $unset: { managerName: 1 } });
      }
      if (hrId!=='toptier') {
        const hrObjId = new ObjectId(hrId);
        const hrindex = orgData.hrName.findIndex((org) =>
          org._id.equals(hrObjId)
        );
        if (hrindex !== -1) {
          orgData.hrName.splice(hrindex, 1);
        } else {
          return res
            .status(400)
            .json({ message: "HR data not found within the organization." });
        }
      }
      await orgData.save();
      return res.status(200).json({ message: 'HR data has been deleted successfully within the organization.' });
    } catch (error) {
      console.log(error)
    }
  };

const updateOrg = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "No Id Is Provided" });
  }
  try {
    const orgData = await orgModel.findById(id).exec();
    if (!orgData) {
      return res
        .status(400)
        .json({
          message: `No User Has Found Having The Id ${id} Please Provide A Valid Id`,
        });
    }
    const { hrName } = req.body;
    if (hrName && Array.isArray(hrName)) {
      for (const newName of hrName) {
        if (orgData.hrName.some((data) => data.id === newName.id))
          return res.status(400).json({ message: "No Duplicates Are Allowed" });
      }
      orgData.hrName = [...orgData.hrName, ...hrName];
      await orgData.save();
      return res
        .status(200)
        .json({ message: "The Data Has Been Updated Successfully", orgData });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  getOrgs,
  createOrg,
  deleteOrg,
  updateOrg,
};
