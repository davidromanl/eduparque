import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

// import plugin
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'
// Vuetify's CSS styles 
//import 'vuetify/dist/vuetify.min.css'


Vuetify.config.silent = true

const vuetify = new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
});

Vue.use(Vuetify);

Vue.use(TiptapVuetifyPlugin, {
    // the next line is important! You need to provide the Vuetify Object to this place.
    vuetify // same as "vuetify: vuetify"
  })

export default vuetify
