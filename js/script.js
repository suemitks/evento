document.addEventListener("DOMContentLoaded", () => {

    /* MENU HAMBURGUER */
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".navbar ul");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");

            const isOpen = hamburger.classList.contains("active");
            hamburger.setAttribute("aria-expanded", isOpen);
        });

        // Fechar menu ao clicar em link
        const links = document.querySelectorAll(".navbar ul");
        links.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
                hamburger.setAttribute("aria-expanded", false);
            });
        });
    }


    /* CADASTRO */
    const formCadastro = document.getElementById("formCadastro");

    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();

            const nome = document.getElementById("nomeCadastro").value;
            const email = document.getElementById("emailCadastro").value;
            const senha = document.getElementById("senhaCadastro").value;
            const tipo = document.getElementById("tipoCadastro").value;
            const msg = document.getElementById("msgCadastro");

            const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));

            if (usuarioExistente && usuarioExistente.email === email) {
                msg.textContent = "Email já cadastrado!";
                msg.style.color = "red";
                return;
            }

            const usuario = { nome, email, senha, tipo };
            localStorage.setItem("usuario", JSON.stringify(usuario));

            msg.textContent = "Cadastro realizado com sucesso!";
            msg.style.color = "green";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }


    /* LOGIN */
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;
            const msgErro = document.getElementById("mensagemErro");

            const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

            if (!usuarioSalvo) {
                msgErro.textContent = "Usuário não encontrado!";
                return;
            }

            if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {

                localStorage.setItem("tipoUsuario", usuarioSalvo.tipo);
                localStorage.setItem("nomeUsuario", usuarioSalvo.nome);

                if (usuarioSalvo.tipo === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "participante.html";
                }

            } else {
                msgErro.textContent = "Email ou senha inválidos!";
            }
        });
    }


    /* PROTEÇÃO DE PÁGINA PARTICIPANTE */
    const paginaParticipante = document.querySelector(".participante");

    if (paginaParticipante) {
        const tipo = localStorage.getItem("tipoUsuario");

        if (tipo !== "participante") {
            window.location.href = "login.html";
        }

        const nome = localStorage.getItem("nomeUsuario");
        const nomeExibicao = document.getElementById("nome-exibicao");

        if (nomeExibicao && nome) {
            nomeExibicao.textContent = nome;
        }
    }


    /* LOGOUT */
    const btnLogout = document.getElementById("btn-logout");
    const logoutItem = document.getElementById("logout-item");

    const tipoUsuario = localStorage.getItem("tipoUsuario");

    if (tipoUsuario && logoutItem) {
        logoutItem.hidden = false;
    }

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("tipoUsuario");
            localStorage.removeItem("nomeUsuario");

            window.location.href = "index.html";
        });
    }


    /* INSCRIÇÃO (PEGA ATIVIDADE DA URL) */
    const atividadeInfo = document.getElementById("atividadeSelecionada");

    if (atividadeInfo) {
        const params = new URLSearchParams(window.location.search);
        const atividade = params.get("atividade");

        if (atividade) {
            atividadeInfo.classList.remove("hidden");
            atividadeInfo.textContent = "Atividade selecionada: " + atividade;
        }
    }


    /* PREENCHER DADOS AUTOMÁTICOS */
    const inputNome = document.getElementById("nome");
    const inputEmail = document.getElementById("email");

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioSalvo) {
        if (inputNome) inputNome.value = usuarioSalvo.nome;
        if (inputEmail) inputEmail.value = usuarioSalvo.email;
    }


    /* CONFIRMAÇÃO INSCRIÇÃO */
    const formInscricao = document.getElementById("formInscricao");

    if (formInscricao) {
        formInscricao.addEventListener("submit", (e) => {
            e.preventDefault();

            const msg = document.getElementById("msgInscricao");

            msg.textContent = "Inscrição realizada com sucesso!";
            msg.style.color = "green";
        });
    }

});