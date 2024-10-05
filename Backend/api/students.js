// api/students.js
import dbConnect from '../../utils/dbConnect'; // You might need this if you're connecting to MongoDB
import Student from '../../models/Student'; // Adjust according to your model

export default async function handler(req, res) {
    await dbConnect(); // Connect to your MongoDB if needed

    if (req.method === 'GET') {
        const students = await Student.find(); // Example for fetching students
        res.status(200).json(students);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
