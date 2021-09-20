import Vue from 'vue';

import { Button, Icon, Config } from '@oruga-ui/oruga';
import '@fontsource/titillium-web';
import '@oruga-ui/oruga/dist/oruga.css';
import 'bootstrap-italia/dist/css/bootstrap-italia.min.css';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Icon);

Vue.use(Config, {
  button: {
    rootClass: 'btn',
    outlinedClass: 'btn-outline-',
    disabledClass: 'btn-disabled',
    // Apply variant when the element is not outlined
    variantClass: (variant, context) => (!context.props.outlined ? `btn-${variant}` : ''),
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
