<template>
  <div id="app">
    <main
      id="content"
      class="container py-5"
    >
      <div
        v-if="activeStep === 0"
        class="container lead pb-4"
      >
        <div class="row justify-content-center">
          <div class="col-12 col-xl-6 col-lg-8 col-md-10">
            <p class="text-center h3">
              Ciao! 👋
            </p>
          </div>
        </div>
      </div>
      <Wizard
        matomo-site-id="wBEpDzz0yL"
        @choice="setTitle"
      />
    </main>
  </div>
</template>

<script>
import Wizard from './components/Wizard.vue';

export default {
  name: 'App',
  components: {
    Wizard,
  },
  data() {
    return {
      activeStep: 0,
    };
  },
  methods: {
    setTitle({ label, activeStep }) {
      const title = label || '';
      document.title = `${title} - Come partecipo`;
      this.activeStep = activeStep;
    },
  },
};
</script>

<style>
#app {
  display:flex;
  flex-direction:column;
  height:100vh;
  margin:0;
}
main {
  text-align: center;
  color: #2c3e50;
}
footer {
  margin-top:auto;
}
article.reply > h2 {
  font-size: 1.555rem;
}
article.reply > h3 {
  font-size: 1.333rem;
}
.icon {
  overflow: hidden;
}
</style>
