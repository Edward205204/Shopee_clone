import { z } from 'zod';

const baseSchema = z.object({
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
  confirm_password: z.string({ required_error: 'Nhập lại mật khẩu là bắt buộc' })
  // .min(6, 'Mật khẩu phải từ 6 đến 160 ký tự')
  // .max(160, 'Mật khẩu phải từ 6 đến 160 ký tự')
});

// const registerSchema = baseSchema.refine((data) => data.password === data.confirm_password, {
//   message: 'Mật khẩu không khớp',
//   path: ['confirm_password']
// });

const registerSchema = baseSchema.superRefine((data, ctx) => {
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

export const loginSchema = baseSchema.omit({ confirm_password: true });
export type typeOfLoginSchema = z.infer<typeof loginSchema>;

export default registerSchema;
export type TypeRegSchema = z.infer<typeof registerSchema>;
