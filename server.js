const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static assets
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, "data");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

// Make sure data directory + file exist (Render's filesystem is ephemeral,
// this is fine for light use / can be swapped for a real DB later)
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(ENQUIRIES_FILE)) fs.writeFileSync(ENQUIRIES_FILE, "[]");

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Order & Enquiry" },
];

app.get("/", (req, res) => {
  res.render("index", { nav, active: "/" });
});

app.get("/about", (req, res) => {
  res.render("about", { nav, active: "/about" });
});

app.get("/menu", (req, res) => {
  res.render("menu", { nav, active: "/menu" });
});

app.get("/gallery", (req, res) => {
  res.render("gallery", { nav, active: "/gallery" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { nav, active: "/contact", submitted: false });
});

app.post("/enquiry", (req, res) => {
  const { name, phone, occasion, items, message } = req.body;

  if (!name || !phone) {
    return res.status(400).render("contact", {
      nav,
      active: "/contact",
      submitted: false,
      error: "Naam aur phone number zaroori hai.",
    });
  }

  const entry = {
    id: Date.now(),
    name,
    phone,
    occasion: occasion || "General",
    items: items || "",
    message: message || "",
    receivedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(fs.readFileSync(ENQUIRIES_FILE, "utf-8"));
    existing.push(entry);
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error("Could not save enquiry:", err);
  }

  res.render("contact", { nav, active: "/contact", submitted: true });
});

app.listen(PORT, () => {
  console.log(`Kachhomal Sweets website running on port ${PORT}`);
});
