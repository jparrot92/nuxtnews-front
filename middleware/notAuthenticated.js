export default function ({ store, redirect }) {
  // Si el usuario está autenticado
  if (store.getters['authentication/isLogged']) {
    return redirect('/posts')
  }
}
