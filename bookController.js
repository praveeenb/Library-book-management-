const Book = require("../models/bookModel");

// Insert 7 Books
exports.insertMultipleBooks = async (req, res) => {
  try {
    const books = await Book.insertMany(req.body);
    res.status(201).json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// Get books by category
exports.getBooksByCategory = async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
};

// Books after year 2015
exports.getBooksAfter2015 = async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
};

// Update Copies
exports.updateCopies = async (req, res) => {
  const { id } = req.params;
  const { copies } = req.body;

  try {
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.availableCopies + copies < 0)
      return res.status(400).json({ error: "Negative stock not allowed" });

    book.availableCopies += copies;
    await book.save();

    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const updated = await Book.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Book not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete book if copies = 0
exports.deleteBookIfZero = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) return res.status(404).json({ error: "Book not found" });

    if (book.availableCopies !== 0)
      return res.status(400).json({ error: "Copies must be 0 to delete" });

    await Book.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
