function adicionarTarefa() {
  const tarefaInputada = document.getElementById('nova-tarefa');

  if (tarefaInputada instanceof HTMLInputElement) {
    if (tarefaInputada.value === '') {
      mostrarErro('Tarefa sem título!');
      return;
    }
    if (tarefaInputada.value.length > 50) {
      mostrarErro('A tarefa deve ter no máximo 50 caracteres.');
      return;
    }

    salvarNaLocalStorage(tarefaInputada.value);

    tarefaInputada.value = '';
  }
}

function imprimirListaDaLocalStorage(tarefasASeremImpressas) {
  const lista = limparListaDaTela();
  tarefasASeremImpressas.forEach((tarefa, index) => {
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('principal__lista__item');
    novaTarefa.textContent = tarefa;

    lista.appendChild(novaTarefa);

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('botao-editar');
    botaoEditar.textContent = '✏️';
    botaoEditar.setAttribute('aria-label', 'Editar tarefa');
    novaTarefa.appendChild(botaoEditar);

    const botaoDeletar = document.createElement('button');
    botaoDeletar.classList.add('botao-deletar');
    botaoDeletar.textContent = '🗑️';
    botaoDeletar.setAttribute('aria-label', 'Deletar tarefa');
    novaTarefa.appendChild(botaoDeletar);

    botaoDeletar.addEventListener('click', () => {
      deletarTarefaDaLocalStorage(index);
    });
  });
}

function obterTarefas() {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  if (!(tarefasSalvas instanceof Array)) {
    return;
  }
  return tarefasSalvas;
}

function salvarNaLocalStorage(tarefaASerSalva) {
  const tarefas = obterTarefas();
  tarefas.push(tarefaASerSalva);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  imprimirListaDaLocalStorage(tarefas);
}

function deletarTarefaDaLocalStorage(index) {
  const tarefas = obterTarefas();
  tarefas.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  imprimirListaDaLocalStorage(tarefas);
}

function limparListaDeTarefas() {
  limparListaDaTela();
  localStorage.removeItem('tarefas');
}

function limparListaDaTela() {
  const lista = document.getElementById('lista-tarefas');
  if (!(lista instanceof HTMLElement)) {
    return;
  }
  lista.innerHTML = '';
  return lista;
}

function mostrarErro(mensagem) {
  const erroDiv = document.getElementById('erro-tarefa');
  erroDiv.textContent = mensagem;
  erroDiv.style.display = 'block';
  erroDiv.classList.remove('fade');

  setTimeout(() => {
    erroDiv.classList.add('fade');
    setTimeout(() => {
      erroDiv.textContent = '';
      erroDiv.classList.remove('fade');
      erroDiv.style.display = 'none';
    }, 500);
  }, 1500);
}

window.onload = () => {
  try {
    const tarefas = obterTarefas();
    imprimirListaDaLocalStorage(tarefas);
  } catch (error) {
    console.error('Erro ao recuperar tarefas:', error);
    localStorage.removeItem('tarefas');
  }
};
