<template>
    <v-container class="pa-0" fluid>
        <v-parallax height="250"
            class="align-end justify-start"
            :src="'/api/img/blog/'+id+'?'+rand">
            <UploadImage tipo="blog" @upload="upload" />
              <div class="titulos pb-4 pl-10">
                <h2>Blog</h2>
                <p>Posts, articulos y noticias</p>
                <v-btn text small to="/">
                    <v-icon left>mdi-home</v-icon> Inicio</v-btn>
                <v-icon>mdi-chevron-double-right</v-icon>
                <v-btn text small to="/blog">
                    <v-icon left>mdi-newspaper</v-icon> Blog</v-btn>
                <v-icon>mdi-chevron-double-right</v-icon>
                <v-btn text small to="/blog">
                    <v-icon left>mdi-newspaper-variant-outline</v-icon> Post</v-btn>
              </div>
        </v-parallax>
        <v-container>
            <v-row>
                <v-col>
                 <v-form ref="form" v-model="valid" lazy-validation>
                    <h2 v-if="!admin">{{ post.titulo }}</h2>
                    <v-textarea v-else
                        auto-grow
                        rows="2" no-resize
                        :counter="255" required
                        :rules="[reglas.max255,reglas.requerido]"
                        v-model="e_post.titulo"
                        label="Título"
                    ></v-textarea>
                    <div v-if="!admin" v-html="post.descripcion"></div>
                    <v-textarea v-else auto-grow
                        v-model="e_post.descripcion"
                        rows="4" no-resize
                        label="Descripción" :counter="380"
                        :rules="[reglas.max380]"
                    ></v-textarea>
                    <v-divider class="my-2"></v-divider>
                    <div v-if="!admin" class="contenido"
                        v-html="post.contenido"></div>
                    <tiptap-vuetify v-else placeholder="Editar contenido"
                        v-model="e_post.contenido"
                        :extensions="extensions" />
                  </v-form>
                  
                </v-col>
                <v-col cols="12" md="3">
                    <v-card>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">Aprender en comunidad</h3>
                                <div>description</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat v-if="!admin"
                                @click="edit_post"
                                color="primary">Edit</v-btn>
                            <v-btn flat v-else
                                @click="save_post" :disabled="!valid"
                                color="success">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<style>
.tiptap-vuetify-editor__content img,
.contenido img {
  max-width: 100%;
}
</style>

<script>
import UploadImage from "../components/UploadImage"
import { mapState, mapGetters } from 'vuex'
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  Image,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";

export default {
    name: 'Post',

    components: { TiptapVuetify, UploadImage },

    data: () => ({
        admin: false,
        
        valid: false,
        rand: Math.random(),
        reglas: {
            requerido: v => !!v || 'Requerido.',
            max380: v => v.length <= 380 || 'Límite máximo de caracteres',
            max255: v => v.length <= 255 || 'Límite máximo de caracteres'
        },
        e_post: {},
        extensions: [
            History,
            Blockquote,
            Link,
            Underline,
            Strike,
            Italic,
            ListItem,
            BulletList,
            OrderedList,
            [
            Image,
            {
                options: {},
            },
            ],
            [
            Heading,
            {
                options: {
                levels: [1, 2, 3],
                },
            },
            ],
            Bold,
            Code,
            HorizontalRule,
            Paragraph,
            HardBreak,
        ],
    }),
    
    computed: {
        id() {
            return this.$route.params.id
        },
        ...mapState({post: state => state.blog.blog}),
        ...mapGetters('usuario',['getUser','noUser'])
    },

    created() {
        this.get_post()
    },

    beforeDestroy() {
        this.$store.dispatch("blog/reset_blog")
    },


    methods: {

        edit_post() {
            this.admin = true
            this.e_post = Object.assign({}, this.post)
        },
        get_post() {
            this.$store.dispatch("blog/get_blog", this.id)
        },
        save_post() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('blog/guardar', this.e_post)
                this.admin = false
            }
        },
        upload() {
            this.rand = Math.random()
        }
    }
}
</script>
