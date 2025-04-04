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

    gerenciarLocalStorage(tarefaInputada.value);

    tarefaInputada.value = '';
  }
}

function gerenciarLocalStorage(tarefaASerSalva) {
  const lista = document.getElementById('lista-tarefas');

  const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  if (tarefasSalvas instanceof Array) {
    tarefasSalvas.push(tarefaASerSalva);
  }
  localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

  lista.innerHTML = '';
  tarefasSalvas.forEach((tarefa) => {
    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('principal__lista__item');
    novaTarefa.textContent = tarefa;

    lista.appendChild(novaTarefa);
  });
}

function limpar() {
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
