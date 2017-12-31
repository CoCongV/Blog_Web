export function userPorfile (url) {
  this.$router.push({
    name: 'userProfile',
    query: {
      author_url: url
    }
  })
}

export function edit (id) {
  console.log(id)
  this.$router.push({name: 'edit', params: {'id': id}})
}
