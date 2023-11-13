import { AssistantCreate, AssistantFileObject as TAssistantFileObject, Assistant as TAssistant } from "./assistant"
import { TMessage, TMessageFile } from "./messages"
import { Thread as TThread } from "./thread"
import { TFile } from "./file"
import { ToolOutput, Tool} from "./tools"
import { TRun, TRunThread, TRunStep } from "./run"

export interface IFile {
	id?: string
	purpose: "fine-tune" | "assistants"
	file?: File

	list(purpose: "fine-tune" | "assistants"): Promise<TFile[]>
	upload(file: File, purpose: "fine-tune" | "assistants"): Promise<TFile>
	delete(id: string): Promise<void>
	retrieve(id: string): Promise<TFile>
}

export interface IAssistant {
	model: string
	name?: string
	description?: string
	instructions?: string
	tools?: Tool[] /** @defaults to [] */
	file_ids?: string[] /** @depends on IFile */
	metadata?: Map<string, string>

	create(assistant: AssistantCreate): Promise<TAssistant>
	retrieve(assistant_id: string): Promise<TAssistant>
	modify(assistant_id: string, body: AssistantCreate): Promise<TAssistant>
	delete(assistant_id: string): Promise<void>
	list(limit?:number, order?: "asc" | "desc", after?:string, before?:string): Promise<TAssistant[]> 
	attachFile(assistant_id: string, file_id: string): Promise<TAssistantFileObject> /** @depends on IFile */
	retrieveFile(assistant_id: string, file_id: string):  Promise<TAssistantFileObject> /** @depends on IFile */
	detachFile(assistant_id: string, file_id: string): Promise<void> /** @depends on IFile */
	listFiles(assistant_id: string, limit?:number, order?: "asc" | "desc",  after?:string, before?:string): Promise<TAssistantFileObject[]> /** @depends on IFile */
}

export interface IThread {
	messages?: TMessage[]
	metadata?: Map<string, string>
	create(messages?: TMessage[], metadata?: Map<string, string>): Promise<TThread>
	retrieve(thread_id: string): Promise<TThread>
	modify(thread_id: string, metadata: Map<string, string>): Promise<TThread>
	delete(thread_id: string): Promise<void>
}

export interface IMessage {
	role: "user" | "assistant"
	content: string
	file_ids?: string[] /** @depends on IFile */
	metadata?: Map<string, string>
	create(thread_id: string,role: "user" | "assistant", content: string, file_ids?: string[], metadata?: Map<string, string>): Promise<TMessage> /** @depends on IThread */ /** @depends on IFile */
	retrieve(message_id: string, thread_id:string): Promise<TMessage> /** @depends on IThread */
	modify(message_id: string, thread_id:string, metadata?: Map<string, string>): Promise<TMessage> /** @depends on IThread */
	list (thread_id: string, limit?:number, order?: "asc" | "desc", after?:string, before?:string): Promise<TMessage[]> /** @depends on IThread */
    retrieveFile(message_id: string, thread_id:string, file_id: string): Promise<TMessageFile> /** @depends on IThread */ /** @depends on IFile */
	listFiles(message_id: string, thread_id:string, limit?:number, order?: "asc" | "desc", after?:string, before?:string): Promise<TMessageFile[]> /** @depends on IThread */ /** @depends on IFile */
}

export interface IRun {
	assistant_id: string /** @depends on IAssistant */
	thread_id: string /** @depends on IThread */
	model: string /** @enum */
	thread?: TRunThread /** @defaults to { messages: [] } */
	instructions?: string
	tools?: Tool[] /** @defaults to [] */
	metadata?: Map<string, string>
	create(thread_id: string, assistant_id: string, model: string, instructions?: string, tools?: Tool[], metadata?: Map<string, string>): Promise<TRun> /** @depends on IThread */ /** @depends on IAssistant */
	retrieve(run_id: string, thread_id: string): Promise<TRun> /** @depends on IThread */
	modify(run_id: string, thread_id: string, metadata?: Map<string, string>): Promise<TRun> /** @depends on IThread */
	list(thread_id: string, limit?:number, order?: "asc" | "desc", after?:string, before?:string): Promise<TRun[]> /** @depends on IThread */
	submitToolOutputs(run_id: string, thread_id: string, tool_outputs: ToolOutput[]): Promise<TRun> /** @depends on IThread */
	cancel(run_id: string, thread_id: string): Promise<TRun> /** @depends on IThread */
	createAndRun(thread_id: string, assistant_id: string, model: string, thread?:TRunThread, instructions?: string, tools?: Tool[], metadata?: Map<string, string>): Promise<TRun> /** @depends on IThread */ /** @depends on IAssistant */
}

export interface IRunStep {
	id?: string
	run_id: string /** @depends on IRun */
	thread_id: string /** @depends on IThread */
	retrieve(run_step_id: string, run_id: string, thread_id: string): Promise<TRunStep> /** @depends on IRun */ /** @depends on IThread */
	list(run_id: string, thread_id: string, limit?: number, order?: "asc" | "desc", after?: string, before?: string): Promise<TRunStep[]> /** @depends on IRun */ /** @depends on IThread */
}