function exibirCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total');
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    lista.innerHTML = '<p>O carrinho está vazio.</p>';
    totalSpan.textContent = '';
    document.getElementById('finalizar-compra').style.display = 'none';
    return;
  }

  lista.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;

    const div = document.createElement('div');
    div.className = 'produto carrinho-item';
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)}
        <br><button onclick="removerItem(${index})">Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });

  totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
  document.getElementById('finalizar-compra').style.display = 'inline-block';
}

function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  exibirCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem('carrinho');
  exibirCarrinho();
}

document.addEventListener('DOMContentLoaded', exibirCarrinho);
