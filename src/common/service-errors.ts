class ServiceError extends Error {
	constructor(message: string) {
		super(message)
		this.name = this.constructor.name
	}
}

export class ServiceInvalid extends ServiceError {
	constructor(message: string) {
		super(message)
	}
}

export class ServiceForbidden extends ServiceError {
	constructor(message: string) {
		super(message)
	}
}

export class ServiceNotFound extends ServiceError {
	constructor(message: string) {
		super(message)
	}
}

export class ServiceServerError extends ServiceError {
	constructor(message: string) {
		super(message)
	}
}

export class ServiceResourceExists extends ServiceError {
	constructor(message: string) {
		super(message)
	}
}
