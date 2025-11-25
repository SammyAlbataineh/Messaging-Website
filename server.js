import pg from "pg";
import dotenv from "dotenv";
import express from "express"; 
import cors from "cors"; 
dotenv.config(); 
const { Pool } = pg
const pool = new Pool({
    user: process.env.PGUSER, 
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})
const app = express(); 
app.use(cors());
app.use(express.json()); 
app.post("/signup", async (req,res) => {
    const {username,email,password} = req.body; 
    try {
        await pool.query(
            `INSERT INTO users (username,email,password_hash) VALUES ($1,$2,$3)`,
            [username,email,password]
        ); 
        res.status(201).send({message: "User Created"});
    } catch (err) {
        console.error(err); 
        res.status(500).send({message: "Error creating user"});
    }
});
app.listen(5000,() => console.log("Server running on port 5000"))