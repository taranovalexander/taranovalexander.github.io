<template>
  <div class="Layout" v-bind:style="styles" v-bind:class="classObject">
    <div id="scene" class="Layout__scene"></div>
    <div class="Layout__content">
      <div class="Layout__block" v-for="page in pages">
        <component :page="page" :is="page.component"></component>
      </div>
    </div>
    <div class="Layout__navigation">
      <Navigation :pages="navItems"></Navigation>
    </div>
  </div>
</template>

<script>
  import Navigation from './Navigation.vue';
  import PageContent from './PageContent.vue';
  import PageIntro from './PageIntro.vue';
  import PageContacts from './PageContacts.vue';

  export default {
    name: 'Layout',
    components: {
      Navigation,
      PageContent,
      PageIntro,
      PageContacts,
    },
    data() {
      return {
        styles: {
          height: `${100 * this.pages.length}vh`
        },
      }
    },
    watch: {
      pages: function (newPages) {
        this.styles = {
          height: `${100 * newPages.length}vh`,
        }
      }
    },
     computed: {
      classObject: function () {
        return {
          'Layout--loading': this.loading,
        }
      }
    },
    props: ['pages', 'navItems'],
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: 'brandon';
    font-style: normal;
    font-weight: 300;
    src: url(../assets/fonts/brandon-regular.woff2) format('woff2');
  }

  @font-face {
    font-family: 'brandon';
    font-style: normal;
    font-weight: 400;
    src: url(../assets/fonts/brandon-medium.woff2) format('woff2');
  }

  @font-face {
    font-family: 'brandon';
    font-style: normal;
    font-weight: 700;
    src: url(../assets/fonts/brandon-bold.woff2) format('woff2');
  }

  @font-face {
    font-family: 'akzidenz-grotesk';
    font-style: normal;
    font-weight: 700;
    src: url(../assets/fonts/akzidenz-grotesk_r.woff) format('woff');
  }

  @font-face {
    font-family: 'akzidenz-grotesk';
    font-style: normal;
    font-weight: 700;
    src: url(../assets/fonts/akzidenz-grotesk_r.woff2) format('woff2');
  }

  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  .Layout {
    position: relative;
    width: 100%;
    font-family: 'Open Sans';
    font-weight: 400;

    &__scene {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    &__content {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    &__block {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &__navigation {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 3;

      @media (max-width: 560px) {
        display: none;
      }
    }
  }
</style>