    // Abrir ojos y centrar pupilas al hacer click fuera del campo contraseña
    document.addEventListener('mousedown', function(e) {
        var passwordInput = document.getElementById('login-password');
        var ojoIzq = document.getElementById('ojo-izq');
        var pupilaIzq = document.getElementById('pupila-izq');
        var ojoDer = document.getElementById('ojo-der');
        var pupilaDer = document.getElementById('pupila-der');
        var ojosCerrados = document.getElementById('ojos-cerrados');
        if (document.activeElement !== passwordInput && passwordInput.value.length > 0) {
            ojoIzq.style.display = 'inline';
            pupilaIzq.style.display = 'inline';
            ojoDer.style.display = 'inline';
            pupilaDer.style.display = 'inline';
            ojosCerrados.style.display = 'none';
            // Centrar pupilas
            pupilaIzq.setAttribute('cx', 75);
            pupilaIzq.setAttribute('cy', 110);
            pupilaDer.setAttribute('cx', 125);
            pupilaDer.setAttribute('cy', 110);
        }
    });
// ...existing code...
// Utilidades para manejo de usuarios en localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUser(username, password) {
    const users = getUsers();
    // Verifica si el usuario ya existe
    if (users.find(u => u.username === username)) {
        return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function validateUser(username, password) {
    const users = getUsers();
    return users.find(u => u.username === username && u.password === password);
}

function setSession(username) {
    localStorage.setItem('session', username);
}

function getSession() {
    return localStorage.getItem('session');
}

function clearSession() {
    localStorage.removeItem('session');
}

// Manejo de UI
document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const welcomeContainer = document.getElementById('welcome-container');
    const recoverContainer = document.getElementById('recover-container');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const recoverBtn = document.getElementById('recover-btn');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const showRecover = document.getElementById('show-recover');
    const backLogin = document.getElementById('back-login');
    const logoutBtn = document.getElementById('logout-btn');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    const registerSuccess = document.getElementById('register-success');
    const recoverError = document.getElementById('recover-error');
    const recoverSuccess = document.getElementById('recover-success');
    const welcomeUser = document.getElementById('welcome-user');

    function showLoginForm() {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        welcomeContainer.style.display = 'none';
        recoverContainer.style.display = 'none';
        loginError.style.display = 'none';
    }

    function showRegisterForm() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        welcomeContainer.style.display = 'none';
        recoverContainer.style.display = 'none';
        registerError.style.display = 'none';
        registerSuccess.style.display = 'none';
    }

    function showRecoverForm() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        welcomeContainer.style.display = 'none';
        recoverContainer.style.display = 'block';
        recoverError.style.display = 'none';
        recoverSuccess.style.display = 'none';
    }

    function showWelcome(username) {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        welcomeContainer.style.display = 'block';
        recoverContainer.style.display = 'none';
        welcomeUser.textContent = username;
    }

    // Eventos
    showRegister.addEventListener('click', showRegisterForm);
    showLogin.addEventListener('click', showLoginForm);
    showRecover.addEventListener('click', showRecoverForm);
    backLogin.addEventListener('click', showLoginForm);

    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        if (!username || !password) {
            loginError.textContent = 'Por favor, ingresa usuario y contraseña.';
            loginError.style.display = 'block';
            return;
        }
        if (validateUser(username, password)) {
            setSession(username);
            showWelcome(username);
        } else {
            loginError.textContent = 'Usuario o contraseña incorrectos.';
            loginError.style.display = 'block';
        }
    });

    registerBtn.addEventListener('click', () => {
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        if (!username || !password) {
            registerError.textContent = 'Completa todos los campos.';
            registerError.style.display = 'block';
            registerSuccess.style.display = 'none';
            return;
        }
        if (username.length < 3 || password.length < 4) {
            registerError.textContent = 'Usuario mínimo 3 caracteres, contraseña mínimo 4.';
            registerError.style.display = 'block';
            registerSuccess.style.display = 'none';
            return;
        }
        if (saveUser(username, password)) {
            registerError.style.display = 'none';
            registerSuccess.textContent = '¡Usuario registrado! Ahora puedes iniciar sesión.';
            registerSuccess.style.display = 'block';
        } else {
            registerError.textContent = 'El usuario ya existe.';
            registerError.style.display = 'block';
            registerSuccess.style.display = 'none';
        }
    });

    recoverBtn.addEventListener('click', () => {
        const username = document.getElementById('recover-username').value.trim();
        if (!username) {
            recoverError.textContent = 'Ingresa tu usuario.';
            recoverError.style.display = 'block';
            recoverSuccess.style.display = 'none';
            return;
        }
        const users = getUsers();
        const user = users.find(u => u.username === username);
        if (user) {
            recoverError.style.display = 'none';
            recoverSuccess.textContent = `Tu contraseña es: ${user.password}`;
            recoverSuccess.style.display = 'block';
        } else {
            recoverError.textContent = 'Usuario no encontrado.';
            recoverError.style.display = 'block';
            recoverSuccess.style.display = 'none';
        }
    });

    logoutBtn.addEventListener('click', () => {
        clearSession();
        showLoginForm();
    });

    // Mostrar pantalla correcta al cargar
    const sessionUser = getSession();
    if (sessionUser) {
        showWelcome(sessionUser);
    } else {
        showLoginForm();
    }


});
// ...existing code...