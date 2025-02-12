const getRules = (val: string | undefined) => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng điền vào mục này'
    },
    minLength: {
      value: 5,
      message: 'Email phải có từ 5 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Email phải có từ 5 đến 160 ký tự'
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email không hợp lệ'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng điền vào mục này'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu phải từ 6 đến 160 ký tự'
    },
    maxLength: {
      value: 160,
      message: 'Mật khẩu phải từ 6 đến 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng điền vào mục này'
    },
    validate: val ? (value: string) => (value === val ? true : 'Mật khẩu không khớp') : undefined
    // minLength: {
    //   value: 6,
    //   message: 'Mật khẩu phải từ 6 đến 160 ký tự'
    // },
    // maxLength: {
    //   value: 160,
    //   message: 'Mật khẩu phải từ 6 đến 160 ký tự'
    // }
  }
});

export default getRules;
