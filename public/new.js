
const socketNew = io()

socket.emit("new product", {
    title: "Dior Shine",
    photo: "https://i.imgur.com/9lKtAUf.png",
    price: 50000,
    stock: 100
})

socket.on("new success", (message) => alert(message))