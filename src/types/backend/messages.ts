type ImageFile = {
	type: "image_file"
	image_file: {
		file_id: string /** @depends on IFile */
	}
}

type FileCitation = {
	type: "file_citation"
	text: string
	file_citation: {
		file_id: string /** @depends on IFile */
		quote: string
	}
	start_index: number
	end_index: number
}

type FilePath = {
	type: "file_path"
	text: string
	file_path: {
		file_id: string /** @depends on IFile */
	}
	start_index: number
	end_index: number
}

type Annotation = FileCitation | FilePath

type ImageText = {
	type: "text"
	text: {
		value: string
		annotations: Annotation[]
	}
	assistant_id?: string
	run_id?: string
	file_ids: string[] /** @depends on IFile */
	metadata: Map<string, string>
}

type MessageContent = ImageFile | ImageText

export type TMessage = {
	id: string
	object: "thread.message"
	create_at: number
	thread_id: string /** @depends on IThread */
	role: "user" | "assistant"
	content: MessageContent
	assistant_id?: string /** @depends on IAssistant */
	run_id?: string /** @depends on IRun */
	file_ids: string[] /** @depends on IFile */
	metadata: Map<string, string>
}

export type TMessageFile = {
	id: string
	object:"thread.message.file"
	created_at: number
	message_id: string /** @depends on TMessage */
}