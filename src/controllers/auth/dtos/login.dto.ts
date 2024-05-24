import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	username!: string //can be either username or email_address

	@IsString()
	@IsNotEmpty()
	password!: string
}
