import { Tool, ToolCall } from './tools'

export type TRun = {
	id: string
	object: "thread.run"
	create_at: number
	thread_id: string /** @depends on IThread */
	assistant_id: string /** @depends on IAssistant */
	status: "queued" | "in_progress" | "requires_action" | "cancelling" | "cancelled" | "failed" | "completed" | "expired"
	required_action?: {
		type: "submit_tool_outputs"
		submit_tool_outputs: {
			id: string /** @depends on submitToolOutputs */
			type: "function"
			function: {
				name: string
				arguments: string
			}
		}
	}
	last_error?: string
	expires_at: number
	started_at?: number
	cancelled_at?: number
	failed_at?: number
	completed_at?: number
	model: string /** @enum */
	instructions: string
	tools: Tool[] /** @defaults to [] */
	file_ids: string[] /** @depends on IFile */ /** @defaults to [] */
	metadata: Map<string, string>
}

type TRunMessage = {
	role: "user"
	content: string
	file_ids?: string[] /** @depends on IFile */
	metadata?: Map<string, string>
}

export type TRunThread = {
	messages: TRunMessage[]
	metadata?: Map<string, string>
}

type TMessageCreationStep = {
	type: "message_creation"
	message_creation: {
		message_id: string /** @depends on IMessage */
	}
}

type TToolCallsStep = {
	type: "tool_calls"
	tool_calls: ToolCall[]
}

type TRunStepDetail = TMessageCreationStep | TToolCallsStep

export type TRunStep = {
	id: string
	object: "thread.run.step"
	create_at: number
	assistant_id: string /** @depends on IAssistant */
	thread_id: string /** @depends on IThread */
	run_id: string /** @depends on IRun */
	type: "message_creation" | "tool_calls"
	status: "in_progress" | "cancelled" | "failed" | "completed" | "expired"
	step_detail: TRunStepDetail
	last_error?: string
	expired_at?: number
	cancelled_at?: number
	failed_at?: number
	completed_at?: number
	metadata: Map<string, string>
}