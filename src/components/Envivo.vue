<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="740px"
    transition="dialog-transition"
    persistent
    scrollable
    :fullscreen="fullscreen"
  >
    <v-card min-width="100%" dark height="83vh" :loading="!loaded">
      <v-toolbar dense dark color="secondary">
        <strong>Clase en vivo</strong>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="mr-2" small @click.native="setFullscreen()">
              <v-icon
                >mdi-fullscreen{{ fullscreen ? "-exit" : "" }}</v-icon
              ></v-btn
            >
          </template>
          <span>{{ fullscreen ? "Reducir" : "Ampliar" }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              small
              :disabled="!loaded"
              color="red"
              @click="salir"
            >
              <v-icon>mdi-phone-hangup</v-icon></v-btn
            >
          </template>
          <span>Colgar/Salir</span>
        </v-tooltip>
      </v-toolbar>

      <vue-jitsi-meet
        ref="jitsiRef"
        v-if="value"
        domain="meet.jit.si"
        :options="jitsiOptions"
      ></vue-jitsi-meet>

      <v-overlay absolute opacity="0.7" :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import { JitsiMeet } from "@mycure/vue-jitsi-meet";
import { mapState } from "vuex";
export default {
  name: "enVivo",

  props: ["value", "curso"],

  components: { VueJitsiMeet: JitsiMeet },

  data: () => ({
    fullscreen: false,
    loaded: false,
    overlay: true,
  }),

  computed: {
    ...mapState({
      usuario: (state) => state.usuario.usuario,
    }),
    jitsiOptions() {
      return {
        roomName: this.curso,
        height: "98%",
        userInfo: {
          email: this.usuario.email,
          displayName: this.usuario.nombre,
        },
        configOverwrite: {
          disableShowMoreStats: true,
          disableDeepLinking: true,
          disableRemoteMute: true,
          readOnlyName: true,
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          hiddenPremeetingButtons: ["camera", "select-background"],
          remoteVideoMenu: { disableKick: true, disableGrantModerator: true },
          toolbarButtons: [
            "camera",
            "shortcuts",
            "chat",
            "closedcaptions",
            "etherpad",
            "feedback",
            "filmstrip",
            "fullscreen",
            "hangup",
            "microphone",
            "raisehand",
            "select-background",
            "tileview",
            "toggle-camera",
            "__end",
          ],
        },
        onload: this.onIFrameLoad,
      };
    },
  },

  methods: {
    onIFrameLoad() {
      this.$refs.jitsiRef.addEventListener(
        "videoConferenceLeft",
        this.videoConferenceLeft
      );
      this.$refs.jitsiRef.addEventListener(
        "participantKickedOut",
        this.participantKickedOut
      );
      this.loaded = true;
      this.$refs.jitsiRef.executeCommand(
        "avatarUrl",
        "http://localhost/api/img/usuario/" + this.usuario.id
      );
      this.delay(500).then(() => (this.overlay = false));
    },

    videoConferenceLeft() {
      this.$emit("input", false);
      this.loaded = false;
      this.overlay = true;
    },

    participantKickedOut({ kicked }) {
      if (kicked.local) this.videoConferenceLeft();
    },

    setFullscreen() {
      this.fullscreen = !this.fullscreen;
    },

    salir() {
      this.$refs.jitsiRef.executeCommand("hangup");
    },

    delay(milisec) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("");
        }, milisec);
      });
    },
  },
};
</script>