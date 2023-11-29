const {books, students} = require("../models");
const {Op} = require("sequelize")

const getBookDetail = async(req, res) => {
    const { id } =req.params;
    if(id.trim().length === 0 || isNaN(id)){
        return res.status(404).json({"message" : "Id Should Be Of Proper Number Type."})
    }

    try {
        const bookExist  = await books.findOne({where : {id}, include : "studentDetail"});
        // const bookExist  = await books.findOne({where : {id}, include : {model : students}});
        if(!bookExist) {
            return res.status(404).json({"message" : `No Book Found Of Id ${id}`});
        }

        return res.send(bookExist)
    } catch(err) {
        return res.status(500).json({"message" : err})
    }
}

module.exports = {getBookDetail}