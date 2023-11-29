const {students, books} = require("../models")

const assignBook = async(req, res) =>{
    const { id } = req.params;
    if(id.trim().length == 0 || isNaN(id)) {
        return res.status(404).json({"message" : "Id Should Be Of Proper Number Type."})
    }
    const {name, rollno, email} = req.body;
    if(name.trim().length === 0 || rollno.trim().length === 0 || email.trim().length === 0) {
        return res.status(404).json({"message" : "Required Fields Are Not Found."})
    }
    try{
        const bookExist = await books.findOne({where : {id}});
        if(!bookExist) {
            return res.status(404).json({"message" : `Book With Id ${id} Not Exist.`})
        }
        if(bookExist.assigned) {
            return res.status(404).json({"message" : `Book With Id ${id} Not Available For Now(A;ready Borrowed By Someone.).`})
        }
        const assignBook = await students.create({name, rollno, email, bookId : bookExist.id});
        const updateBookStatus  = {
            ...bookExist,
            assigned : true, 
        }
        await bookExist.update(updateBookStatus)
        return res.status(200).send(assignBook)
    }catch (err) {
        console.log(err);
        return res.status(500).json({"message" : err})
    }
}

const returnBook = async(req, res) => {
    const id = req.params.id;
    if(id.trim().length === 0 || isNaN(id)) {
        return res.status(404).json({"message" : "Id Should Be Of Proper Number Type."})
    }
    try{
        const bookExist = await books.findOne({where : {id}});
        if(!bookExist) {
            return res.status(404).json({"message" : `No Book Exist With Id ${id}`})
        }
        if(!bookExist.assigned) {
            return res.status(200).json({"message" : `Book With Id ${id} Already Returned To Library.`})
        }

        const returnBook = {
            ...bookExist,
            assigned : false,
        }
        const studentRecord = await students.findOne({where : {"bookId" : id}});
        await studentRecord.destroy();
        await bookExist.update(returnBook);
        return res.send("Book Returned.")
    }catch (err) {
        return res.status(500).json({"message" : err})
    }
    
}

module.exports = {
    assignBook,
    returnBook
}