import { sql_con } from "$lib/server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const POST = async ({ request, cookies }) => {
    console.log('오는데가 여긴 맞잖아??');
    const body = await request.json()
    console.log(body);


    try {
        if (body.login_type === 'local') {
            // 1. 기존 아이디(이메일)이 있는지 검증
            const getUserQuery = "SELECT user_email, user_pwd, user_nick, user_name, user_rate, user_provider, user_thumbnail  FROM users WHERE user_email = ?";
            const getUser = await sql_con.promise().query(getUserQuery, [body.getemail]);
            const get_user = getUser[0][0]
            if (!get_user) {
                return new Response(JSON.stringify({ error: "아이디가 존재하지 않습니다." }), { status: 500 });
            }

            // 2. 비밀번호가 맞는지 검증
            const pwdChk = await bcrypt.compare(body.getpwd, get_user.user_pwd);
            if (!pwdChk) {
                return new Response(JSON.stringify({ error: "비밀번호가 맞지 않습니다. 다시 확인해주세요." }), { status: 500 });
            }

            // 3. 검증 완료 되었으면 accessToken / refreshToken 발급

            const accessToken = jwt.sign(
                { userId: get_user.idx },
                import.meta.env.VITE_JWT_SECRET_KEY,
                { expiresIn: '10s' }
            );

            const refreshToken = jwt.sign(
                { userId: get_user.idx },
                import.meta.env.VITE_JWT_SECRET_KEY,
                { expiresIn: '3d' }
            );

            // 4. refreshToken DB 저장 및 HttpOnly 쿠키 저장 (추후 쿠키값과 DB값을 비교)
            cookies.set('rtk', refreshToken, { HttpOnly: true });
            const updateUserRetokenQuery = "UPDATE users SET user_retoken = ? WHERE idx = ?";
            await sql_con.promise().query(updateUserRetokenQuery, [refreshToken, get_user.idx]);

            // 5. accessToken 반환 및 기본 정보 반환
            // 일단 쿠키 및 반환값에 모두 저장, 추후 체크하기
            cookies.set('atk', accessToken);
            const userInfo = {
                email: get_user.user_email,
                name: get_user.user_name,
                nick: get_user.user_nick,
                thumbnail: get_user.user_thumbnail,
                rate: get_user.user_rate,
                accessToken: accessToken
            }
            return new Response(JSON.stringify({ result: userInfo }), { status: 200 });
        }



    } catch (error) {
        console.log(error);
    }






    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}