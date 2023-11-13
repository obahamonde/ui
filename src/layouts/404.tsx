import { RouterView } from 'vue-router'


export default defineComponent({
  setup() {
    const router = useRouter();
    return () => {
      (
         <main class="px4 py10 text-center teal-700 dark:gray-200">
    <RouterView />
    <div>
      <button class="text-sm btn m-3 t8" onClick={()=>router.back()}>Go back</button>
    </div>
  </main>
      )
    }
  }
});