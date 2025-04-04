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

function salvarNaLocalStorage(tarefaASerSalva) {
  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  if (tarefasSalvas instanceof Array) {
    tarefasSalvas.push(tarefaASerSalva);
  }
  localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

  imprimirListaDaLocalStorage(tarefasSalvas);
}

function imprimirListaDaLocalStorage(tarefasASeremImpressas) {
  const lista = document.getElementById('lista-tarefas');
  lista.innerHTML = '';
  tarefasASeremImpressas.forEach((tarefa) => {
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('principal__lista__item');
    novaTarefa.textContent = tarefa;

    lista.appendChild(novaTarefa);
  });
}

function limparListaDeTarefas() {
  const lista = document.getElementById('lista-tarefas');
  if (lista instanceof HTMLElement) {
    lista.innerHTML = '';
  }
  localStorage.removeItem('tarefas');
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
