// src/models/Contact.js
import db from "../db.js";

export async function getAllContacts() {
  return await db.all("SELECT * FROM contacts ORDER BY created_at DESC");
}

export async function getContactById(id) {
  return await db.get("SELECT * FROM contacts WHERE id = ?", [id]);
}

export async function addContact({ name, email, message }) {
  return await db.run(
    "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
    [name, email, message]
  );
}
