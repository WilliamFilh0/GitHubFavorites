import { GithubUser } from "./GithubUser.js"

// classe que vai estruturar a lógica dos dados
//como os dados vão ser estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

   
  }

  load() {
     this.entries = JSON.parse(localStorage.getItem("@github-favorites")) || []
  }

  //Salvar a aplicação no Local Storage e transformando em String em formato de JSON
  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries))
  }

  

  //Estou avisando que é uma função assíncrona 
  async add(username) {
    try {

      //Se ele retornar verdaadeiro ele pega e vai retorenar o objeto
      const userExists = this.entries.find(entry => entry.login === username)

      console.log(userExists)

      if (userExists) {
        throw new error('Usuário ja cadastrado')
      }

      //O wait é espere 
      const user = await GithubUser.search(username)

      if (user.login === undefined) {
        throw new Error('Usuário não encontrado! ')
      }

      //Em um novo array(imutabilidade) vai colocar um novo usuário que vai ficar no topo 
      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch (error) {
      alert(error.message)
    }
  }

  // remove o usuário da lista
  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

//classe que vai criar aa visualização e eventos html 
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.onadd()
    this.update()
  }

  //Pega o user do input
  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    }
  }



  //Toda vez que mudar um dado vai ser chamado
  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
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


