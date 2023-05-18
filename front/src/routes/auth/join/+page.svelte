<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { user_id } from "$lib/store/auth";

    let getname;
    let getpwd;
    let getnick;
    let getemail;

    let id_input;
    let pwd_input;
    let nick_input;
    let email_input;

    onMount(() => {
        if ($user_id) {
            alert("이미 로그인 되어 있습니다!");
            history.back();
            return;
        }
    });

    async function joinPost() {
        if (!getpwd) {
            alert("비밀번호 항목이 비어있습니다.");
            pwd_input.focus();
            return;
        }

        if (!getnick) {
            alert("닉네임 항목이 비어있습니다.");
            nick_input.focus();
            return;
        }

        if (!getname) {
            alert("닉네임 항목이 비어있습니다.");
            nick_input.focus();
            return;
        }

        if (!getemail) {
            alert("이메일 항목이 비어있습니다.");
            email_input.focus();
            return;
        }

        var emailChkJs = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (emailChkJs.test(getemail) == false) {
            alert("이메일 형식이 잘못 되었습니다!");
            email_input.focus();
            return;
        }

        await axios
            .post("/auth/join", {
                getpwd,
                getnick,
                getemail,
                getname,
            })
            .then((res) => {
                if (res.data.err_message) {
                    // 회원가입 실패시
                    alert(res.data.err_message);
                    return;
                } else {
                    // 회원가입 성공시
                    alert("로그인 해주세요");
                    goto("/auth/login");
                }
            })
            .catch((err) => {
                alert(err.response.data.message.err_message);
                return;
            });
    }
</script>


<div class="w-full max-w-xs mx-auto mt-20 suit-font">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <span class="block text-gray-700 text-sm font-bold mb-2">
                이메일
            </span>
            <input
                type="email"
                bind:value={getemail}
                bind:this={email_input}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div class="mb-4">
            <span class="block text-gray-700 text-sm font-bold mb-2">
                비밀번호
            </span>
            <input
                type="password"
                bind:value={getpwd}
                bind:this={pwd_input}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div class="mb-4">
            <span class="block text-gray-700 text-sm font-bold mb-2">
                닉네임
            </span>
            <input
                bind:value={getnick}
                bind:this={nick_input}
                placeholder="활동하실 닉네임"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div class="mb-4">
            <span class="block text-gray-700 text-sm font-bold mb-2">
                이름
            </span>
            <input
                type="text"
                bind:value={getname}
                bind:this={id_input}
                placeholder="실명으로 입력 해주세요"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        

        <div class="">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                on:click={joinPost}>가입하기</button
            >
        </div>
    </div>
</div>

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }
</style>