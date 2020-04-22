<template>
  <v-card>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :right="true"
      :timeout="timeout"
      :top="true"
    >
      {{ text }}
      <v-btn
        icon
        v-on:click="snackbar = false"
      >
        <v-icon color="white">mdi-close-box-outline</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  props: ['color', 'text'],
  data: () => ({
    snackbar: true,
    timeout: 3000,
  }),
};
</script>
