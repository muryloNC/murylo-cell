// Função responsável por exibir os itens do carrinho na página
function exibirCarrinho() {
  // Obtém os elementos do DOM onde os produtos e o total serão exibidos
  const lista = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total');

  // Recupera o carrinho do localStorage ou define como array vazio se não existir
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o carrinho está vazio
  if (carrinho.length === 0) {
    lista.innerHTML = '<p>O carrinho está vazio.</p>'; // Mensagem de carrinho vazio
    totalSpan.textContent = ''; // Zera o valor total
    document.getElementById('finalizar-compra').style.display = 'none'; // Esconde botão de finalizar compra
    return;
  }

  // Se o carrinho tiver itens, limpa a lista e inicia o cálculo do total
  lista.innerHTML = '';
  let total = 0;

  // Itera sobre cada item do carrinho
  carrinho.forEach((item, index) => {
    total += item.preco; // Soma o preço do item ao total

    // Cria um elemento div para representar o item no carrinho
    const div = document.createElement('div');
    div.className = 'produto carrinho-item'; // Usa classes CSS para estilização

    // Insere o conteúdo HTML com imagem, nome, preço e botão de remover
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div>
        <strong>${item.nome}</strong><br>
        R$ ${item.preco.toFixed(2)}
        <br><button onclick="removerItem(${index})">Remover</button>
      </div>
    `;

    // Adiciona a div à lista do carrinho
    lista.appendChild(div);
  });

  // Exibe o total calculado no rodapé do carrinho
  totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
  document.getElementById('finalizar-compra').style.display = 'inline-block'; // Mostra botão de finalizar compra
}

// Função para remover um item específico do carrinho
function removerItem(index) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1); // Remove o item do índice especificado
  localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage
  exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para limpar todos os itens do carrinho
function limparCarrinho() {
  localStorage.removeItem('carrinho'); // Remove completamente o carrinho do localStorage
  exibirCarrinho(); // Atualiza a visualização
}

// Chama a função exibirCarrinho assim que o DOM for carregado
document.addEventListener('DOMContentLoaded', exibirCarrinho);
