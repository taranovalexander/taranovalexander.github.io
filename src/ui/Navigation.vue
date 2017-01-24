<template>
  <div class="Navigation">
    <div class="Navigation__wrap">
      <div class="Navigation__item"
           v-for="page in pages"
           v-bind:class="{'Navigation__item--active': page.active}"
           v-on:click="scrollTo(page.pageId)"
      >
        <ButtonComponent type="button" block="false" smode="sm" :mode="page.active ? 'primary' : 'default'" :text="page.name" />

      </div>
    </div>
  </div>
</template>

<script>
  import ButtonComponent from './ButtonComponent.vue';

  export default {
    name: 'Navigation',
    props: ['pages'],
    methods: {
      scrollTo: function (pageId) {
        const windowHeight = window.innerHeight;
        window.scrollTo(0, windowHeight * pageId);
      }
    },
    components: {
      ButtonComponent,
    }
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .Navigation {
    position: fixed;
    top: 30px;
    width: 80%;
    left: 10%;
    z-index: 10;

    &__wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: flex-start;
      font-family: 'brandon';
      text-transform: uppercase;
      color: $nav_default_color;
    }

    &__item {
      letter-spacing: 0.1em;
      display: flex;
      margin-right: 10px;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
  }

  .Navigation__item--active {
    .Navigation__item-point {
      background: $nav_primary_color;
      box-shadow: 0 0 3px $nav_primary_color;
    }
    .Navigation__item-title {
      color: $nav_primary_color;
      text-shadow: 0 0 1px $nav_primary_color;
    }
  }
</style>