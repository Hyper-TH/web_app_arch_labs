import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { openDb } from "../db";

const router = Router();

router.get("/", async (req, res) => {
    const db = await openDb();
    const students = await db.all("SELECT * FROM students");
    
    res.json({ value: students });
});

router.post("/", async (req, res) => {
    const { firstName, lastName, studentNumber, email, course } = req.body;
    // const { v4: uuidv4 } = await import("uuid"); // dynamic import
    const id = uuidv4();
    const db = await openDb();

    await db.run(
        "INSERT INTO students (id, firstName, lastName, studentNumber, email, course) VALUES (?, ?, ?, ?, ?, ?)",
        id, firstName, lastName, studentNumber, email, course
    );

    const newStudent = await db.get("SELECT * FROM students WHERE id = ?", id);
    
    res.status(201).json({ value: newStudent });
});

export default router;