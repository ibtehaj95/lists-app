const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Provide Company Name"],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Provide Position Name"],
        maxlength: 50,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",    //this is just for us and has nothing to do with Mongoose
        required: [true, "Provide User"],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Job", JobSchema);