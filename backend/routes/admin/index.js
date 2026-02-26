const express = require("express");
const authRouter = require("./auth");
const executivesRouter = require("./executives");
const membersRouter = require("./members");
const projectsRouter = require("./projects");
const eventsRouter = require("./events");
const uploadRouter = require("./upload");

const router = express.Router();

router.use("/login", authRouter);
router.use("/executives", executivesRouter);
router.use("/members", membersRouter);
router.use("/projects", projectsRouter);
router.use("/events", eventsRouter);
router.use("/upload", uploadRouter);

module.exports = router;
