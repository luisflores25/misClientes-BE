import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer';

export class ViajesDto {
    @Transform(v => {
        if (typeof v.value === 'string') {
            return parseInt(v.value);
        }
        return v.value;
    })
	@IsNumber()
	@IsNotEmpty()
	id_ruta_ida!: number

    @Transform(v => {
        if (typeof v.value === 'string') {
            return parseInt(v.value);
        }
        return v.value;
    })
    @IsNumber()
	id_ruta_regreso?: number

    @Transform(v => {
        if (typeof v.value === 'string') {
            return parseInt(v.value);
        }
        return v.value;
    })
    @IsNumber()
	@IsNotEmpty()
	id_unidad!: number

    @IsString()
	@IsNotEmpty()
	tipo_viaje!: string

    @Transform(({ value }) => new Date(value))
    @IsDate()
	@IsOptional()
	fecha_ida!: string

    @Transform(({ value }) => new Date(value))
    @IsDate()
	@IsOptional()
	fecha_regreso!: string

    @IsNumber()
	@IsNotEmpty()
	num_pasajeros!: number
}