import { sql_con } from "$lib/server/db";

export const load = async () => {
    const getBoardListQuery = "SELECT * FROM test_board";
    const getBoardList = await sql_con.promise().query(getBoardListQuery);
    const get_board_list = getBoardList[0];
    console.log(get_board_list);
    return { get_board_list }
}