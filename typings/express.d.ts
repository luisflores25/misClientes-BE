declare namespace Express {
	export interface SignedInUser {
		id: number
		username: string
		name: string
		email_address: string | null
	}

	export interface Request {
		user?: SignedInUser
	}

	export interface Response {
		respondSuccess<T>(msg?: String, data?: T): void
		respondFile(filename: string, file: BlobPart): void
		respondNotFound(error?: string): void
		respondServerError(error?: string): void
		respondInvalid(error?: string): void
		respondUnauthorized(error?: string): void
		respondForbidden(error?: string): void
		respondResourceExists(error?: string): void
		respondRetryProcess(success: boolean, msg: string, data: unknown): void
	}
}
