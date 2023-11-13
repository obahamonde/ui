export type TFile = {
	id: string
	bytes: number
	created_at: number
	filename: string
	object: "file"
	purpose: "fine-tune" | "assistants"
}