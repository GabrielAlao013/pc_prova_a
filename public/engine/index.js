
async function initializeLogin() {
    var email = document.getElementById('emailLogin').value
    var senha = document.getElementById('senhaLogin').value
    try {
        const response = await fetch('./engine/users.json')
        const users = await response.json()
        const userValided = users.find(u =>
            u.email === email
            &&
            u.senha === senha)

        if (userValided) {
            localStorage.setItem("usuarioAtual", JSON.stringify(userValided))
            setTimeout(() => {
                window.location.href = './dashboard.html'
            }, 5000)
        } else {
            alert('Erro ao entrar no GameHub. Verifique seu e-mail e senha.')
        }
    } catch (e) {
        console.error(e)
    }
}

async function storageUsersInfo() {
    const userLoged = JSON.parse(localStorage.getItem('usuarioAtual'))
    console.log(userLoged.extrato)

    if (userLoged.photoUrl != "") {
        document.getElementById("login-img").innerHTML = `<img src="${userLoged.photoUrl}" class="img-fluid rounded-start" alt="${userLoged.email}" width="100%">`
    } else {
        document.getElementById("login-img").innerHTML = `<img src="./assets/logo_gamehub.png" class="img-fluid rounded-start" alt="GameHub" width="100%">`
    }

    let coin = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
    <path d="M11.5 6.5a.5.5 0 0 1 .5.5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0V9h-1a.5.5 0 0 1 0-1h1V7a.5.5 0 0 1 .5-.5"/>
    <path d="M8.5 3A5.5 5.5 0 0 0 3 8.5v.5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-.5A5.5 5.5 0 0 0 8.5 3m-4.5 6a4.5 4.5 0 1 1 9 0v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
    </svg>
    `

    let money = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.13 1.05-.36 1.5H15a1 1 0 0 1 1 1v1a4 4 0 0 1-3.5 3.97A4.5 4.5 0 0 1 9 11.95V14h2.5a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1H7v-2.05a4.5 4.5 0 0 1-3.5-3.98A4 4 0 0 1 0 4V3a1 1 0 0 1 1-1h1.86A3.5 3.5 0 0 1 2.5.5M1 3v1a3 3 0 0 0 2.54 2.96V3zm14 0h-2.54v3.96A3 3 0 0 0 15 4z"/>
    </svg>
    `

    let extrato = `<ol class="list-group list-group-numbered">`

    document.getElementById("login-name").innerText = userLoged.name
    document.getElementById("login-email").innerText = userLoged.email
    document.getElementById("login-date").innerText = new Date().toLocaleDateString('pt-BR')

    for (let i = 0; i < userLoged.extrato.length; i++) {
    extrato += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${userLoged.extrato[i].valor < 0 ? money : coin} | ${userLoged.extrato[i].descricao}</div>
            [${userLoged.extrato[i].data}]
            </div>
            <span class="badge text-bg-primary rounded-pill">${userLoged.extrato[i].valor} XP</span>
        </li>`
    }

    extrato += `</ol>`

    let pontos = `
    <div class="badge text-bg-success text-wrap" style="width: 10rem;" style="margin-right: 10px;">
    XP: ${userLoged.pontos}
    </div>
    `

    let saldo = `
    <div class="badge text-bg-info text-wrap" style="width: 10rem;" style="margin-right: 10px;">
    Moedas: ${userLoged.saldo}
    </div>
    `

    document.getElementById("login-extrato").innerHTML = extrato
    document.getElementById("login-menu").innerHTML = extrato
    document.getElementById("conta").innerHTML = pontos + saldo
}
