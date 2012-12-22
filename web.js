var io = require('socket.io').listen(parseInt(process.env.PORT)),
    twitter = require('ntwitter')

io.set("origins", process.env.ALLOWED_ORIGINS)
io.set("log level", 2)
io.sockets.on("connection", function(socket) {
  socket.on("userstream", function(data) {
    var twit = new twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: data.token,
      access_token_secret: data.secret
    });
    twit.stream('user', {}, function(stream) {
      stream.on('data', function(tweet) {
        socket.emit('tweet', tweet)
      })
    })
  })
})
