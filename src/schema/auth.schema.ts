import {  z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'The field password must contain at least 6 characters')
})

const RegisterSchema = z.object({
  name: z.string().min(2, 'The field name must contain at least 2 characters'),
  lastname: z.string().min(2, 'The field lastname must contain at least 2 characters'),
  email: z.string().email('Invalid email').min(1, 'The field email is required'),
  password: z.string().min(6, 'The field password must contain at least 6 characters'),
  confirmation: z.string().min(6, 'The field password must contain at least 6 characters')
}).required().refine((data) => data.password === data.confirmation, {
  message: "The passwords don't match",
  path: ['confirmation']
})

const ValidateLogin = (input: any) => {
  return LoginSchema.safeParse(input)
}

const ValidateRegister = (input: any) => {
  return RegisterSchema.safeParse(input)
}


export { ValidateLogin, ValidateRegister }