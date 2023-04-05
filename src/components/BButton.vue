<template>
  <component
    :is="href ? 'a' : to ? 'RouterLink' : 'button'"
    class="btn text-nowrap"
    :class="[`btn-${variant}`, `btn-${size}`]"
    :to="to"
    :href="href"
  >
    <i v-if="iconLeft" class="fa-solid me-1" :class="'fa-' + iconLeft" /><slot /><i
      v-if="iconRight"
      class="fa-solid ms-1"
      :class="'fa-' + iconRight"
    />
  </component>
</template>

<script>
export default {
  props: {
    iconLeft: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'md'
    },
    href: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
