# twitter-stream-proxy

A simply utility for proxying the Twitter Streaming API for multiple access tokens.

### Requirements

A registered Twitter app, and the CONSUMER_KEY and CONSUMER_SECRET
environment variables properly set. Because you'll need to set those variables,
run this only on a trusted server.

Set the ALLOWED_ORIGINS environment variable. This determines what hosts can
connect to your proxy server. For local development,
you might set a value of `localhost:*`. When you deploy, make sure
to include the correct value in your environment.

The client making the socket connection must provide a valid
OAuth access token and OAuth access token secret, created by the Twitter app
you've specified in the environment.

The result: the access token and secret are combined with the app-level credentials
to create the correct signature.

### Usage

Deploy to any node.js hosting environment of your choice. Make sure to
set the environment variables in that environment. Point your clients to the hosted URL.

### Possible uses

The Twitter streaming API can't be accessed directly in the browser (AFAIK). A proxy server
is needed, and often times a streaming API developer's application server doubles as the proxy server.

For apps without a server, this doesn't work. Such apps may authenticate purely in the browser using
services like Firebase paired with Singly. The browser session then has the Twitter tokens or, in the
Singly case, can look up the Twitter tokens using the Singly token.

Once the Twitter per-user OAuth token & secret are known, the browser can send them to a
trusted server w/ the app credentials, and the server will have the requisitie data to
form a signature and connect to the API.

### Caveats

This probably isn't for production usage. I'm using it in a fun side project.
If you plan to use it in production, there are probably terms of service and
security issues that you'll want to think through first. And you'd definitely
want to use SSL for the socket connection since you're passing tokens.

### License

See license file.
