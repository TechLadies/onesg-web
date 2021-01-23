module.exports = {
  port: 5050,
  vueCompilerOptions: {
    isCustomElement: (tag) => tag.startsWith('bwc-'),
  },
}
