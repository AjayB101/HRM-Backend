const mongoose = require('mongoose');

const travelExpSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    business: {
        type: String,
        required: true
    },
    claimtype: {
        type: String,
        required: true
    },
    transport: {
        type: String,
        required: true
    },
    employeeid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    attachments: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    
	reportingTo: [ 
		{
			employee: {
			  type: mongoose.Schema.Types.ObjectId,
			  ref: 'employee',
              required: true
			},
			approved: {
				type: Boolean,
				default: false,
			},
           
		}, 
	],
})

module.exports = mongoose.model('travelExp', travelExpSchema);