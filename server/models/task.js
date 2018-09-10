const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema ({
    activity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    out_date: {
        type: Date,
        default: new Date()
    },
    due_date: {
        type: Date,
    },
    UserId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema )

module.exports = Task