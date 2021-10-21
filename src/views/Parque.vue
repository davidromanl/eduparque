<template>
  <v-container fill-height>
      <v-row>
          <v-col>
              <span class="text-h2">e</span>
              <span class="text-h4">duparque</span>
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="cuantas"
            type="number"
            min="1" max="6"
            label="cuantas columnas"
          ></v-text-field>
          <v-btn @click="add_row">añadirfila</v-btn>
          nro de columnas: {{nro_cols}}
        </v-col>
      </v-row>
      <v-row>
        <v-col :md="col.size"
          v-for="col,k in cols" :key="k">
          <v-card>
            <v-card-actions>
              <v-icon v-if="k!==0"
                @click="left(k)" >mdi-arrow-left</v-icon>
              {{col.size}}
              <v-spacer></v-spacer>
              <v-icon  v-if="k!==cuantas-1"
                @click="right(k)">mdi-arrow-right</v-icon>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      {{cols}}
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Parque',

  data: () => ({
    cuantas: 1,
    cols: [],
  }),

  computed: {
    nro_cols() {
      return this.cols.length
    }
  },

  watch: {
    
  },

  created() {
    
  },

  methods: {
    add_row() {
      const cols = Number(this.cuantas)
      this.cols = []
      for (let i = 1; i <= cols; i++) {
        let size = (cols==5)
          ? (i==5) ? 4 : 2
          : 12/cols
        let col = { size }
        this.cols.push(col)
      }
    },

    right(k) {
      if(this.cols[k+1].size > 1) {
        this.cols[k].size++
        this.cols[k+1].size--
      }
    },
    left(k) {
      if(this.cols[k-1].size > 1) {
        this.cols[k].size++
        this.cols[k-1].size--
      }
    },
  }
}
</script>
