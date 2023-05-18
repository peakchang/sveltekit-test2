import { sql_con } from "$lib/server/db";
import bcrypt from "bcrypt";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");


export const POST = async ({ request }) => {
    const body = await request.json()
    console.log(body);

    // 회원가입시 아이디 / 닉네임 중복일시 에러처리
    try {
        const hash = await bcrypt.hash(body.getpwd, 12);
        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        const joinArr = [body.getemail, hash, body.getnick, body.getname, now]
        const joinSql = "INSERT INTO users (user_email, user_pwd, user_name, user_nick, user_created_at) VALUES (?,?,?,?,?)";
        await sql_con.promise().query(joinSql, joinArr);

        return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
    } catch (error) {
        let err_message;

        if (error.sqlMessage.includes('user_email')) {
            err_message = { err_message: '이미 가입된 아이디 입니다.' }
        } else if (error.sqlMessage.includes('user_nick')) {
            err_message = { err_message: '이미 가입된 닉네임 입니다.' }
        }
        return new Response(JSON.stringify({ message: err_message }), { status: 401 })
    }




    
}