document.addEventListener('DOMContentLoaded', () => {

  // ============ MENSAGEM SUCESSO (HTML deve ter <div id="mensagem-sucesso">) ============
  function mostrarMensagem(texto = "Produto adicionado ao carrinho!") {
    let msg = document.getElementById("mensagem-sucesso");

    // Cria o elemento se ainda não existir
    if (!msg) {
      msg = document.createElement("div");
      msg.id = "mensagem-sucesso";
      msg.className = "mensagem-sucesso";
      document.body.appendChild(msg);
    }

    msg.textContent = texto;
    msg.style.display = "block";
    msg.classList.remove("fade-out");

    setTimeout(() => {
      msg.style.display = "none";
    }, 3000);
  }

// Validação do formulário de contato
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    const nome = document.querySelector('#nome').value.trim();
    const email = document.querySelector('#email').value.trim();
    const mensagem = document.querySelector('#mensagem').value.trim();
    const erroEmail = document.getElementById('erro-email');

    let valido = true;

    // Limpa mensagens anteriores
    erroEmail.textContent = "";

    // Validação de campos obrigatórios
    if (!nome || !email || !mensagem) {
      e.preventDefault();
      mostrarMensagem("Por favor, preencha todos os campos.");
      valido = false;
    }

    // Validação de e-mail com regex
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailValido.test(email)) {
      e.preventDefault();
      erroEmail.textContent = "Por favor, insira um e-mail válido.";
      valido = false;
    }

    // Se estiver tudo certo, mostra mensagem e reseta o form
    if (valido) {
      e.preventDefault(); // tira se tiver back-end
      mostrarMensagem("Mensagem enviada com sucesso!");
      form.reset();
    }
  });
}


  // ============ Hover nos produtos ============
  const produtos = document.querySelectorAll('.produto');
  produtos.forEach(produto => {
    produto.addEventListener('mouseover', () => {
      produto.style.transform = 'scale(1.05)';
    });
    produto.addEventListener('mouseout', () => {
      produto.style.transform = 'scale(1)';
    });
  });

  // ============ Menu fixo com cor dinâmica ============
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    header.style.backgroundColor = window.scrollY > 50 ? '#7e0200' : '#7e0200'; // mantém vermelho
  });

  // ============ Adicionar ao carrinho ============
  const botoes = document.querySelectorAll('.btn-carrinho');
  botoes.forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.dataset.nome;
      const preco = parseFloat(btn.dataset.preco);
      const imagem = btn.dataset.imagem || 'img/default.jpg';

      const produto = { nome, preco, imagem };
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      mostrarMensagem(); // ✅ Mensagem de sucesso ao adicionar produto
    });
  });

});

