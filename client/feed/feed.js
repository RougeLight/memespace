document.addEventListener('DOMContentLoaded', ()=>{
    getAllPosts();
    const newPostSubmit = document.querySelector('#submitPost')
    newPostSubmit.addEventListener('click', getNewPostInfo);

    let myFeed = document.getElementById("feedContent");
    myFeed.addEventListener("click", (event)=> {
        let id = event.target.parentNode.id;
        console.log(id)
        if(event.target.src) {
            console.log(id)
            postLike(id)
        }
        console.log(event.target)
    })
})

//get all posts function for the feed once user page is loaded
const getAllPosts = async () => {
    console.log('page has loaded');
    let postsURL = `http://localhost:8080/posts/all` 
    try{
      let postsArr =  await axios.get(postsURL).then((response)=> {return response.data.payload});
    //   console.log(postsArr)
      createCard(postsArr);
    } catch (error){
        console.log(error)
    }
    
}

//displays the card on the site
const displayCard = (un,url,cap,id) => { 
    const feedDiv = document.querySelector('#feedContent')
    
    const postDiv = document.createElement('div');
    postDiv.id = id;
    postDiv.setAttribute('class', 'post');
    const usernameTag = document.createElement('h3');
    usernameTag.innerText = un
    const image = document.createElement('img')
    image.src = url
    const caption = document.createElement('p')
    caption.innerText = '\t\t' + '\t' + cap
    let likeButton = document.createElement('i')
    likeButton.className ="far fa-heart"


    
    caption.prepend(likeButton, commentButton)
  
    let numberOfLikes = document.createElement("p");
    numberOfLikes.id = `likes${id}`;
    
    postDiv.append(usernameTag, image, caption, numberOfLikes);
    feedDiv.appendChild(postDiv)
    getLikes(id)

    postDiv.append(usernameTag, image, caption, numberOfLikes);
    feedDiv.appendChild(postDiv)
}

//create card 
const createCard = (postsArr) => {
    for(let i =0; i < postsArr.length; i++){
        let id = postsArr[i].id
        let username = postsArr[i].username
        let imageurl = postsArr[i].imgurl
        let imgCaption = postsArr[i].caption

        displayCard(username, imageurl, imgCaption, id)
        }
}

const getNewPostInfo = () => {
    const username = 'SuzetteIslam'
    const newImgURL = document.querySelector('#newPostURL').value
    const newCaption = document.querySelector('#newPostCaption').value
    postToDB(username, newImgURL, newCaption)
    displayCard(username, newImgURL, newCaption)
}

const postToDB = async (username, newImgURL, newCaption) =>{
    let newPostURL = `http://localhost:8080/posts/register` 
    try{
        await axios.post(newPostURL, {imgURL: newImgURL, caption: newCaption, username: username});
    } catch (error) {
        console.log(error)
    }
}

const getLikes = async (id) => {
    let likePosts = `http://localhost:8080/likes/${id}`;
    try{
        await axios.get(likePosts)
        .then((response) => {
            console.log(response.data.payload.length)
            let likesLength = response.data.payload.length
            let numberOfLikes = document.getElementById(`likes${id}`)
            // let likes = document.createElement("p");
            numberOfLikes.innerText = likesLength
            // let div = document.getElementById(id);
            // div.appendChild(likes)
         })
    } catch (error) {
        console.log(error)
    }
}

     
async function postLike(id){
    console.log("hi", id)
    let likeLink = `http://localhost:8080/likes/${id}`
    try{
         await axios.post(likeLink, {post_id: id, liker_name: 'SuzetteIslam'})
         getLikes(id)
    } catch (error) {
        console.log(error);
    }
}

