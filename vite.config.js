module.exports = {
  port: 8080,
  vueCompilerOptions: {
    isCustomElement: (tag) => tag.startsWith('bwc-'),
  },
  optimizeDeps: {
    include: ['dayjs'],
  },
}
