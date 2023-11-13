# OpenAI API

```typescript


interface OAIFile {
	id: string
	bytes: number
	created_at: number
	filename: string
	object: "file"
	purpose: "fine-tune" | "assistants"

	list(purpose: "fine-tune" | "assistants"): OAIFile[]
	upload(file: File, purpose: "fine-tune" | "assistants"): OAIFile
	delete(id: string): void
	retrieve(id: string): OAIFile
}

interface Assistant 

## Assistant

- id: str
- object: "assistant"
- created_at: int
- model: string
- name?: string
- description?: string
- instructions?: string
- tools: Tool[] **Depends on tools**
- file_ids: string[]
- metadata: map

* create, modify (model, name, description, instructions, tools, file_ids, metadata) **Depends on file_ids and tools**
* retrieve, delete (id)
* list
* create_file, retrieve_file, delete_file (id, file_id) **Depends on file_ids**
* list_files (id)



## Threads

- id: str
- object: "thread"
- created_at: int
- metadata: map

* create (Messages[], metadata)
* retrieve, delete (id)
* modify (metadata)
* delete (id)

## Messages

- id: str
- object: "thread.message"
- created_at: int
- thread_id: str **Depends on thread**
- role: str
- content: str
- assistant_id: str **Depends on assistant**
- run_id: str **Depends on run**
- file_ids: str[] **Depends on files**
- metadata

* create (role, content, file_ids, metadata) **Depends on file_ids**
* retrieve (id, thread_id) **Depends on thread**
* list (thread_id) **Depends on thread**
* retrieve_file (id, thread_id, file_id) **Depends on thread and file_ids**
* list_files (thread_id) **Depends on thread**

**types for tools**

```typescript

type FunctionDefinition = {
	name: string
	arguments: string @json
}

type ToolCall = {
	id: string
	type: "function"
	function: FunctionDefinition
}

type SubmitToolOutput = {
	tool_calls?: ToolCall[]
}

type RequiredAction = {
	type: "submit_tool_output"
	submit_tool_outputs: SubmitToolOutput
}
```


## Runs

- id: str
- object: "thread.run"	
- created_at: int
- thread_id: str **Depends on thread**
- assistant_id: str **Depends on assistant**
- status: "queued" | "in_progress" | "failed" | "completed" | "requires_action" | "cancelled" | "expired" | "cancelling"
- required_action: 