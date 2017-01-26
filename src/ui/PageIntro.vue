<template>
  <div class="PageIntro" v-bind:class="classObject">
    <div class="PageIntro__content">
      <div class="PageIntro__content-inner">
        <div class="PageIntro__title">
          {{page.data.title}}
        </div>
        <div class="PageIntro__sub-title">
          {{page.data.sub_title}}
        </div>
      </div>
    </div>
    <div class="PageIntro__hint">
      Scroll to see next
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageIntro',
    props: ['page'],
    computed: {
      classObject: function () {
        return {
          'PageIntro--active': this.page.active,
          'PageIntro--disabled': this.page.previous,
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "variables";

  .PageIntro {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    &__content {
      width: 80%;
      max-width: 800px;
      height: 400px;
      background: $content_overlay_color;
      position: absolute;
      left: -100%;
      top: calc(50% - 50px);
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      overflow: hidden;
    }

    &__content-inner {
      width: 100%;
      font-weight: 700;
      text-align: center;
      position: relative;
      left: 100%;
    }

    &__title {
      font-family: 'akzidenz-grotesk', sans-serif;
      font-size: 2.8rem;
      color: $content_text_color;
      text-transform: uppercase;
      margin-bottom: 20px;
      letter-spacing: 0.1em;
    }

    &__sub-title {
      font-size: 1.1rem;
      color: $content_text_color;
      text-transform: uppercase;
      font-weight: 400;
    }

    &__hint {
      font-size: 1rem;
      color: $content_text_color;
      text-transform: uppercase;
      position: absolute;
      bottom: 30px;
      width: 100%;
      text-align: center;
      opacity: 0;
    }
  }

  .PageIntro--active {
    z-index: 10;

    .PageIntro__content {
      animation: animationContainerIn 1s ease 0.5s forwards;
    }

    .PageIntro__content .PageIntro__content-inner {
      animation: animationContentIn 1s ease 1s forwards;
    }

    .PageIntro__hint {
        animation: animationHint 2s ease 0s infinite alternate;
    }
  }

  .PageIntro--disabled {
    .PageIntro__content {
      left: 50%;
      animation: animationContainerOut 1s ease 0.5s forwards;
    }

    .PageIntro__content .PageIntro__content-inner {
      left: 0;
      animation: animationContentOut 1s ease 0s forwards;
    }
  }

    @keyframes animationHint {
        0% { opacity: 0.3; }
        50% { opacity: 0.6; }
        100% { opacity: 0.3; }
    }

  @keyframes animationContainerIn {
    from { left: -100%; }
    to { left: 50%; }
  }

  @keyframes animationContentIn {
    from {
        left: 100%;
        opacity: 0;
    }
    to {
        left: 0;
        opacity: 1;
    }
  }

  @keyframes animationContainerOut {
    from { left: 50%; }
    to { left: -100%; }
  }

  @keyframes animationContentOut {
    from {
        left: 0;
        opacity: 1;
    }
    to {
        left: 100%;
        opacity: 0;
    }
  }
</style>