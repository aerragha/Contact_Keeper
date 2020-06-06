const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");

// @Route   Get /api/contacts
// @desc    Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   Post /api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @Route   Post /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put("/", async (req, res) => {
  const { _id, name, email, phone, type } = req.body;
  try {
    await Contact.updateOne({ _id }, { $set: { name, email, phone, type } });
    res.json({ msg: "The contact is updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @Route   Post /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Contact.deleteOne({ _id: id });
    res.json({ msg: "The contact is deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
