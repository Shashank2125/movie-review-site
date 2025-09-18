const url=new URL(location.href);
//making const value of url and we are taking the url object from actual url it is builtin in javascript
const movieId=url.searchParams.get("id")
//we are getting the search parmas were we are getting the id and title from search params
const movieTitle=url.searchParams.get("title")

const APILINK='http://localhost:8000/api/v1/reviews';


//when user searches for any movie it sends that to api and fetches
//the data according to the search
const  main=document.getElementById("section");
const  title=document.getElementById("title");
title.innerText=movieTitle
//inner text only changes the text not the whole html file
const div_new= document.createElement('div');
div_new.innerHTML=`
<div class="row">
<div class="column">
<div class="card">
        New Review
        <p> <strong>Review: </strong>
        <input type="text" id="new_review" value="">
        </p>
        <p><strong>User: </strong>
        <input type="text" id="new_user" value="">
        </p>
        <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
        </p>
        </div>
        </div>
        </div>
`
//harcoding the new review cause we need it only once it can done in Html file
//we are not taking the reviewid cause we have not created review yet
main.appendChild(div_new)

returnReviews(APILINK)
function returnReviews(url){
    fetch(url+"/movie/"+movieId).then(res=>res.json()).then(function(data)
    {
        console.log(data);
            data.forEach(review => {
            //for each review we are doing something
            const div_card=document.createElement('div');
           

             div_card.innerHTML=`
             <div class="row">
             <div class="column">
             <div class="card" id="${review._id}">
             <p><strong>Review: </strong>${review.review}</p>
             <p><strong>User: </strong>${review.user}</p>
             <p><a href="#" onclick="editReview('${review._id}','${review.review}','${review.user}')">✏️</a>
             <a href="#" onclick="deleteReview('${review._id}')">🗑️</a></p>
             </div>
             </div>
             </div>
             `
             //we get review in paragraph,review user,reviewdi and also we are deleting and rewriting the reviews
             //by getting the link we are not going anywhere when we click the eelement is pressed we are going to edit the
             //reviewedit will take review id user and review for editing the reviews
             //for deleting it will only recuire id only


            main.appendChild(div_card);//we are appending the above whole logic to
            //section tag in html


        });



    });

}
function editReview(id,review,user){
    console.log(review)
    const element=document.getElementById(id);
    console.log(element)
    const reviewInputId= "review" + id
    const userInputId= "user" + id 
    //we are passing the id every time because we are going to update only the inner
    //html when we edit the element not its id
    element.innerHTML=`
                <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
                </p>
                <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
                </p>
                <p><a href="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">💾</a>
                </p>
                `
}
function saveReview(reviewInputId,userInputId,id="")
                                            //making id optional for new reviews by passing empty string
{
    const review=document.getElementById(reviewInputId).value;
    const user=document.getElementById(userInputId).value;
    if(id)
    {
    fetch(APILINK+ "/" + id,{
        method:'PUT',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({"user":user, "review":review})
    }).then(res => res.json()).then(res =>{ console.log(res)
        location.reload();
    });
    //if id exist then donot post revew justsave changes

    }
    else
    { fetch(APILINK+"/new",{
        //else post the review rather than put and
        //id dosen't exist so we pass the new command
        method:'POST',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-Type':'application/json'
        
        },
        body:JSON.stringify({"user":user,"review":review,"movieId":parseInt(movieId)})

    }).then(res=>res.json())
    .then(res=>{
        console.log(res)
        location.reload();
    });

    }
   
}
function deleteReview(id){
    fetch(APILINK+"/"+id,{
        method:'DELETE',
        headers:{
            'Accept':'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
    .then(res=>res.json())
    .then(res=>{
        console.log('Deleted',res);
        location.reload();

    })
}


