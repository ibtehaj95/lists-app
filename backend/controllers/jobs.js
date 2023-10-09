const Job = require("../models/Job");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({
        createdBy: req.user.userID,
    })
    .sort("createdAt");
    res.status(StatusCodes.OK).json({jobs, count: jobs.length});
};

const getJob = async (req, res) => {
    const userID = req.user.userID;
    const jobID = req.params.id;
    const job = await Job.findOne({
        _id: jobID,
        createdBy: userID,
    });
    if(!job){
        throw new NotFoundError("Job doesn't exist");
    }
    res.status(StatusCodes.OK).json({job});
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
};

const deleteJob = async (req, res) => {
    const userID = req.user.userID;
    const jobID = req.params.id;
    const job = await Job.findOneAndDelete({
        _id: jobID,
        createdBy: userID,
    });
    if(!job){
        throw new NotFoundError("Job doesn't exist");
    }
    res.status(StatusCodes.OK).json({job});
};

const updateJob = async (req, res) => {
    const {company, position} = req.body;
    const userID = req.user.userID;
    const jobID = req.params.id;
    if(!company || !position){
        throw new BadRequestError("Enter Company and Job");
    }
    const job = await Job.findByIdAndUpdate(
        {
            _id: jobID,
            createdBy: userID,
        },
        req.body,
        {
            new: true,
            runValidators: true,   
        }
    );
    if(!job){
        throw new NotFoundError("Job doesn't exist");
    }
    res.status(StatusCodes.OK).json({job});
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
}