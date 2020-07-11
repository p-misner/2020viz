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

function createPost(post){
	return new Promise((resolve, reject) => {
	setTimeout(() =>{
			posts.push(post);
			const error = false;

			if(!error){
				resolve();
			} else {
				reject('Error: Something went wrong');
			}
		}, 2000);
	});
}

//Async/ Await here

// async function init(){
// 	await createPost({title: "Post Three", body: "body of post 3"});
// 	getPosts();
// }

//Async Await with fetch
async function  fetchUsers(){
	const res = await fetch('http://jsonplaceholder.typicode.com/users');
	const data = await res.json();
	console.log(data);
}

fetchUsers();