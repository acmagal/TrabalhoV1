const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const vModelo = document.querySelector('#modelo')
const vMarca = document.querySelector('#marca')
const vTipo = document.querySelector('#tipo')
const vQuantidade = document.querySelector('#quantidade')

const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function abrirModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    vModelo.value = itens[index].modelo
    vMarca.value = itens[index].marca
    vTipo.value = itens[index].tipo
    vQuantidade.value = itens[index].quantidade
    
    id = index
  } else {
    vModelo.value = ''
    vMarca.value = ''
    vTipo.value = ''
    vQuantidade.value = ''
    
  }
  
}

function editarItem(index) {

  abrirModal(true, index)
}

function deletarItem(index) {
  itens.splice(index, 1)
  inserirItensBD()
  carregarItens()
}

function inserirItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.modelo}</td>
    <td>${item.marca}</td>
    <td>${item.tipo}</td>
    <td>${item.quantidade}Aparelhos </td>
    
    <td class="acao">
      <button onclick="editarItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deletarItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (vModelo.value == '' || vMarca.value == '' || vTipo.value == '' || vQuantidade.value == ''){
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].modelo = vModelo.value
    itens[id].marca = vMarca.value
    itens[id].tipo = vTipo.value
    itens[id].quantidade = vQuantidade.value
    
  } else {
    itens.push({'modelo': vModelo.value, 'marca': vMarca.value,'tipo': vTipo.value, 'quantidade': vQuantidade.value, })
  }

  inserirItensBD()

  modal.classList.remove('active')
  carregarItens()
  id = undefined
}

function carregarItens() {
  itens = pegarItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    inserirItem(item, index)
  })

}

const pegarItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const inserirItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

carregarItens()
