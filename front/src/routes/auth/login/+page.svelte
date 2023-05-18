<script>
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { user_info } from '$lib/stores/auth_store';
	console.log(user_info);
	// console.log($user_info);

	let getemail;
	let getpwd;
	let id_input;

	onMount(() => {});

	const request_login = async () => {
		const login_type = 'local';
		if (!getemail || !getpwd) {
			alert('아이디와 비밀번호를 입력해주세요!');
			return;
		}

		await axios
			.post(
				'/auth/login',
				{
					getemail,
					getpwd,
					login_type
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res.data);

				$user_info = res.data.result;
				goto('/');
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data.error);
				return;
			});
	};

	const kakao_login = () => {
		location.href = import.meta.env.VITE_SERVER_URL + '/auth/kakao';
	};

	const gotoJoin = () => {
		goto('/auth/join');
	};
</script>

<div class="w-full max-w-xs mx-auto mt-20 suit-font">
	<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<span class="block text-gray-700 text-sm font-bold mb-2"> 아이디 </span>
			<input
				type="text"
				bind:value={getemail}
				bind:this={id_input}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
		<div class="mb-4">
			<span class="block text-gray-700 text-sm font-bold mb-2"> 비밀번호 </span>
			<input
				type="password"
				bind:value={getpwd}
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				on:click={request_login}>로그인</button
			>
			<button
				href="/auth/join"
				class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				on:click={gotoJoin}>회원가입</button
			>
		</div>
	</div>

	<button on:click={kakao_login}> 카카오 로그인 </button>
</div>

<style>
	:global(.suit-font) {
		font-family: 'SUIT';
	}
</style>
