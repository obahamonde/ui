import Message from "~/components/Message"

export default defineComponent({
	setup() {
		const { state } = useStore();
		return () => (
			<Message user={state.user!}/>
		);
	}
});