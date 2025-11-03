// src/controllers/contactController.js
import { addContact } from "../models/Contact.js";

/**
 * Show contact form
 */
export const showContactForm = (req, res) => {
  res.render("contact", { title: "Contact Us" });
};

/**
 * Handle contact form submission
 */
export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required.");
    }

    await addContact({ name, email, message });
    res.redirect("/?contacted=true");
  } catch (err) {
    console.error("Error submitting contact:", err);
    res.status(500).send("Failed to submit contact form.");
  }
};
