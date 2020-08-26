// @ts-check

const { Store } = require("../model/storeDetails");
const { token } = require('../middleware/auth');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const data = await Store.findOne({ email, password });
    const _token = token(data['token']);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully logged in..",
        data,
        token:_token
    });
}

exports.addStore = async (req, res) => {
    const body = req.body;
    const obj = new Store(body);
    await obj.save();
    return res.status(200).json({
        status: 200,
        message: "Store successfully added.."
    });
}

exports.getStore = async (req, res) => {
    const data = await Store.find({});
    return res.status(200).json({
        status: 200,
        message: "Data suessfully fetched",
        data
    });
}

exports.deleteStoreById = async (req, res) => {
    const { _id } = req.params; //assume get 54fcb3890cba9c4234f5c925
    const data = await Store.deleteOne({ _id });
    console.log(data)
    return res.status(200).json({
        status: 200,
        message: "Successfully Deleted",
        deletedCount: data.deletedCount
    });
}

exports.updateStore = async (req, res) => {
    const params = req.params;
    const receiveData = JSON.parse(params.data)
    const update = { $set: receiveData };
    const query = { _id: receiveData._id };
    const data = await Store.update(query, update);
    console.log('data', data);
    return res.status(200).json({
        status: 200,
        message: "Successfully Updated",
        updatedCount: data.n
    });
}