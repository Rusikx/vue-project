// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import 'vuetify/lib/styles/main.sass'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

// Vuetify
// import Vuetify from "vuetify";
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// https://colorhunt.co/palette/222831393e4600adb5eeeeee
const teal = {
  dark: false,
  colors: {
    primary: '#00ADB5',
    secondary: "#EEEEEE",
    background: '#393E46',
    background2: '#222831',
  }
}

export default createVuetify(
  {
    components,
    directives,
    theme: {
      defaultTheme: "teal",
      // defaultTheme: "dark",
      themes: {
        teal
      }
    }
  }
)
