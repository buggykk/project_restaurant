
<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";

// AUTHENTICATION STATE

const isSignUp = ref(false);

const loginLoading = ref(false);
const signUploading = ref(false);

const loginRef = ref(null);
const signUpRef = ref(null);

// LOGIN FORM

const loginForm = ref({
  email: "",
  password: "",
});

// REGISTRATION FORM

const signUpForm = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// LOGIN VALIDATION

const loginRules = {
  email: [
    {
      required: true,
      message: "Введите электронную почту",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Некорректный email",
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      message: "Введите пароль",
      trigger: "blur",
    },
  ],
};

// REGISTRATION VALIDATION

const signUpRules = {
  name: [
    {
      required: true,
      message: "Введите ваше имя",
      trigger: "blur",
    },
  ],

  email: [
    {
      required: true,
      message: "Введите электронную почту",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Некорректный email",
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      message: "Придумайте пароль",
      trigger: "blur",
    },
    {
      min: 6,
      message: "Минимум 6 символов",
      trigger: "blur",
    },
  ],

  confirmPassword: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          callback(
            new Error("Повторите пароль")
          );
        } else if (
          value !== signUpForm.value.password
        ) {
          callback(
            new Error("Пароли не совпадают")
          );
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// PANEL SWITCHING

const showSignIn = () => {
  isSignUp.value = false;
};

const showSignUp = () => {
  isSignUp.value = true;
};

// DEMO LOGIN

const Login = async () => {
  if (!loginRef.value || loginLoading.value) {
    return;
  }

  const valid = await loginRef.value
    .validate()
    .catch(() => false);

  if (!valid) {
    return;
  }

  loginLoading.value = true;

  setTimeout(() => {
    ElMessage.success(
      "Демонстрационный вход выполнен"
    );

    loginLoading.value = false;
  }, 500);
};

// DEMO REGISTRATION

const SignUp = async () => {
  if (!signUpRef.value || signUploading.value) {
    return;
  }

  const valid = await signUpRef.value
    .validate()
    .catch(() => false);

  if (!valid) {
    return;
  }

  signUploading.value = true;

  setTimeout(() => {
    ElMessage.success(
      "Демонстрационная регистрация завершена"
    );

    signUpRef.value.resetFields();

    signUploading.value = false;

    showSignIn();
  }, 500);
};
</script>

<template>
  <div
    class="container"
    :class="{ 'sign-up-mode': isSignUp }"
  >
  
    <!-- AUTHENTICATION FORMS -->

    <div class="forms-container">
      <div class="signin-signup">

        <!-- LOGIN FORM -->

        <el-form
          ref="loginRef"
          :model="loginForm"
          :rules="loginRules"
          class="sign-in-form"
          @submit.prevent="Login"
        >
          <h2 class="title">
            Добро пожаловать!
          </h2>

          <p class="login-subtitle">
            Войдите в Название
          </p>

          <!-- Email -->

          <div class="input-field">
            <i class="fa-solid fa-envelope"></i>

            <el-form-item prop="email">
              <el-input
                v-model="loginForm.email"
                placeholder="Электронная почта"
                autocomplete="email"
              />
            </el-form-item>
          </div>

          <!-- Password -->

          <div class="input-field">
            <i class="fa-solid fa-lock"></i>

            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="Пароль"
                autocomplete="current-password"
                show-password
              />
            </el-form-item>
          </div>

          <!-- Login button -->

          <el-button
            type="primary"
            :loading="loginLoading"
            native-type="submit"
            class="btn"
            round
          >
            {{
              loginLoading
                ? "Вход..."
                : "Войти"
            }}
          </el-button>

          <p class="login-caption">
            Единая платформа для роста продаж
            вашего заведения
          </p>

        </el-form>

        <!-- =================================
             REGISTRATION FORM
             ================================= -->

        <el-form
          ref="signUpRef"
          :model="signUpForm"
          :rules="signUpRules"
          class="sign-up-form"
          @submit.prevent="SignUp"
        >
          <h2 class="title">
            Создать аккаунт
          </h2>

          <!-- Name -->

          <div class="input-field">
            <i class="fa-solid fa-user"></i>

            <el-form-item prop="name">
              <el-input
                v-model="signUpForm.name"
                placeholder="Ваше имя"
                autocomplete="name"
              />
            </el-form-item>
          </div>

          <!-- Email -->

          <div class="input-field">
            <i class="fa-solid fa-envelope"></i>

            <el-form-item prop="email">
              <el-input
                v-model="signUpForm.email"
                placeholder="Электронная почта"
                autocomplete="email"
              />
            </el-form-item>
          </div>

          <!-- Password -->

          <div class="input-field">
            <i class="fa-solid fa-lock"></i>

            <el-form-item prop="password">
              <el-input
                v-model="signUpForm.password"
                type="password"
                placeholder="Придумайте пароль"
                autocomplete="new-password"
                show-password
              />
            </el-form-item>
          </div>

          <!-- Confirm password -->

          <div class="input-field">
            <i class="fa-solid fa-lock"></i>

            <el-form-item prop="confirmPassword">
              <el-input
                v-model="signUpForm.confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                autocomplete="new-password"
                show-password
              />
            </el-form-item>
          </div>

          <!-- Registration button -->

          <el-button
            type="primary"
            :loading="signUploading"
            native-type="submit"
            class="btn"
            round
          >
            {{
              signUploading
                ? "Подождите..."
                : "Регистрация"
            }}
          </el-button>

        </el-form>
      </div>
    </div>

    <!-- =====================================
         SIDE PANELS
         ===================================== -->

    <div class="panels-container">

      <!-- LEFT PANEL -->

      <div class="panel left-panel">

        <div class="content">

          <h3>Название</h3>

          <p>
            Готовые решения для ресторанов
            и кафе.
          </p>

          <p>
            Впервые у нас?
            Создайте аккаунт и начните
            пользоваться платформой.
          </p>

          <button
            class="btn transparent"
            type="button"
            @click="showSignUp"
          >
            Регистрация
          </button>

        </div>

        <img
          src="/img/log.svg"
          class="image"
          alt="Иллюстрация платформы"
        />

      </div>

      <!-- RIGHT PANEL -->

      <div class="panel right-panel">

        <div class="content">

          <h3>С возвращением!</h3>

          <p>
            Уже зарегистрированы?
            Войдите в аккаунт,
            чтобы продолжить.
          </p>

          <button
            class="btn transparent"
            type="button"
            @click="showSignIn"
          >
            Войти
          </button>

        </div>

        <img
          src="/img/register.svg"
          class="image"
          alt="Иллюстрация регистрации"
        />

      </div>

    </div>
  </div>
</template>
