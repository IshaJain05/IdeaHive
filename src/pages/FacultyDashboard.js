import React from "react";
import { auth, db, storage } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";


const FacultyDashboard = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [studentUID, setStudentUID] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleAddTask = async () => {
        try {
            await addDoc(collection(db, "tasks"), {
                title,
                description,
                assignedTo: studentUID,
                status: "Incomplete",
                deadline,
            });
            alert("Task added successfully!");
            setTitle("");
            setDescription("");
            setStudentUID("");
            setDeadline("");
        } catch (error) {
            alert("Error adding task: " + error.message);
        }
    };

    return (
        <div>
            <h1>Faculty Dashboard</h1>
            <h2>Add Task</h2>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input
                type="text"
                placeholder="Student UID"
                value={studentUID}
                onChange={(e) => setStudentUID(e.target.value)}
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};

export default FacultyDashboard;