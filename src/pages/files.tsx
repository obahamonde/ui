import FileItem from "~/components/FileItem.vue";

export default defineComponent({
	  setup() {
	const { state } = useStore();
	return () => (
	  <FileItem user={state.user!}/>
	);
  }
});