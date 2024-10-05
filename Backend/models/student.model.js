const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
    {
        rollno: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        mbno: {
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student; 