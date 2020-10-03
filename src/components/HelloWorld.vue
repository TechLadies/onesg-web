<template>
  <section class="section">
    <div class="container">
      <h1 class="title">1Hello World</h1>
      <p class="subtitle">My first website with <strong>Bulma</strong>!</p>
      <p>
        <button class="button is-success">Success</button>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>
