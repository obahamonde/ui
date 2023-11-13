
export type FunctionParameters = {
	type: "object"
	properties: Record<string, Object>
}

/**
 * @param(parameters): The `openaischema` of the OpenAIFunction
 */
export type FunctionDefinition = {
	description: string
	name: string
	parameters: FunctionParameters
}

export type FunctionTool = {
	type: "function"
	function: FunctionDefinition
}

export type CodeInterpreterTool = {
	type: "code-interpreter"
}

export type RetrievalTool = {
	type: "retrieval"
}

export type ToolOutput = {
	tool_call_id?: string
	output?: string
}

type CodeInterpreterLogOutput = {
	type: "log"
	logs: string
}

type CodeInterpreterImageOutput = {
	type: "image"
	image:{
		file_id: string
	}
}


type CodeInterpreterOutput = CodeInterpreterLogOutput | CodeInterpreterImageOutput

type CodeInterpreterToolCall = {
	id: string
	type: "code_interpreter"
	code_interpreter: {
		input: string
		outputs: CodeInterpreterOutput[]
	}
}

type CodeInterpreterRetrievalToolCall = {
	id: string
	type: "retrieval"
	retrieval: Map<null, null>
}

type FunctionToolCall = {
	id: string
	type: "function"
	function: {
		name: string
		arguments: string
		output?: string
	}
}


export type Tool = FunctionTool | CodeInterpreterTool | RetrievalTool
export type ToolCall = CodeInterpreterToolCall | CodeInterpreterRetrievalToolCall | FunctionToolCall