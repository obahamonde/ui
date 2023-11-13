import Thread from "~/components/Thread.vue";

export default defineComponent({
	setup() {
		const { state } = useStore();
		return () => (
			<Thread user={state.user!}/>
		);
	}
});