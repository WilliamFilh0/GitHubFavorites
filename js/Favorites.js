// classe que vai estruturar a lógica dos dados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = [
      {
        login: 'maykbrito',
        name: "Mayk Brito",
        public_repos: '76',
        followers: '120000'
      },
      {
        login: 'diego3g',
        name: "Diego Fernandes",
        public_repos: '76',
        followers: '120000'
      }
    ]
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    console.log(filteredEntries)
  }
}

//classe que vai criar aa visualização e eventos html 
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  //Toda vez que mudar um dado vai ser chamado
  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })

  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
       <td class="user">
            <img src="https://github.com/maykbrito.png" alt="imagem de Mayk Brito">
            <a href="https://github.com/maykbrito" target="_blank">
              <p>Mayk Brito</p>
              <span>maykbrito</span>
            </a>
          </td>
          <td class="repositories">
            76
          </td>
          <td class="followers">
            9558
          </td>
          <td>
            <button class="remove">&times;</button>
          </td>
    `

    return tr
  }

  removeAllTr() {

    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}


