export const routerLink = {
  methods: {
    onButtonClick: function (e) {
      let str = e.charAt(0).toUpperCase() + e.slice(1)
      this.$router.push({ name: str })
    }
  }
}
