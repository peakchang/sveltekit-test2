import { sql_con } from "$lib/server/db";
import jwt from "jsonwebtoken";

export const GET = async ({ request, url, cookies }) => {
    console.log(import.meta.env.VITE_JWT_SECRET_KEY);
    console.log(cookies);
    cookies.set('testVal','gogogogogogogo',{HttpOnly : true});
    cookies.set('testVal2','noonononononononono',{HttpOnly : true});

    const testCookieVal = cookies.get('testVal2');
    console.log(testCookieVal);
    console.log(url.searchParams.get('testChk'));

    const refreshToken = jwt.sign(
        { statusId: 'test_status' },
        import.meta.env.VITE_JWT_SECRET_KEY
    );
    console.log(refreshToken);

    jwt.verify(refreshToken, import.meta.env.VITE_JWT_SECRET_KEY, async (err, data) => {
        console.log(data);
    })


    // const params = await request.params();
    console.log('api test');
    const resultType = url.searchParams.get('testChk');
    if(resultType == 'auth'){
        return new Response(JSON.stringify({ message: "authchkchk!!!" }), { status: 200 })
    }else{
        return new Response(JSON.stringify({ message: "nononononono!!!" }), { status: 200 })
    }
}

export const POST = async ({ request }) => {
    const body = await request.json()
    console.log(body);
    console.log('api post test');

    const insertPostQuert = "INSERT INTO test_board (tb_subject,tb_content) VALUES (?,?)";
    await sql_con.promise().query(insertPostQuert, [body.subject, body.content]);
    
    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}