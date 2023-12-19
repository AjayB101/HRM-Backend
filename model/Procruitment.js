const mongoose = require("mongoose");

const procruitmentSchema = new mongoose.Schema({
    productname: {
        type: String,
    },
    Specification: {
        type: String,
    },
    businessJustification: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    approximateBudget: {
        type: String,
    },
    priority: {
        type: String,
        default: "Low",
    },
    status: {
        type: String,
        default: "Pending",
    },
    productLink: {
        type: String,
    },
    vendorName: {
        type: String,
    },
    vendorNumber: {
        type: Number,
    },
    employeeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
    },
    attachments: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    reportingTo: {
        type: [
            {
                employee: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'employee',
                },
                approved: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        required: true,
    },
    SecondRequest: {
        type: [
            {
                employee: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'employee',
                },
                approved: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        default: [], // default to an empty array
    },
    SecondJustification: {
        type: String,
        default: '', // default to an empty string
    },
}, { timestamps: true });

module.exports = mongoose.model("procruitment", procruitmentSchema);
