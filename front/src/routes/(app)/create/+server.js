import { sql_con } from "$lib/server/db";

export const GET = async ({ request, url }) => {
    console.log(url.searchParams.get('testChk'));
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