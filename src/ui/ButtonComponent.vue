<template>
  <button class="ButtonComponent" :type="type" v-bind:class="classObject">
    <span class="ButtonComponent__text">{{text}}</span>
    <span class="ButtonComponent__spinner">
      <svg width='14px' height='14px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke-dasharray="163.36281798666926 87.9645943005142" stroke="#3e4756" fill="none" stroke-width="20"><animateTransform attributeName="transform" type="rotate" values="0 50 50;180 50 50;360 50 50;" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"></animateTransform></circle></svg>
    </span>
  </button>
</template>

<script>
  export default {
    name: 'ButtonComponent',
    props: ['block', 'type', 'text', 'mode', 'smode', 'fetching'],
    computed: {
      classObject: function () {
        return {
          'ButtonComponent--fetching': this.fetching === true,
          'ButtonComponent--block': this.block === true,
          'ButtonComponent--default': !this.mode || this.mode === 'default',
          'ButtonComponent--primary': this.mode === 'primary',
          'ButtonComponent--sm': this.smode === 'sm',
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "variables";

  .ButtonComponent {
    padding: 10px 20px;
    outline: none;
    text-transform: uppercase;
    font-size: 20px;
    font-family: 'brandon';
    cursor: pointer;
    border-radius: $button_border_radius;
    border: 2px solid $button_default_border_color;
    background: $button_default_background_color;
    color: $button_default_text_color;
    transition: all 0.2s ease-in-out;
    line-height: 1;
    position: relative;

    &__spinner {
      position: absolute;
      width: 14px;
      height: 14px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }

  .ButtonComponent--md {
    font-size: 20px;
    padding: 10px 20px;
  }

  .ButtonComponent--sm {
    font-size: 14px;
    padding: 5px 10px 3px;
  }

  .ButtonComponent--block {
    display: block;
    width: 100%;
  }

  .ButtonComponent--primary {
    border: 2px solid $button_primary_border_color;
    background: $button_primary_background_color;
    color: $button_primary_text_color;

    &:hover {
      text-shadow: 0 0 3px $button_primary_text_color;
      background: $button_primary_background_color_hover;
    }
  }

  .ButtonComponent--primary.ButtonComponent--fetching {
    .ButtonComponent__text {
      opacity: 0.3;
    }

    .ButtonComponent__spinner {
      opacity: 1;
    }
  }
</style>