<template>
  <button class="ButtonComponent" :type="type" v-bind:class="classObject">{{text}}</button>
</template>

<script>
  export default {
    name: 'ButtonComponent',
    props: ['block', 'type', 'text', 'mode', 'smode'],
    computed: {
      classObject: function () {
        return {
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
</style>