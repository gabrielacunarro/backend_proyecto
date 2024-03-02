fetch("/api/sessions/", { method: "POST" })
    .then((res) => res.json())
    .then((res) => {
        console.log("Respuesta del servidor:", res); // Para verificar la estructura completa de la respuesta
        if (res.statusCode === 200) {
            const session = res.session;
            if (session) {
                const role = session.role;
                console.log("Rol del usuario:", role);
                // Aquí puedes usar el rol para realizar las acciones necesarias, como eliminar botones según el rol
            } else {
                console.log("La propiedad 'session' está ausente en la respuesta.");
            }
        } else {
            console.log("Se recibió un estado de respuesta diferente a 200.");
        }
    })
    .catch((error) => {
        console.error("Ocurrió un error al procesar la respuesta:", error);
    });

