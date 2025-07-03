document.addEventListener('DOMContentLoaded', () => {
  // Validação do formulário
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const nome = document.querySelector('#nome').value.trim();
      const email = document.querySelector('#email').value.trim();
      const mensagem = document.querySelector('#mensagem').value.trim();

      if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        e.preventDefault();
      }
    });
  }

  // Hover efeito
  const produtos = document.querySelectorAll('.produto');
  produtos.forEach(produto => {
    produto.addEventListener('mouseover', () => {
      produto.style.transform = 'scale(1.05)';
    });
    produto.addEventListener('mouseout', () => {
      produto.style.transform = 'scale(1)';
    });
  });

  // Menu fixo
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.backgroundColor = window.scrollY > 50 ? '#111' : '#333';
  });

  // Adicionar ao carrinho
  const botoes = document.querySelectorAll('.btn-carrinho');
  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.dataset.nome;
      const preco = parseFloat(btn.dataset.preco);
      const imagem = btn.dataset.imagem || 'img/default.jpg'; // garante que tenha uma imagem
      const produto = { nome, preco, imagem };


      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      alert(`"${nome}" adicionado ao carrinho!`);
    });
  });
});
