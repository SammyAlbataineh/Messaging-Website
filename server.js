import pg from "pg";
import dotenv from "dotenv";
import express from "express"; 
import cors from "cors"; 
import { compare } from "bcryptjs";
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 }); 
const rooms = {}; 
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
        return res.status(500).send({message: "Error creating user"});
    }
});
app.post("/login", async (req,res) => {
    const {email,password} = req.body;
    try {
        const result = await pool.query(
            `SELECT * FROM USERS WHERE email = ($1)`,
            [email]
        )
        if (result.rows.length === 0) {
            return res.status(400).json({message: "User not found"}); 
        }
        const dbpassword = result.rows[0].password_hash; 
        const isMatch = await compare(password,dbpassword); 
        if (!isMatch) {
            return res.status(401).json({message: "Invalid password"});
        }
        return res.status(200).json({
            message: "Login successful",
            user: {
                username: result.rows[0].username, 
                email: result.rows[0].email, 
            }
        });

    } catch (err) {
        return res.status(500).json({message: "Server error"})
    }
});
app.get("/search", async (req,res) => {
    const query = req.query.q; 
    if (!query) {
        return res.status(400).json({message: "No search query provided"});
    }
    try {
        const result = await pool.query(
            `SELECT username, email FROM users 
             WHERE username ILIKE $1 OR email ILIKE $1`,
            [`%${query}%`]
        );

        return res.json(result.rows);
    } catch (err) {
        console.error(err); 
        return res.status(500).json({message: "server erorr"})
    }
})
app.listen(5000,() => console.log("Server running on port 5000"));
wss.on("connection", (socket) => {
    console.log("user connected");
    socket.on("message", raw => {
        const data = JSON.parse(raw);
        // JOIN ROOM
        if (data.type === "join") {
            const { chatId } = data;
            if (!rooms[chatId]) {
                rooms[chatId] = { users: new Set(), messages: [] };
            }
            rooms[chatId].users.add(socket);
            return;
        }
        if (data.type === "message") {
            const { chatId, from, message } = data;
            rooms[chatId].messages.push({ from, message });
            rooms[chatId].users.forEach(client => {
                client.send(JSON.stringify({
                    type: "message",
                    chatId,
                    from,
                    message
                }));
            });
        }
    });
    socket.on("close", () => {
        for (const chatId in rooms) {
            rooms[chatId].users.delete(socket);
        }
    });
});