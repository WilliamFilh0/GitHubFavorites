// classe que vai estruturar a lógica dos dados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}
//classe que vai criar aa visualização e eventos html 
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.update()
  }

  //Toda vez que mudar um dado vai ser chamado
  update() {
    this.removeAllTr()
  }

  removeAllTr() {
    const tbody = this.root.querySelector('table tbody')

    tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}


