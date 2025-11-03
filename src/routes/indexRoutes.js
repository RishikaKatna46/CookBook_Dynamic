import { Router } from "express";

const r = Router();

r.get("/", (req, res) => res.render("home", { title: "Home" }));
r.get("/charts", (req, res) => res.render("charts", { title: "Charts" }));
r.get("/about", (req, res) => res.render("about", { title: "About" }));

export default r;