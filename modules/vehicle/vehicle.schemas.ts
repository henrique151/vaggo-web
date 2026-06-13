import * as z from "zod";
import msg from "@/controllers/schemas/validations_messages";
 
/* SWAGGER
brand*	string
minLength: 2
maxLength: 30
example: Toyota
 
model*	string
minLength: 2
maxLength: 25
example: Corolla
 
color*	string
minLength: 3
maxLength: 30
example: Preto
 
licensePlate*	string
maxLength: 10
example: ABC1D23
 
manufactureYear*	string
pattern: ^\d{4}$
example: 2022
 
type*	string
example: CARRO
Enum: [ CARRO, MOTO ]
 
size	string
Required when type is CARRO.
Enum: [ PEQUENO, MEDIO, GRANDE ]
*/
 
const FIELD = {
    BRAND: "marca",
    MODEL: "modelo",
    COLOR: "cor",
    LICENSE_PLATE: "placa",
    MANUFACTURE_YEAR: "ano de fabricação",
    TYPE: "tipo de veículo",
    SIZE: "porte",
} as const;
 
const VEHICLE_TYPES = ["CARRO", "MOTO"] as const;
const VEHICLE_SIZES = ["PEQUENO", "MEDIO", "GRANDE"] as const;
 
const Register = z
    .object({
        brand: z
            .string()
            .min(
                2,
                msg.string.min(
                    FIELD.BRAND,
                    2,
                ),
            )
            .max(
                30,
                msg.string.max(
                    FIELD.BRAND,
                    30,
                ),
            ),
 
        model: z
            .string()
            .min(
                2,
                msg.string.min(
                    FIELD.MODEL,
                    2,
                ),
            )
            .max(
                25,
                msg.string.max(
                    FIELD.MODEL,
                    25,
                ),
            ),
 
        color: z
            .string()
            .min(
                3,
                msg.string.min(
                    FIELD.COLOR,
                    3,
                ),
            )
            .max(
                30,
                msg.string.max(
                    FIELD.COLOR,
                    30,
                ),
            ),
 
        licensePlate: z
            .string()
            .max(
                10,
                msg.string.max(
                    FIELD.LICENSE_PLATE,
                    10,
                ),
            ),
 
        manufactureYear: z
            .string()
            .regex(
                /^\d{4}$/,
                msg.format.invalid(
                    FIELD.MANUFACTURE_YEAR,
                ),
            ),
 
        type: z.enum(
            VEHICLE_TYPES,
            {
                message: msg.enum.invalid(
                    FIELD.TYPE,
                ),
            },
        ),
 
        size: z
            .enum(
                VEHICLE_SIZES,
                {
                    message: msg.enum.invalid(
                        FIELD.SIZE,
                    ),
                },
            )
            .optional(),
    })
    .refine(
        (data) => data.type !== "CARRO" || !!data.size,
        {
            message: msg.common.required(
                FIELD.SIZE,
            ),
            path: ["size"],
        },
    );
 
const Edit = Register;
 
const VehicleSchema = {
    REGISTER_FORM: Register,
    EDIT_FORM: Edit,
};
 
export default VehicleSchema;