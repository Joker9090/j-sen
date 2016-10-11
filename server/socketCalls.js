
module.exports = {
  getCalls: function(io){
    console.slog("Reading socketIo calls")

    io.on('connection', function(socket) {
      socket.emit('/start');
    });

  }
}
