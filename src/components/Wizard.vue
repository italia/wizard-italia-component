<template>
  <div
    v-if="currentChoice"
    class="wizard"
  >
    <nav
      v-if="activeStep > 0"
      class="breadcrumb-container"
      aria-label="breadcrumb"
    >
      <ol class="breadcrumb">
        <li
          v-for="(madeChoice, index) in breadcrumbsChoices"
          :key="index"
          class="breadcrumb-item"
        >
          <a
            href="#"
            @click="moveToStep(index)"
          >{{ truncate(madeChoice.question, 60) }}</a>
          <span
            class="breadcrumb-items-divider"
          >{{ breadcrumbItemsDivider }}</span>
        </li>
      </ol>
    </nav>

    <div
      ref="page-content"
      class="page-content"
      tabindex="-1"
    >
      <p
        v-if="currentChoice.comment"
        class="comment"
      >
        {{ currentChoice.comment }}
      </p>

      <h2 class="question">
        {{ currentChoice.question }}
      </h2>

      <div class="choices-wrapper">
        <ul
          v-if="!isLeaf(currentChoice)"
          class="choices-list"
          :aria-label="labelAriaChoices"
        >
          <li
            v-for="(possibleChoice, index) in currentChoice.content"
            :key="possibleChoice.label"
          >
            <o-button
              v-bind="styleConfig.button"
              variant="outline-primary"
              @click="selectChoice(possibleChoice, index)"
            >
              {{ possibleChoice.label }}
            </o-button>
          </li>
        </ul>
        <div v-else>
          <h2 class="choice--current">
            {{ currentChoice.label }}
          </h2>
          <div
            class="reply"
            v-html="transformMarkdown(currentChoice.content)"
          />
        </div>

        <o-button
          v-if="activeStep > 0"
          v-bind="styledConfig.button"
          variant="secondary"
          @click="goBack()"
        >
          <o-icon
            v-bind="styledConfig.icon"
            icon="arrow-left-circle"
          /> {{ labelBack }}
        </o-button>
        <o-button
          v-if="isLeaf(currentChoice)"
          v-bind="styledConfig.button"
          variant="primary"
          @click="restart()"
        >
          <o-icon
            v-bind="styledConfig.icon"
            icon="restore"
          /> {{ labelRestart }}
        </o-button>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import { initMatomo, logAction } from '@/analytics';

export default {
  name: 'Wizard',
  props: {
    breadcrumbItemsDivider: {
      type: String,
      default: '/',
    },
    labelRestart: {
      type: String,
      default: 'Restart',
    },
    labelBack: {
      type: String,
      default: 'Back',
    },
    labelAriaChoices: {
      type: String,
      default: 'Choose one of the following options:',
    },
    matomoSiteId: {
      type: String,
      default: '',
    },
    configurationUrl: {
      type: String,
      required: true,
    },
    styleConfig: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      activeStep: 0,
      choices: [],
      completed: false,
    };
  },
  computed: {
    styledConfig() {
      const styleConfig = { ...this.styleConfig };
      if (styleConfig.iconComponent) {
        styleConfig.icon = {};
        styleConfig.icon.component = styleConfig.iconComponent;
        styleConfig.icon.pack = styleConfig.iconPack;
      }
      return styleConfig;
    },
    currentChoice() {
      return this.choices[this.choices.length - 1];
    },
    breadcrumbsChoices() {
      const notLeafChoices = this.choices.filter((choice) => !this.isLeaf(choice));
      return notLeafChoices.splice(0, notLeafChoices.length - 1);
    },
  },
  mounted() {
    if (this.matomoSiteId) {
      initMatomo(this.matomoSiteId);
    }
    fetch(this.configurationUrl)
      .then((response) => response.json())
      .then((data) => {
        this.choices.push(data.root);
        window.history.pushState({ choices: this.choices, activeStep: this.activeStep }, '');
      });

    window.onpopstate = (event) => {
      if (!event.state) {
        return;
      }
      this.choices = event.state.choices;
      this.activeStep = event.state.activeStep;
    };

    window.onbeforeunload = () => {
      if (!this.completed) {
        // TRACK DROPOUT
        logAction('dropout', this.currentChoice.question || this.currentChoice.label);
      }
    };
  },
  methods: {
    transformMarkdown(content) {
      return marked(content);
    },
    truncate(text, len) {
      return text.length > len ? `${text.slice(0, len)}…` : text;
    },
    restart() {
      window.location.reload();
    },
    goBack() {
      if (!this.completed) {
        // TRACK BACK
        logAction('back', this.currentChoice.question || this.currentChoice.label);
      }
      this.moveToStep(this.activeStep - 1);
      this.focusContent();
    },
    focusContent() {
      this.$nextTick(() => {
        this.$refs['page-content'].focus();
      });
    },
    isLeaf(node) {
      if (typeof (node.content) === 'string') {
        if (!this.completed) {
          this.completed = true;
          // TRACK COMPLETED
          logAction('completed', this.currentChoice.question || this.currentChoice.label);
        }
        return true;
      }
      return false;
    },
    selectChoice(currentChoice) {
      this.choices.push(currentChoice);
      this.activeStep = this.choices.length - 1;
      window.history.pushState({ choices: this.choices, activeStep: this.activeStep }, '');

      this.$emit('choice', { label: currentChoice.question || currentChoice.label, activeStep: this.activeStep });
      logAction('choice', this.currentChoice.question || this.currentChoice.label);

      /* Focus the newly loaded content to guide assistive technologies */
      this.focusContent();
      this.$nextTick(() => {
        document.querySelectorAll('.reply a').forEach((el) => {
          el.addEventListener('click', () => logAction('link', el.href));
        });
      });
    },
    moveToStep(step) {
      this.activeStep = step;
      this.choices = this.choices.slice(0, step + 1);
      const currentChoice = this.choices[this.choices.length - 1];
      this.$emit('choice', { label: currentChoice.question || currentChoice.label, activeStep: this.activeStep });
    },
  },
};
</script>

<style scoped>
.breadcrumb-items-divider {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
}
.choices-list {
  margin-top: 2rem;
  list-style-type: none;
  padding-left: 0;
}
</style>
