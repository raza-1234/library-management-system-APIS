const {books, students} = require("../models");

const addNewBook = async(req, res) => {
	const {name, author, edition, assigned} = req.body;
	if(!name?.trim().length === 0 || !author?.trim().length === 0 || !edition) {
		return res.status(404).json({"message" : "Required Fields Are Not Found."})
	}
	try {
		const newBook = await books.create({name, author, edition, assigned})
		return res.json(newBook)
	} catch(err) {
		console.log(err);
		return res.status(500).json({"message" : err})
	}
}

const getAllBooks = async(req, res) => {
	try {
		const allBooks = await books.findAll();
		if(allBooks.length === 0) {
			return res.status(200).json({"message" : "No Book Exist."})
		}		
		
		return res.status(200).json(allBooks);
	} catch(err) {
		console.log(err);
		return res.status(500).json({"message" : err})
	}
}

const updateBook = async(req, res) => {
	const id = req.params.id;
	if(id.trim().length === 0 || isNaN(id)) {
		return res.status(404).json({"message" : "Id Should Be Proper Number Type."})
	}
	const {name, author, edition} = req.body;
	if(name?.trim().length === 0 || author?.trim().length === 0) {
		return res.status(404).json({"message" : "Required Fields Can't Be Empty."})
	}
	try {
		const existingBook = await books.findOne({where : {id}})
		if(!existingBook){ 
			return res.status(404).json({"message" : `Book With Id ${id} Does Not Exist.`})
		}
		
		const updateBook = {
			name : name || existingBook.name,
			author : author || existingBook.author,
			edition : edition || existingBook.edition
		}
		await existingBook.update(updateBook);
		return res.status(200).json({"message": "updated successfully"})
	}catch(err) {
		console.log(err);
		return res.status(500).json({"message" : err})
	}
}

const deleteBook = async(req, res) => {
	const id = req.params.id;
	if(id.trim().length === 0 || (isNaN(id))) {
		return res.status(404).json({"message" : "Id Should Be Of Proper Number Type."})
	}
	try{
		const bookAssigned = await students.findOne({where : {"bookId" : id}})
		if(bookAssigned) {
			return res.status(404).json({"message" :`Book with id ${id} borrowed by someone. You can not delete it for now.`})
		}
		const existingBook = await books.findOne({where: {id}});
		if(!existingBook) {
			return res.status(404).json({"message" : `Book With Id ${id} Already Not Exist.`})
		}
		await existingBook.destroy();
		return res.status(200).json({"message" : "deleted successfully"})
	}catch(err) {
		console.log(err);
		return res.status(500).json({"message" : err})
	}
}

module.exports = {
	addNewBook,
	getAllBooks,
	updateBook,
	deleteBook
}