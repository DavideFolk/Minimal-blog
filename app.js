//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const homeStartingContent =
	'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
	'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent =
	'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

let posts = [
	{
		title: 'Post 1',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		title: 'Post 2',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non sodales neque sodales ut. Sit amet purus gravida quis blandit turpis cursus in hac. Donec massa sapien faucibus et molestie ac feugiat sed lectus. Amet aliquam id diam maecenas. Magna sit amet purus gravida quis blandit turpis. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Massa enim nec dui nunc mattis enim ut tellus elementum. Aliquam purus sit amet luctus venenatis. Sit amet cursus sit amet dictum sit amet justo. Euismod lacinia at quis risus sed vulputate odio ut. Nisl rhoncus mattis rhoncus urna neque viverra justo nec. Quam nulla porttitor massa id neque aliquam. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est. Tortor at risus viverra adipiscing at in tellus integer. Vel quam elementum pulvinar etiam non quam lacus suspendisse faucibus. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus.',
	},
	{
		title: 'Post 3',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus. Consequat interdum varius sit amet mattis vulputate. Nunc eget lorem dolor sed viverra ipsum. Posuere sollicitudin aliquam ultrices sagittis orci a. Viverra adipiscing at in tellus integer feugiat. Egestas dui id ornare arcu odio ut. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. At tellus at urna condimentum mattis pellentesque id nibh. Scelerisque eu ultrices vitae auctor.',
	},
];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home', { startingText: homeStartingContent, posts: posts });
});

app.get('/about', (req, res) => {
	res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', (req, res) => {
	res.render('contact', { contactContent: contactContent });
});

app.get('/compose', (req, res) => {
	res.render('compose');
});

app.get('/posts/:postName', (req, res) => {
	let requestedTitle = _.lowerCase(req.params.postName);
	posts.forEach((elem) => {
		let elemTitle = _.lowerCase(elem.title);
		if (elemTitle === requestedTitle) {
			res.render('post', {
				title: elem.title,
				elemBody: elem.content,
				posts: posts,
			});
		}
	});
});

app.post('/compose', (req, res) => {
	const post = {
		title: req.body.postTitle,
		content: req.body.postBody,
	};
	posts.push(post);
	res.redirect('/');
});

app.listen(3000, function () {
	console.log('Server started on port 3000');
});
