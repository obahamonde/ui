import type { User } from 'firebase/auth';
import type { Message, Thread } from '../types';
export default defineComponent({
	props: {
		user: {
			type: Object as PropType<User>,
			required: true
		}
	},
	setup(props) {	
		const [ setMessage, getMessages, delMessage, messages] = useFirestore<Message>('threadmessages');
		const [_,getThreads,__,threads] = useFirestore<Thread>('threads');
		const { response, loading, error, request } = useRequest<Message[]>();
		const message = ref('');
		const thread = ref("");
		onMounted(async () => { 
			await getMessages(props.user);
			await getThreads(props.user)
		}
		);
		const deleteMessage = async (id:string) => {
			await delMessage(id);
			await getMessages(props.user);
		}
	  const sendMessage = async () => {
      try {
      if (thread.value) {
        
          await request(
          `/api/messages/${thread.value}?content=${message.value}&role=user`,
          { method: "POST" }
        );
        // @ts-ignore
        await setMessage(response.value, props.user);
        message.value = "";
        await getMessages(props.user);
      } else {
        console.error("No thread selected");
      }
    }
    catch (e) {
      console.error(e);
    }
  
    };


   const handleSelect = (e: Event) => {
	 const target = e.target as HTMLSelectElement;
	 thread.value = target.value;
	 console.log("Selected thread", thread.value)
   };

		return () => (
      <>
        {" "}
        <select value={thread.value} onChange={handleSelect}>
          {" "}
          {/* Two-way binding with v-model */}
          {threads.value.map((threadItem) => (
            <option key={threadItem.id} value={threadItem.id}>
              {threadItem.id}
            </option>
          ))}
        </select>
        <div>{message.value}</div>
        <div>{thread.value}</div>
        <input v-model={message.value} />
        <button class="btn-post text-black dark:invert" onClick={sendMessage}>
          Send
        </button>
        <div>
          {messages.value.map((message) => (
            <div key={message.id}>
              <div>{JSON.stringify(message)}</div>

              <div>{message.role}</div>
              <button onClick={() => deleteMessage(message.id!)}>Delete</button>
            </div>
          ))}
        </div>
      </>
    );
	}
});