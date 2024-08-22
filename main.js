let carrinho = [] 

function adicionarProduto(nome, preco, imagem) { /* FUNÇÃO (BOTÃO) ADICIONAR PRODUTOS AO CARRINHO */
  carrinho.push({ nome, preco, imagem }) 
  atualizarCarrinho() 
}

function removerProduto(index) {  /* FUNÇÃO (BOTÃO) REMOVER PRODUTOS DO CARRINHO */
  carrinho.splice(index, 1) 
  atualizarCarrinho() 
}

function atualizarCarrinho() {  /* FUNÇÃO (BOTÃO) ATUALIZAR CONTEÚDO DO CARRINHO */
  const listaCarrinho = document.getElementById("lista-carrinho")
  listaCarrinho.innerHTML = ""


  carrinho.forEach((produto, index) => {  /* MOSTRA A LISTA DE PRODUTOS NO CARRINHO PELOS IDS DOS PRODUTOS */
    const li = document.createElement("li") 
    li.innerHTML = `
      <img src="${produto.imagem}">
      <span>${produto.nome}</span>
      <span>R$ ${produto.preco}</span>
      <button onclick="removerProduto(${index})">Remover</button>
    `

    listaCarrinho.appendChild(li)  /* PERCORRE O ARRAY COM OS PRODUTOS DO CARRINHO */
  })

  const carrinhoContainer = document.getElementById("carrinho") /* CRIA UMA VARÍAVEL PARA INSERIR O ARRAY COM PRODUTOS */
  const totalCarrinho = document.getElementById("total-carrinho")  /* CRIA UMA VARIAVEL PARA INSERIR O VALOR TOTAL DO CARRINHO */
  

  const total = carrinho.reduce((total, produto) => total + produto.preco, 0)


  if(total > 1000.00){   /* CRIA UMA CONDIÇÃO ESPECÍFICA PARA CONCEDER DESCONTO AO VALOR TOTAL DA COMPRA */
    totalPago = total - (total * .05)
    

    totalCarrinho.innerText = totalPago.toFixed(2); 
  }else{

    totalCarrinho.innerText = total.toFixed(2); 
    
  }


  const carrinhoDiv = document.getElementById('carrinho')   /* BLOQUEIA A VISUALIZAÇÃO DO CARRINHO SE ELE ESTIVER VAZIO */
  if(carrinho.length > 0){
    carrinhoDiv.style.display = 'block' 
  }else{
    carrinhoDiv.style.display = 'none'  /* MOSTRA O CARRINHO SE CONTER ALGUM PRODUTO INSERIDO NELE */
  }
}

(function(){   /* CRIA UMA FUNÇAO (BOTÃO) PARA REALIZAR O PAGAMENTO PELO PAY PAL */
  paypal.Buttons({
  
  createOrder: function(data, actions){  /* CRIA UMA ORDEM DE PAGAMENTO PELO PAY PAL */
  
  return actions.order.create({
  purchase_units: [{
    amount:{
      currency_code: 'BRL',
      
      value: carrinho.reduce((total, produto) => total + produto.preco, 0)
    }
  }]

  });

  },
    
  onApprove: function(data, actions){  /* SE APROVADO O PAGAMENTO, ESTE SERÁ REALIZADO */
    return actions.order.capture().then(function(details){
    console.log('pagamento realizado com sucesso');
    console.log(details);
    carrinho = [];
    atualizarCarrinho();
    })
  },

  onError: function(err){  /* SE NÃO FOR APROVADO EMITE UMA MENSAGEM DE ERRO NO PAGAMENTO */
    console.error('Ocorreu um erro durante o pagamento', err);
  }

  }).render('#paypal-button-container') // RENDERIZAR O BOTÃO PAYPAL



})(); //EXECUTA A FUNÇÃO AUTOEXECUTÁVEL