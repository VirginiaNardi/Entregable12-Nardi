document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("register-button");
    registerButton.addEventListener("click", async () => {
      const firstName = document.getElementById("first_name").value;
      const lastName = document.getElementById("last_name").value;
      const email = document.getElementById("email").value;
      const age = document.getElementById("age").value;
      const password = document.getElementById("password").value;
  
      const data = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        age: age,
        password: password,
      };
  
      try {
        const response = await fetch("/api/sessions/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log(result);
  
        if (response.ok) {
          // Registro exitoso, mostrar alerta y redireccionar a la vista de inicio de sesión
          alert("Registro exitoso");
          window.location.href = "/login";
        } else {
          // Si ocurrió algún error en el registro, muestra el mensaje de error del servidor
          alert(result.error);
        }
      } catch (error) {
        console.error("Error al enviar la solicitud: ", error.message);
      }
    });
  });