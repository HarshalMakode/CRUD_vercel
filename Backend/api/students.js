// Backend/api/students.js
import dbConnect from './dbConnect'; // Adjust the path based on your structure
import Student from '../models/student.model'; // Ensure this path is correct

export default async function handler(req, res) {
    await dbConnect(); // Connect to your MongoDB

    if (req.method === 'GET') {
        try {
            const students = await Student.find(); // Fetch all students
            res.status(200).json(students);
        } catch (error) {
            console.error("Error fetching students:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
