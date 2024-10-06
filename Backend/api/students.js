// api/students.js
import dbConnect from '../../utils/dbConnect'; // Ensure this is correctly defined
import Student from '../../models/student.model'; // Make sure this path is correct based on your structure

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
