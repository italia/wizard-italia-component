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
      <div class="row justify-content-center">
        <Wizard
          configuration-url="https://raw.githubusercontent.com/italia/wizard-italia/main/src/configuration/tree.json"
          matomo-site-id="wBEpDzz0yL"
          label-back="Indietro"
          label-restart="Ricomincia"
          label-aria-choices="Scegli una delle opzioni seguenti:"
          @choice="setTitle"
        />
      </div>
    </main>
  </div>
</template>

<script>
import Wizard from '@/components/Wizard.vue';

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

<style lang="scss">
@import 'bootstrap-italia/src/scss/bootstrap-italia';

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

.wizard {
  @extend .col-12;
}

.breadcrumb-container {
  @extend .col-12;
}

.page-content {
  @extend .mx-auto;
  @extend .col-12;
  @extend .col-xl-6;
  @extend .col-lg-8;
  @extend .col-md-10;
}

.reply {
  @extend .my-4;
  @extend .p-5;
}

.wizard-btn {
  width: 100%;
  text-align: left;
  margin-bottom: 8px;
}

.choice--current, .question {
  @extend .h3;
}

.btn-outline-primary:hover {
  background-color: #dce9f5;
  color: #06c;
}

.reply {
  background-color: #dce9f5;
  text-align: left;
}

</style>
