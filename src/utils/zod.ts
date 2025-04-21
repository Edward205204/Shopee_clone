import { z } from 'zod';

export const baseSchema = z.object({
  email: z
    .string({
      required_error: 'Email là bắt buộc'
    })
    .email('Email không hợp lệ')
    .min(5, 'Email phải có từ 5 đến 160 ký tự')
    .max(160, 'Email phải có từ 5 đến 160 ký tự'),
  password: z
    .string({ required_error: 'Mật khẩu là bắt buộc' })
    .min(6, 'Mật khẩu phải từ 6 đến 160 ký tự')
    .max(160, 'Mật khẩu phải từ 6 đến 160 ký tự'),
  confirm_password: z.string({ required_error: 'Nhập lại mật khẩu là bắt buộc' }),
  search: z.string().trim().min(1)
});

const registerSchema = baseSchema
  .pick({ email: true, password: true, confirm_password: true })
  .superRefine((data, ctx) => {
    if (!data.confirm_password || data.confirm_password.trim() === '') {
      ctx.addIssue({
        path: ['confirm_password'],
        message: 'Nhập lại mật khẩu là bắt buộc',
        code: z.ZodIssueCode.custom
      });
    }
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        message: 'Mật khẩu không khớp',
        code: z.ZodIssueCode.custom
      });
    }
  });

export const inputPriceSchema = z
  .object({
    from: z
      .string()
      .optional()
      .refine((val) => val === '' || /^\d+$/.test(val || ''), {
        message: 'This field must be a number'
      }),
    to: z
      .string()
      .optional()
      .refine((val) => val === '' || /^\d+$/.test(val || ''), {
        message: 'This field must be a number'
      })
  })
  .superRefine((data, ctx) => {
    if (data.from && data.to && data.from !== '' && data.to !== '' && parseInt(data.from) > parseInt(data.to)) {
      ctx.addIssue({
        path: ['from'],
        message: 'Giá không phù hợp',
        code: z.ZodIssueCode.custom
      });
      ctx.addIssue({
        path: ['to'],
        message: 'Giá không phù hợp',
        code: z.ZodIssueCode.custom
      });
    }
  });

export const userProfileSchema = z.object({
  address: z.string().max(160, 'Max length is 160 characters'),
  phone: z.string().max(20, 'Max length is 20 characters'),
  date_of_birth: z.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  name: z.string().max(160, 'Max length is 160 characters'),
  avatar: z.string().max(1000, 'Max length is 1000 characters'),
  password: baseSchema.shape.password,
  new_password: baseSchema.shape.password,
  confirm_password: baseSchema.shape.confirm_password
});

export type TypUserProfileSchema = z.infer<typeof userProfileSchema>;

export type typeOfInputPrice = z.infer<typeof inputPriceSchema>;

export const loginSchema = baseSchema.pick({ email: true, password: true });
export type typeOfLoginSchema = z.infer<typeof loginSchema>;

export default registerSchema;
export type TypeRegSchema = z.infer<typeof registerSchema>;
