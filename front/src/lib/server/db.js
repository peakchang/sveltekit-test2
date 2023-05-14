import mysql, { } from "mysql2"


export const sql_con = mysql.createConnection({
    host: process.env.HOST || '127.0.0.1',
    user: 'root',
    password: "rkwkrh13!#",
    database: "testdb3"
})


export const createPost = async ({ title, body, userId }) => {
    const insertPostQuert = "INSERT INTO test_board (tb_subject,tb_content,tb_userid) VALUES (?,?,?)";
    await sql_con.promise().query(insertPostQuert, [title, body, userId]);
}