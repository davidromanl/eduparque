<template>
  <div id="login">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-form
            v-model="valid"
            ref="form"
            @submit.prevent="enviar"
            @keyup.prevent.enter="enviar"
            lazy-validation
          >
            <v-card class="elevation-12">
              <v-card-title class="pa-0">
                <v-tabs-items class="title" v-model="tab">
                  <v-tab-item>
                    <h3><v-icon left>account_box</v-icon>Inicio de sesión</h3>
                  </v-tab-item>
                  <v-tab-item>
                    <h3><v-icon left>person_add</v-icon>Registrar Usuario</h3>
                  </v-tab-item>
                  <v-tab-item>
                    <h3><v-icon left>refresh</v-icon>Recuperar Contraseña</h3>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-title>
              <v-tabs grow max v-model="tab" color="success">
                <v-tooltip
                  bottom
                  transition="scroll-x-reverse-transition"
                  nudge-bottom="-8"
                >
                  <template v-slot:activator="{ on }">
                    <v-tab v-on="on">
                      <v-icon>account_box</v-icon>
                    </v-tab>
                  </template>
                  <span>Iniciar sesión</span>
                </v-tooltip>
                <v-tooltip
                  bottom
                  transition="scroll-x-reverse-transition"
                  nudge-bottom="-8"
                >
                  <template v-slot:activator="{ on }">
                    <v-tab v-on="on">
                      <v-icon>person_add</v-icon>
                    </v-tab>
                  </template>
                  <span>Registro nuevo usuario</span>
                </v-tooltip>
                <v-tooltip
                  bottom
                  transition="scroll-x-reverse-transition"
                  nudge-bottom="-8"
                >
                  <template v-slot:activator="{ on }">
                    <v-tab v-on="on">
                      <v-icon>refresh</v-icon>
                    </v-tab>
                  </template>
                  <span>Recordar contraseña</span>
                </v-tooltip>
              </v-tabs>

              <v-card-text>
                <v-expand-transition>
                  <v-alert
                    v-model="msg_on"
                    v-if="msg_on"
                    dismissible
                    :type="msg_type"
                    >{{ msg }}</v-alert
                  >
                </v-expand-transition>
                
                <v-text-field
                  label="Correo"
                  v-model="user.email"
                  required
                  :rules="[reglas.requerido, reglas.email]"
                ></v-text-field>
                <v-expand-transition>
                  <v-text-field
                    label="Contraseña"
                    min="8"
                    counter
                    required
                    v-if="tab != 2"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :type="show ? 'text' : 'password'"
                    :rules="[reglas.requerido, reglas.minimo8]"
                    v-model="user.clave"
                    @click:append="show = !show"
                  ></v-text-field>
                </v-expand-transition>
                <v-expand-transition>
                  <v-text-field
                    label="Nombre"
                    v-model="user.nombre"
                    required
                    v-if="tab == 1"
                    :rules="[reglas.requerido]"
                  ></v-text-field>
                </v-expand-transition>
                <div v-if="tab == 0" class="text-md-center pb-2">
                  <a @click="tab = 2">¿Olvido su contraseña?</a>
                </div>
                <v-checkbox
                  class="mt-0"
                  v-if="tab == 1"
                  :rules="[reglas.requerido]"
                  v-model="checkbox"
                >
                  <template v-slot:label>
                    <div>
                      Acepto los
                      <a
                        target="_blank"
                        @click.stop
                        href="https://vuetifyjs.com"
                        >Términos y condiciones</a
                      ><v-icon right>mdi-open-in-new</v-icon>
                    </div>
                  </template>
                </v-checkbox>
                <div v-if="tab == 2" class="text-md-center">
                  Ingrese la dirección de correo registrada para restablecer una
                  nueva contraseña.
                </div>

                <div
                  style="width: 310px"
                  class="ma-auto"
                  :class="{ captcha: captcha }"
                >
                  <vue-recaptcha
                    @verify="onVerify"
                    @error="onError"
                    @expired="onError"
                    :loadRecaptchaScript="true"
                    sitekey="6Ld2dOQcAAAAAE_6gbAtOUj48msSagvtMT23rKug"
                  >
                  </vue-recaptcha>
                </div>
              </v-card-text>
              <v-divider class="blue-grey pt-1 lighten-1"></v-divider>
              <v-scroll-y-transition>
                <v-card-actions class="blue-grey lighten-5" v-show="captcha">
                  <v-btn color="orange" v-if="tab == 0" @click="tab = 1"
                    >Registro</v-btn
                  >
                  <v-btn v-else @click="tab = 0">Cancelar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    type="submit"
                    v-if="tab == 0"
                    color="success"
                    :disabled="!valid"
                    >Ingresar</v-btn
                  >
                  <v-btn v-else type="submit" color="primary">Enviar</v-btn>
                </v-card-actions>
              </v-scroll-y-transition>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style scoped>
#login {
  background-image: url("../assets/elearning.jpg");
  background-size: contain;
  background-position-y: bottom;
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  text-align: center;
  padding: 20px 0 5px;
  border-bottom: lightslategrey 3px solid;
  background-color: rgb(235, 235, 235);
  border-radius: 3px;
}

.captcha {
  height: 0px;
  overflow: hidden;
  transition-property: all;
  transition-duration: 200ms;
}
</style>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "Login",
  props: {
    url: {
      type: String,
      required: false,
      default: "/",
    },
  },
  components: { VueRecaptcha },
  data: () => ({
    tab: null,
    show: false,
    valid: true,
    checkbox: false,
    user: {},
    msg_on: false,
    msg_type: "info",
    captcha: true,
    msg: "",

    reglas: {
      requerido: (v) => !!v || "Es requerido.",
      email: (v) => /.+@.+/.test(v) || "Ingrese un correo válido",
      minimo8: (v) => (v && v.length >= 8) || "Mínimo de 8 caracteres",
    },
  }),

  computed: {
    token: function () {
      return this.$store.state.usuario.token;
    },
  },

  methods: {
    onVerify() {
      this.captcha = true;
    },
    onError() {
      this.captcha = true;
    },

    enviar() {
      if (this.$refs.form.validate()) {
        if (this.tab === 0) this.login();
        if (this.tab === 1) this.registro();
        if (this.tab === 2) this.recuperar();
      }
    },

    login() {
      this.$store
        .dispatch("usuario/login", this.user)
        .then(() => {
          this.$router.push(this.url);
        })
        .catch(() => {
          this.msg_on = true;
          this.msg_type = "error";
          this.msg = "Datos incorrectos";
          this.hideKeyboard();
          setTimeout(() => (this.msg_on = false), 5000);
        });
    },

    registro() {
      this.$store.dispatch("usuario/registro", this.user).then((r) => {
        this.msg_on = true;
        this.msg_type = r ? "info" : "error";
        this.msg = r
          ? "Usuario registrado, ya puedes iniciar"
          : "Este email ya se encuentra registrado";
        if (r) this.$refs.form.reset();
        this.hideKeyboard();
        setTimeout(() => (this.msg_on = false), 5000);
      });
    },

    recuperar() {
      //this.$store.dispatch("usuario/recuperar",this.user)
      this.hideKeyboard();
    },

    hideKeyboard() {
      setTimeout(function () {
        var field = document.createElement("input");
        field.setAttribute("type", "text");
        field.setAttribute(
          "style",
          "position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;"
        );
        document.body.appendChild(field);

        field.onfocus = function () {
          setTimeout(function () {
            field.setAttribute("style", "display:none;");
            setTimeout(function () {
              document.body.removeChild(field);
              document.body.focus();
            }, 14);
          }, 200);
        };

        field.focus();
      }, 50);
    },
  },
};
</script>