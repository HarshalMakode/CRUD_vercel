const express = require("express");
const router = express.Router();
const {getStudents, getStudent, createStudent, updateStudent, deleteStudent} = require('../controllers/student.controller.js');

router.get('/', getStudents); // Gets all students
router.get("/:id", getStudent); // Gets a specific student by ID
router.post("/", createStudent); // Creates a new student
router.put("/:id", updateStudent); // Updates a student by ID
router.delete("/:id", deleteStudent); // Deletes a student by ID

module.exports = router;   