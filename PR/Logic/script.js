document.addEventListener("DOMContentLoaded", () => {
    // Obtiene los elementos clave del DOM
    const loginForm = document.getElementById("loginForm");
    const message = document.getElementById("message");
    const loginContainer = document.getElementById("login-container");
    const app = document.getElementById("app");
    const logoutButton = document.getElementById("logout");
    const sections = document.querySelectorAll(".section");
    const navButtons = document.querySelectorAll(".navbar button[data-target]");

    // Oculta la aplicación y las secciones al cargar la página
    app.classList.add("hidden");
    sections.forEach(section => section.classList.add("hidden"));
    document.getElementById("dashboard").classList.remove("hidden"); // Muestra el dashboard por defecto

    // Agrega eventos a los botones de navegación
    navButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const targetId = e.target.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Oculta todas las secciones y muestra la seleccionada
                sections.forEach(sec => sec.classList.add("hidden"));
                targetSection.classList.remove("hidden");

                // Desplaza suavemente a la sección seleccionada
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

                // Resalta el botón activo
                navButtons.forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");
            }
        });
    });

    // Maneja el formulario de inicio de sesión
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        if (username === "admin" && password === "12345") {
            loginContainer.classList.add("hidden");
            app.classList.remove("hidden");
            app.style.animation = "fadeInApp 0.6s ease-out forwards";
    
            // Verificar si el tema seleccionado es "air-theme"
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "air-theme") {
                document.body.style.animation = "backgroundAnimationRespiration 10s infinite alternate ease-in-out";
            } else {
                document.body.style.animation = "backgroundAnimationApp 10s infinite alternate ease-in-out";
            }
        } else {
            message.style.color = "red";
            message.textContent = "Invalid username or password.";
        }
    });
    

    // Maneja el cierre de sesión
    logoutButton.addEventListener("click", () => {
        app.classList.add("hidden");
        loginContainer.classList.remove("hidden");
        message.textContent = "";
        loginForm.reset();
    
        // Verificar si el tema seleccionado es "air-theme"
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "air-theme") {
            document.body.style.animation = "backgroundAnimationRespiration 10s infinite alternate ease-in-out";
        } else {
            document.body.style.animation = "backgroundAnimationLogin 5s infinite alternate ease-in-out";
        }
    });

    // Función para validar texto (solo letras y espacios)
    function validateTextInput(input) {
        return /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(input);
    }

    // Función para validar números (solo positivos)
    function validateNumberInput(input) {
        return /^[0-9]+$/.test(input) && parseInt(input) >= 0;
    }

    // Función para validar que las contraseñas coincidan
    function validatePasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }

    // Agrega validación a todos los formularios de la página
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let valid = true;
            const inputs = form.querySelectorAll("input");

            // Valida cada campo de entrada
            inputs.forEach(input => {
                if (input.type === "text" && !validateTextInput(input.value)) {
                    alert("El campo '" + input.placeholder + "' solo debe contener letras.");
                    valid = false;
                }
                if (input.type === "number" && !validateNumberInput(input.value)) {
                    alert("El campo '" + input.placeholder + "' solo debe contener números positivos.");
                    valid = false;
                }
            });

            // Valida contraseñas en formularios que las tengan
            if (form.querySelector("input[type='password']")) {
                const password = form.querySelector("input[placeholder='Nueva Contraseña']").value;
                const confirmPassword = form.querySelector("input[placeholder='Confirmar Contraseña']").value;
                if (!validatePasswordsMatch(password, confirmPassword)) {
                    alert("Las contraseñas no coinciden.");
                    valid = false;
                }
            }

            // Si todo está validado, envía el formulario
            if (valid) {
                alert("Formulario enviado con éxito.");
                form.submit();
            }
        });
    });
});

// Manejo del formulario de recuperación de contraseña
document.addEventListener("DOMContentLoaded", () => {
    const loginContainer = document.getElementById("login-container");
    const recoverContainer = document.getElementById("recover-container");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const backToLoginLink = document.getElementById("back-to-login");

    // Muestra el formulario de recuperación de contraseña
    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.classList.add("hidden");
        recoverContainer.classList.remove("hidden");
    });

    // Regresa al formulario de inicio de sesión
    backToLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        recoverContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
    });
});

// Manejo del selector de temas
document.addEventListener("DOMContentLoaded", () => {
    const themeBoxes = document.querySelectorAll(".theme-box");
    const body = document.body;

    // Recuperar el tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
    }

    // Manejo del cambio de tema
    themeBoxes.forEach(box => {
        box.addEventListener("click", () => {
            document.body.classList.remove("light-theme", "dark-theme", "air-theme");
            const selectedTheme = box.getAttribute("data-theme");
            const themeClass = `${selectedTheme}-theme`;
            document.body.classList.add(themeClass);
            localStorage.setItem("theme", selectedTheme);
    
            // Forzar la actualización de la animación
            if (selectedTheme === "air") {
                document.body.style.animation = "none";
                setTimeout(() => {
                    document.body.style.animation = "backgroundAnimationRespiration 10s infinite alternate ease-in-out";
                }, 50);
            } else {
                document.body.style.animation = "none"; // Eliminar animaciones anteriores
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        console.log("Cargando tema:", savedTheme);
        document.body.classList.remove("light-theme", "dark-theme", "air-theme");
        document.body.classList.add(`${savedTheme}-theme`);

        if (savedTheme === "air") {
            setTimeout(() => {
                document.body.style.animation = "backgroundAnimationRespiration 10s infinite alternate ease-in-out";
            }, 50);
        }
    }
});

// Al cargar la página, aplica el tema guardado en localStorage
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado");

    const themeBoxes = document.querySelectorAll(".theme-box");
    const body = document.body;

    // Recupera el tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        console.log("Cargando tema:", savedTheme);
        body.classList.remove("light-theme", "dark-theme", "air-theme");
        body.classList.add(savedTheme);

        // Si el tema guardado es "air-theme", aplica la animación específica
        if (savedTheme === "air-theme") {
            body.style.animation = "backgroundAnimationRespiration 5s infinite alternate ease-in-out";
        }
    }

    // Asigna eventos a los botones de selección de tema
    themeBoxes.forEach(box => {
        box.addEventListener("click", () => {
            body.classList.remove("light-theme", "dark-theme", "air-theme"); // Elimina temas anteriores
            const selectedTheme = box.getAttribute("data-theme");
            const themeClass = `${selectedTheme}-theme`;
            body.classList.add(themeClass);
            console.log("Tema seleccionado:", themeClass);
            localStorage.setItem("theme", themeClass);

            // Si el tema seleccionado es "air-theme", aplica la animación específica
            if (themeClass === "air-theme") {
                body.style.animation = "backgroundAnimationRespiration 10s infinite alternate ease-in-out !important";
            } else {
                body.style.animation = "none";
            }
            
        });
    });
});


