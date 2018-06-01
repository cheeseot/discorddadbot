//for reddit
require('dotenv').config();
//Discord Consts
// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();
// The token of your bot - https://discordapp.com/developers/applications/me
//const token = OMITTED FOR SAFETY
//end discord consts

//Reddit Consts
// Build Snoowrap and Snoostorm clients
//for reddit
const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const redditclient = new Snoostorm(r);


const streamDadJokesOpts = {
    subreddit: 'dadjokes',
    results: 4
};

const streamDNDJokesOpts = {
    subreddit: 'dmdadjokes',
    results: 4
};

// Create a Snoostorm CommentStream with the specified options
const submitsDad = redditclient.SubmissionStream(streamDadJokesOpts);
const submitsDND = redditclient.SubmissionStream(streamDNDJokesOpts);
//end reddit consts
class Joke
 {
		constructor(title,text){
			this.title = title;
			this.text = text;
		}
}

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

var jokequeue = [];
//var newjoke = new Joke ("What did the buffalo say to his son when he left for work?", "Bison");
jokequeue.push(new Joke ("What did the buffalo say to his son when he left for work?", "Bison"));
//newjoke.title = "My doctor was struggling to write my prescription when I said 'Doctor, that’s a rectal thermometer in your hand!'"
//newjoke.text = "Dammit! Some asshole's got my pen!";
jokequeue.push(new Joke("My doctor was struggling to write my prescription when I said 'Doctor, that’s a rectal thermometer in your hand!'","Dammit! Some asshole's got my pen!"));
// On comment, perform whatever logic you want to do
submitsDad.on('submission', function(post) {
    console.log(post);
	//if (jokequeue === undefined)
		//jokequeue.push(post)
	/*else*/
	//newjoke.title = post.title;
	//newjoke.text = post.selftext;
	if(jokequeue.length < 50)
		jokequeue.push(new Joke(post.title,post.selftext));
	else
	{
		jokset.shift();
		jokequeue.push(new Joke(post.title,post.selftext));
	}
})
jokequeue.push(new Joke("Why all the hatred towards necromancers?", "Can't a guy just raise a family in peace?"));
jokequeue.push(new Joke("Tom the 8 Dex wizard is always giving his party anxiety...","...Because he cantrip at any moment"));
submitsDND.on('submission', function(post) {
    console.log(post);
	//if (jokequeue === undefined)
		//jokequeue.push(post)
	/*else*/
	//newjoke.title = post.title;
	//newjoke.text = post.selftext;
	if(jokequeue.length < 50)
		jokequeue.push(new Joke(post.title,post.selftext));
	else
	{
		jokset.shift();
		jokequeue.push(new Joke(post.title,post.selftext));
	}
})

// Create an event listener for messages
client.on('message', message => {
  // If the message is "hi dad"
  if (message.content.toLowerCase().includes('hi dad')) {
    // Send "hello child unit"
    message.channel.send('Hello Child Unit');
  }
  else if (message.content.toLowerCase() ==='!ping') {
    // Send "pong" to the same channel
    message.channel.send('pong!');
  }
  else if(message.content.match(/I'm .+/))
  {
	  if (message.content.toLowerCase().match(/i'm dad/))
	  {
		  message.channel.send("No, I am dad");
	  }
	else{
	  var name = message.content.match(/I'm .+/).toString();
	  name = name.substring(3);
	  message.channel.send('Hi,' + name +", I am dadbot");
	}
  }
  else if(message.content.toLowerCase() === '!joke')
  {
	  console.log(jokequeue.length);
	var curjoke = jokequeue[Math.floor(Math.random()*Math.floor(jokequeue.length))];
	message.channel.send(curjoke.title);
	setTimeout(function(){message.channel.send(curjoke.text)}, 1000);
	  
  }
});

// Log our bot in
client.login(token);
