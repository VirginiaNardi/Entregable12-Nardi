let socket = io()
let chatBox = document.getElementById("chatbox");

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Escribe tu email para ingresar al chat',
    inputValidator: value => {
        return !value.trim() && 'Por favor ingrese su email'
    },
    allowOutsideClick: false
}).then(result => {
    if (result.isConfirmed) {
        user = result.value;
        document.getElementById('user').innerHTML = user;
        let socket = io();
    
        socket.on('messages', messages => {
            const divMessages = document.getElementById('messagesLogs');
            let messagesHTML = '';
            messages.reverse().forEach(message => {
                messagesHTML += `<p><i>${message.user}</i>: ${message.message}</p>`;
            });
            divMessages.innerHTML = messagesHTML;
        });
    
        socket.on('Alerta', () => {
            alert('Un nuevo usuario se ha conectado!');
        });
    
        chatBox.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                if (chatBox.value.trim().length > 0) {
                    socket.emit('message', {
                        user,
                        message: chatBox.value
                    });
                    chatBox.value = '';
                }
            }
        });
    }
})