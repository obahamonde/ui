<script setup lang="ts">
import { FileData } from '~/types';
import { User } from '@firebase/auth';
const props = defineProps<{
	user: User;
}>();
const [ setFile, getFiles, delFile, files] = useFirestore<FileData>('files');
const { response, loading, error, request } = useRequest<FileData[]>();			
onMounted(async () => {
		await request("/api/file");
		await getFiles(props.user);
});
const file = ref<File>();
const addFile = async (f: File, user: User) => {
	try{
	file.value = f;
	const formData = new FormData();
	formData.append("file", f);
	const res = await fetch("/api/file", {
		method: "POST",
		body: formData,
	});
	const data = await res.json();
	if (data.error) {
		console.log(data.error);
	} else {
		await setFile(data, user);
		await getFiles(user);
	}
}
catch(e){
	console.log(e);
}
};

const handleChange = (e: Event) => {
	const target = e.target as HTMLInputElement;
	const f = target.files;
	if (f) {
		return f[0];
	}
};

</script>
<template>
	<section>
		<div> {{ error }}</div>
		<div>{{ loading ? '...Loading' : '' }}</div>
		<div>{{ response }}</div>
		<h1>Files</h1>
		<input :multiple="false" type="file" @change="file=handleChange($event)" />
		<div v-for="f in files" :key="f.id" class="sh col center text-accent p-4 rounded">
			<Icon icon="mdi-delete" class="x2 text-primary cp" @click="delFile(f.id!)" />
			<p>{{ f }}</p>
			
		</div>
		<div class="col center">
			<button class="btn-get rf" @click="addFile(file!,props.user)"><Icon class="x2" icon="mdi-plus" /> </button>
		</div>
	</section>

</template>