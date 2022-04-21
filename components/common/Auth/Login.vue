<template>
  <el-card
    class="login_form-wrapper p-5"
    style="border-radius: 15px"
    :body-style="{ padding: 0 }"
  >
    <img
      src="~/assets/img/logo.svg"
      alt="S-group Management System"
      class="my-5"
      style="height: 60px"
    />
    <div class="flex flex-row">
      <div style="flex: 5" class="login_avatar-wrapper" />

      <div style="flex: 3" class="p-5">
        <h1 class="my-8 text-2xl text-center font-bold text-gray-700">
          {{ $t('login.title') }}
        </h1>
        <div>
          <span class="italic"
            >Hãy đăng nhập để sử dụng S-Group Management System</span
          >
        </div>
        <FormWrapper
          ref="loginForm"
          class="my-5"
          :model="form"
          @onSubmit="$emit('my-login-form-submit', form)"
        >
          <InputWrapper rules="required|email|max_length:255" prop="email">
            <label class="font-medium">{{ $t('login.email') }}</label>
            <el-input
              v-model="form.email"
              type="email"
              :placeholder="$t('login.email-placeholder')"
            ></el-input>
          </InputWrapper>
          <InputWrapper rules="required|max_length:255" prop="password">
            <label class="font-medium">{{ $t('login.password') }}</label>
            <el-input
              v-model="form.password"
              :label="$t('login.password')"
              type="password"
              :placeholder="$t('login.password-placeholder')"
              show-password
            ></el-input>
          </InputWrapper>
          <el-button
            native-type="submit"
            type="success"
            class="w-full mt-5 rounded-lg"
          >
            {{ $t('login.button') }}
          </el-button>
        </FormWrapper>
      </div>
    </div>
  </el-card>
</template>
<script>
import { FormWrapper, InputWrapper } from '~templates/Form'
export default {
  components: {
    FormWrapper,
    InputWrapper,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    reset() {
      this.$refs.loginForm.reset()
    },
  },
}
</script>
<style lang="scss">
.login_form-wrapper {
  .el-form-item__content {
    line-height: 1.25rem;
  }
  .el-input__inner {
    border-radius: 0;
    border-width: 0 0 1px 0;
    border-color: var(--color-dark);
    padding: 0;
  }
}
</style>
<style lang="scss" scoped>
.login_avatar-wrapper {
  background-image: url(~assets/img/login/bg.png);
  background-size: cover;
  background-position: center;
}
</style>
