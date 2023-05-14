<script>
	import axios from 'axios';

	let subject;
	let content;

	let getUsers = get_users();

	async function get_users() {
		try {
			const params = { testChk: 'authii' };
			const res = await axios.get('/create', { params }, { withCredentials: true });
			const testVal = res.data;
			console.log(testVal);
			return testVal;
		} catch (error) {
			console.log(error.message);
		}
	}

	const testpost = async () => {
		axios.post('/create', { subject, content }).then(() => {
			console.log('응답응답!!');
		});
	};
</script>

HAHAHAHA~~~~~~~~~~~~~~~~~~~~~~
<div>
	<input type="text" bind:value={subject} />
</div>
<div>
	<textarea name="" bind:value={content} rows="10" />
</div>

<button on:click={testpost}>GOGO</button>
