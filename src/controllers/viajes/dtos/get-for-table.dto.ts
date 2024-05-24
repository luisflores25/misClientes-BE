import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Matches,
	MinLength,
	ValidateIf,
	ValidateNested,
} from 'class-validator'
import { plainToInstance, Transform, Type } from 'class-transformer'
import { SortDir } from '../../../common/types/sort-dir.type'

export class GetForTableDto {
	@IsPositive()
	@IsNumber()
	@Transform((o) => parseInt(o.value))
	@IsOptional()
	p: number = 1

	@IsPositive()
	@IsNumber()
	@Transform((o) => parseInt(o.value))
	@IsOptional()
	pp: number = 50

	@Type(() => GetForTableDto.ColumnSearchDto)
	@ValidateNested({ each: true })
	@IsArray()
	@Transform((v) => {
		/**
		 * This will convert from:
		 * { hello: world, hello2: world2 }
		 *
		 * To:
		 * [ { name: hello, value: world }, { name: hello2, value: world2 } ]
		 *
		 * plainToInstance is required because @Transform works with instances
		 */
		return Object.entries(v.value).map(([key, value]) => {
			return plainToInstance(GetForTableDto.ColumnSearchDto, {
				name: key,
				value,
			})
		})
	})
	@IsOptional()
	q?: GetForTableDto.ColumnSearchDto[]

	@IsString({ each: true })
	@IsArray()
	@Transform((v) => {
		/**
		 * This will convert from comma-separated list, to an actual array of strings
		 */
		return String(v.value).length > 0 ? String(v.value).split(',') : 1
	})
	@IsOptional()
	blank?: string[]

	@IsString({ each: true })
	@IsArray()
	@Transform((v) => {
		/**
		 * This will convert from comma-separated list, to an actual array of strings
		 */
		return String(v.value).length > 0 ? String(v.value).split(',') : 1
	})
	@IsOptional()
	not_blank?: string[]

	@Type(() => GetForTableDto.ColumnTimestampSearchDto)
	@ValidateNested({ each: true })
	@IsArray()
	@Transform((v) => {
		return Object.entries(v.value).map(([key, value]) => {
			return plainToInstance(GetForTableDto.ColumnTimestampSearchDto, {
				name: key,
				start: (value as any).start,
				end: (value as any).end,
			})
		})
	})
	@IsOptional()
	range?: GetForTableDto.ColumnTimestampSearchDto[]

	@MinLength(1)
	@IsString()
	@IsOptional()
	filter?: string

	@MinLength(1)
	@IsString()
	@IsOptional()
	sort_by: string = 'id'

	@IsEnum(SortDir)
	@IsOptional()
	sort_dir: SortDir = SortDir.DESC

	@IsString({ each: true })
	@IsArray()
	@Transform((v) => {
		/**
		 * This will convert from comma-separated list, to an actual array of strings
		 */
		return String(v.value).length > 0 ? String(v.value).split(',') : 1
	})
	@IsOptional()
	is_exact?: string[]
}

export namespace GetForTableDto {
	export class ColumnSearchDto {
		@IsString()
		@MinLength(1)
		name!: string

		@IsString()
		@MinLength(1)
		value!: string
	}

	export class ColumnTimestampSearchDto {
		@IsString()
		@MinLength(1)
		name!: string

		@Matches(
			/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/,
			{
				message: `start in range filter must have a yyyy-mm-dd HH:mm:ss format`,
			}
		)
		@ValidateIf((obj, val) => {
			// Must validate if "end" doesn't exist, or "start" exists
			return !obj.end || val
		})
		start?: string

		@Matches(
			/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/,
			{
				message: `start in range filter must have a yyyy-mm-dd HH:mm:ss format`,
			}
		)
		@ValidateIf((obj, val) => {
			// Must validate if "start" doesn't exist, or "end" exists
			return !obj.start || val
		})
		end?: string
	}
}
