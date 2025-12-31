// Seed script to load mock data into the database
// This script connects to MongoDB and loads all mock data from the mock-data folder
// Run with: npm run seed

require("dotenv").config();
const mongoose = require("mongoose");

// Import models
const Member = require("./models/member");
const Executive = require("./models/exec");
const Project = require("./models/project");
const Sig = require("./models/sig");
const Event = require("./models/event");

// Import mock data
const membersData = require("./mock-data/members");
const executivesData = require("./mock-data/executives");
const projectsData = require("./mock-data/projects");
const sigsData = require("./mock-data/sigs");
const eventsData = require("./mock-data/events");

const PORT = process.env.PORT || 5000;

// Check for MONGO_URI
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in .env");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    return seedDatabase();
  })
  .then(() => {
    console.log("Seed data loaded successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  });

async function seedDatabase() {
  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("Clearing existing data...");
    await Member.deleteMany({});
    await Executive.deleteMany({});
    await Project.deleteMany({});
    await Sig.deleteMany({});
    await Event.deleteMany({});

    // Load mock data
    console.log("Loading members data...");
    await Member.insertMany(membersData);
    console.log(`✓ Loaded ${membersData.length} members`);

    console.log("Loading executives data...");
    await Executive.insertMany(executivesData);
    console.log(`✓ Loaded ${executivesData.length} executives`);

    console.log("Loading projects data...");
    await Project.insertMany(projectsData);
    console.log(`✓ Loaded ${projectsData.length} projects`);

    console.log("Loading SIGs data...");
    await Sig.insertMany(sigsData);
    console.log(`✓ Loaded ${sigsData.length} SIGs`);

    console.log("Loading events data...");
    await Event.insertMany(eventsData);
    console.log(`✓ Loaded ${eventsData.length} events`);

    console.log("\nAll mock data has been loaded successfully!");
  } catch (error) {
    console.error("Error loading mock data:", error);
    throw error;
  }
}

