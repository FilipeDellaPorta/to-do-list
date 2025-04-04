function adicionar() {
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
    const lista = document.getElementById('lista-tarefas');

    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('principal__lista__item');
    novaTarefa.textContent = tarefaInputada.value;

    lista.appendChild(novaTarefa);
    tarefaInputada.value = '';
  }
}

function limpar() {
  const lista = document.getElementById('lista-tarefas');
  if (lista instanceof HTMLElement) {
    lista.innerHTML = '';
  }
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
