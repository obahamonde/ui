import { User } from "firebase/auth";

type AssistantProps = {
	  name: string;
  description: string;
  instructions: string;

}

type FunctionParameter = {
  title: string;
  type: string;
  default?: string;
  enum?: string[];
}

type FunctionParameters = {
  [key: string]: FunctionParameter;
}

type FunctionDefinition = {
  name: string;
  parameters: {
    type: string;
    properties: FunctionParameters;
    required?: string[];
  };
  description: string;
}

type ToolFunction = {
  function: FunctionDefinition;
  type: string;
}

type AssistantState = {
  id: string;
  assistant_id: string;
  cancelled_at: null | string;
  completed_at: null | string;
  created_at: number;
  expires_at: number;
  failed_at: null | string;
  file_ids: string[];
  instructions: string;
  last_error: null | string;
  metadata: Record<string, unknown>;
  model: string;
  object: string;
  required_action: null | string;
  started_at: null | string;
  status: string;
  thread_id: string;
  tools: ToolFunction[];
}
	



export default defineComponent({
	  props: {
	user: {
	  type: Object as PropType<User>,
	  required: true,
	}
},
  setup() {
	const [ setAssistant, getAssistants, delAssistant, assistants] = useFirestore<AssistantState>('assistants');
	const { response, loading, error, request } = useRequest<AssistantState[]>();
	const { state } = useStore()
	const props = reactive({
		name: "",
		description: "",
		instructions: "",
	});

	const handleProps = async(moreProps: AssistantProps) => {
		if (!state.user) return
		const urLParams = new URLSearchParams();
		urLParams.append('name', moreProps.name);
		urLParams.append('description', moreProps.description);
		urLParams.append('instructions', moreProps.instructions);
		await request(
			`/api/assistant?${urLParams.toString()}`,
		
		);
		// @ts-ignore
		await setAssistant(response.value, state.user);
		await getAssistants(state.user);
	}
	onMounted(async () => { 
		if (!state.user) return
		await getAssistants(state.user);
	}
	);
	const deleteAssistant = async (id:string) => {
		if (!state.user) return
		await delAssistant(id);
		await request(
			`/api/assistant/${id}`,
		
		);
		await getAssistants(state.user);
	}



	return () => (
	<>
	<div>
	  <input type="text" v-model={props.name} placeholder="Name" />
	  <input type="text" v-model={props.description} placeholder="Description" />
	  <input type="text" v-model={props.instructions} placeholder="Instructions" />
	  <button onClick={() => handleProps(props)}>Create Assistant</button>
	</div>
	<div>
	  <ul>
		{assistants.value.map((assistant) => (
		  <li key={assistant.id}>
			{assistant.id} {assistant.status}
			<button onClick={() => deleteAssistant(assistant.id!)}>Delete</button>
		  </li>
		))}
	  </ul>
	</div>
	</>
	)
  }
})
