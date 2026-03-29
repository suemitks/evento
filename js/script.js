//login
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const erro = document.getElementById("mensagemErro");

        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioSalvo) {
            erro.textContent = "Usuário não encontrado!";
            return;
        }

        if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {

            localStorage.setItem("tipoUsuario", usuarioSalvo.tipo);

            if (usuarioSalvo.tipo === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "participante.html";
            }

        } else {
            erro.textContent = "Email ou senha inválidos!";
        }
    });
}

//cadastro
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("emailCadastro").value;
        const senha = document.getElementById("senhaCadastro").value;
        const tipo = document.getElementById("tipoCadastro").value;

        const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));

        // valida antes de salvar
        if (usuarioExistente && usuarioExistente.email === email) {
            const msg = document.getElementById("msgCadastro");
            msg.textContent = "Email já cadastrado!";
            msg.classList.remove("hidden"); // 👈 MOSTRA AQUI
            return;
        }

        const usuario = { nome, email, senha, tipo };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        const msg = document.getElementById("msgCadastro");
        msg.textContent = "Cadastro realizado com sucesso!";
        msg.classList.remove("hidden"); // 👈 MOSTRA AQUI

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        const nome = document.getElementById("nome");
        const email = document.getElementById("email");

        if (nome && email) {
            nome.value = usuario.nome;
            email.value = usuario.email;

            nome.disabled = true;
            email.disabled = true;
        }
    }

});

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const atividade = params.get("atividade");

    if (atividade) {
        const checkboxes = document.querySelectorAll('input[name="atividade"]');

        checkboxes.forEach((checkbox) => {
            if (checkbox.value === atividade) {
                checkbox.checked = true;
            }
        });

        // mostrar mensagem
        const info = document.getElementById("atividadeSelecionada");
        if (info) {
            info.textContent = "Atividade selecionada automaticamente.";
        }
    }

});

// salvar inscrição


