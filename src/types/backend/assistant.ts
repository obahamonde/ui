import { Tool } from './tools'

export type AssistantCreate = {
	model: string
	name?: string
	description?: string
	instructions?: string
	tools?: Tool[] /** @defaults to [] */
	file_ids?: string[] /** @depends on IFile */
	metadata?: Map<string, string>
}

export type AssistantFileObject = {
	id: string
	object: "assistant.file"
	created_at: number
	assistant_id: string
}

export type Assistant = {
	id: string
	object: "assistant"
	created_at: number
	model: string /** @enum */
	name?: string
	description?: string
	instructions?: string
	tools: Tool[] /** @defaults to [] */
	file_ids: string[] /** @depends on IFile */
	metadata?: Map<string, string>
}