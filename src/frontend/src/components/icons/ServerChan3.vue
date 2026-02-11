<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    class="server-chan-3-icon"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <rect
      x="2"
      y="2"
      width="28"
      height="28"
      rx="3"
      ry="3"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M 8 11 L 15 16 L 8 21 M 17 21 L 24 21"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'ServerChan3'
}
</script>

<style scoped>
.server-chan-3-icon {
  /* 背景色透明 */
  background-color: transparent;

  /* 默认大小，可根据需要通过 CSS 覆盖 */
  width: 1em;
  height: 1em;

  /* 保持图标内联显示并垂直居中 */
  display: inline-block;
  vertical-align: middle;
}
</style>