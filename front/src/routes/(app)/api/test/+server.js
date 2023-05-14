export const GET = () => {
    console.log('api test');
    return new Response(JSON.stringify({ message: "hello" }), { status: 200 })
}