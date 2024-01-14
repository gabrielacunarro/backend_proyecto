const socket = io()

socket.on("welcome", message => alert(message))