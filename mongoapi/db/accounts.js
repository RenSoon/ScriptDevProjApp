const accounts = require('./mongoCon').db('ScriptDev').collection('Accounts');

const objectID = require('mongodb').ObjectID;


//Get All Documens from Account Collection
const getAllAccounts = async () => {
    const cursor = await accounts.find();
    return cursor.toArray();
};

//Search Document by ID
const getAccount = async (id) =>{
    return await accounts.findOne({id: parseInt(id)});
};

//Insert New Document
const insertAccount = async(id, name, email, password) => {
    return await accounts.insertOne({id: id, name: name, email: email, password: password});
};

//Update Document
const updateAccount = async(id, name, email, password) => {
    return await accounts.updateOne({id: parseInt(id)}, {$set: {
        name: name,
        email: email,
        password: password
    }});
}

//Delete a Document
const deleteAccount = async (id) => {
    return accounts.deleteOne({id: parseInt(id)});
};

module.exports = {getAllAccounts, getAccount, updateAccount, insertAccount, deleteAccount};