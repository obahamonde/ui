import { Icon } from "@iconify/vue";
import Assistant from "~/components/Assistant";
export default defineComponent({
  setup() { 
    const auth = useAuth();
    const { state } = useStore();
    return () => (
      <>
        <Assistant user={state.user!} />
      <p class='animate-spin'><Icon icon="mdi-loading" class="x4" /> </p>
      </>
    );
  }
});