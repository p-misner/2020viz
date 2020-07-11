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

// createPost({title: "Post Three", body: "body of post 3"})
// 	.then(getPosts)
// 	.catch(err => console.log(err));

//Promise.all

const promise1 = Promise.resolve("Hellow world");
const promise2 = 10;
const promise3 = new Promise((resolve, reject) =>{
	setTimeout(resolve, 2000, 'Goodbye')
});
const promise4 = fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());

//takes as long as the longest promise
Promise.all([promise1, promise2, promise3, promise4]).then((val)=>console.log(val));
