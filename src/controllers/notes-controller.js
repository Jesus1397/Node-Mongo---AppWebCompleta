const Note = require("../models/Note");

const notesCtrl = {};

notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });
  await newNote.save();
  req.flash("success_msg", "Note added successfully");
  res.redirect("/notes");
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({
    createdAt: "desc"
  });
  res.render("notes/all-notes", {
    notes
  });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-notes", { note });
};

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;

  await Note.findOneAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
};

notesCtrl.deleteNote = async (req, res) => {
  await Note.findOneAndDelete(req.params.id);
  req.flash("success_msg", "Note deleted successfully");
  res.redirect("/notes");
};

module.exports = notesCtrl;
