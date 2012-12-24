var io = require('socket.io').listen(parseInt(process.env.PORT)),
    twitter = require('ntwitter')

io.set("origins", process.env.ALLOWED_ORIGINS)
io.set("log level", 2)
io.sockets.on("connection", function(socket) {
  var tweetStream;
  socket.on("userstream", function(data) {
    var twitterClient = new twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: data.token,
      access_token_secret: data.secret
    });
    twitterClient.stream('user', {}, function(_tweetStream) {
      tweetStream = _tweetStream
      tweetStream.on('data', function(tweet) {
        socket.emit('tweet', tweet)
      })

      // if twitter or network failure happens, just
      // kill the and let the client manage retries
      tweetStream.on("end", function() {
        socket.disconnect()
      })
      tweetStream.on("destroy", function() {
        socket.disconnect()
      })
      tweetStream.on("error", function() {
        socket.disconnect()
      })
    })
  })
  socket.on("disconnect", function() {
    if (tweetStream) {
      tweetStream.destroy()
    }
  })
})
