const Student = require("../models/student.model.js");


const getStudents = async (req,res)=>{
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 

const getStudent = async (req,res)=>{
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
} 

const createStudent = async (req, res)=>{
    const { rollno, name, email, mbno } = req.body;
    const newStudent = new Student({ rollno, name, email, mbno });
    try {
        const savedStudent = await newStudent.save();
        res.status(200).json(savedStudent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { rollno, name, email, mbno } = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { rollno, name, email, mbno }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteStudent = async (req,res)=>{
    try {
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(404).json({message: "Student not found"});
        }
        res.status(200).json({ message: "Student deleted successfully" });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}