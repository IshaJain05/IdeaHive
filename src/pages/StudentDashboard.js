import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";

const StudentDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(collection(db, "tasks"), where("assignedTo", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const tasksData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(tasksData);
            } catch (error) {
                alert("Error fetching tasks: " + error.message);
            }
        };

        fetchTasks();
    }, []);

    const handleMarkComplete = async (taskId) => {
        try {
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, { status: "Completed" });
            alert("Task marked as completed!");
            // Refresh tasks
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, status: "Completed" } : task
                )
            );
        } catch (error) {
            alert("Error updating task: " + error.message);
        }
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            <h2>Your Tasks</h2>
            <ul>
            {tasks.map((task) => (  
                <li key={task.id}>  
                <h3>{task.title}</h3>  
                <p>{task.description}</p>  
                <p>Status: {task.status}</p>  
                <p>Deadline: {task.deadline}</p>  
            {task.status !== "Completed" && (  
            <button onClick={() => handleMarkComplete(task.id)}>Mark as Completed</button>  
            )}  
            </li>  
            ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;
