//for callbacks, initially getPosts would not display createPost bc 
//createPost took 2000 ms whihc is longer than 1000 ms of getPosts
//via callbacks, to ensure the order is correct, getPosts is called only 
//after createPost is complete
//looking at all timings, total process time is 3000 ms

const posts = [
	{title: 'Post One', body: 'This is post one'},
	{title: 'Post Two', body: 'This is post 2'}
];

function getPosts(){
	setTimeout(()=>{
		let output = '';
		posts.forEach((post, i) =>{
			output += `<li>${post.title}<li>`
		});
		document.body.innerHTML = output;
	}, 1000)
}

function createPost(post, callback){
	setTimeout(() =>{
		posts.push(post);
		callback()
	}, 2000);

}



createPost({title: "Post 3", body: "body of post 3"}, getPosts);