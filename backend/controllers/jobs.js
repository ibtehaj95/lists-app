const List = require("../models/List");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllLists = async (req, res) => {
    const lists = await List.find({
        createdBy: req.user.userID,
    })
    .sort("createdAt");
    res.status(StatusCodes.OK).json({lists, count: lists.length});
};

const getList = async (req, res) => {
    const userID = req.user.userID;
    const listID = req.params.id;
    const list = await List.findOne({
        _id: listID,
        createdBy: userID,
    });
    if(!list){
        throw new NotFoundError("List doesn't exist");
    }
    res.status(StatusCodes.OK).json({list});
};

const createList = async (req, res) => {
    req.body.createdBy = req.user.userID;
    const list = await List.create(req.body);
    res.status(StatusCodes.CREATED).json({list});
};

const deleteList = async (req, res) => {
    const userID = req.user.userID;
    const listID = req.params.id;
    const list = await List.findOneAndDelete({
        _id: listID,
        createdBy: userID,
    });
    if(!list){
        throw new NotFoundError("List doesn't exist");
    }
    res.status(StatusCodes.OK).json({list});
};

const updateList = async (req, res) => {
    const {company, position} = req.body;
    const userID = req.user.userID;
    const listID = req.params.id;
    if(!company || !position){
        throw new BadRequestError("Enter Company and Job");
    }
    const list = await List.findByIdAndUpdate(
        {
            _id: listID,
            createdBy: userID,
        },
        req.body,
        {
            new: true,
            runValidators: true,   
        }
    );
    if(!list){
        throw new NotFoundError("List doesn't exist");
    }
    res.status(StatusCodes.OK).json({list});
};

module.exports = {
    getAllLists,
    getList,
    createList,
    deleteList,
    updateList,
}