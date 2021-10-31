import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.deepOrange.lighten1,
        secondary: colors.orange.lighten1,
        background: colors.grey.lighten2, 
      },
      dark: {
        secondary: colors.deepOrange.darken4,
        primary: colors.orange.darken4,
        background: colors.grey.darken4,
        anchor: colors.red
      }
    }
  }
});
