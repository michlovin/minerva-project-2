import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AboutMe from "./AboutMe";
import ProfilePageCardDiv from "./ProfilePageCardDiv";
import "./ProfilePage.css";
import { useNavigate } from "react-router";//add this


// this will render the Mentor Card, About Me & Q&A and like button

function ProfilePageComponent({ user, setUser }) {
  const [like, setLike] = useState(false);
  const [buttonValue, setButtonValue] = useState("");
  const [mentor, setMentor] = useState();
  let userId = user?._id;
  let params = useParams();
  let mentorId = params.id;
  //const navigate = useNavigate

  // console.log("user favorites", user?.favorites);
  useEffect(() => {
    let doesLike = user?.favorites.includes(mentorId);
    setLike(doesLike);
    console.log("value of button", doesLike);
  }, [mentorId, user.favorites]);

  const favoritesToggle = () => {
    let index = user?.favorites.indexOf(mentorId);
    console.log("running toggle", index);
    let fave = [...user.favorites];
    if (index > -1) {
      fave.splice(index, 1);
    } else {
      fave.push(mentorId);
    }
    const newUser = { ...user, favorites: fave };
    setUser(newUser);
    fetch(`/api/update-favorite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  };

  // will the delete function below work?

async function deleteMentor(id){
  await fetch (`/api/delete-mentor/`+ id,{
    method:"DELETE", 
  })
  console.log("Are you sure you want to DELETE Mentor?", mentorId) 
  nav('/mentor-gallery')
}



  // const addToFavorites = async function () {
  //   await fetch(`/api/add-favorite?mentorId=${mentorId}&id=${userId}`);
  // };
  // const removeFromFavorites = async function () {
  //   await fetch(`/api/remove-favorite?mentorId=${mentorId}&id=${userId}`);
  // };
  // if (like) {
  //   setFavoritesToggle(removeFromFavorites);
  //   setButtonValue("🤍");
  // } else {
  //   setFavoritesToggle(addToFavorites);
  //   setButtonValue("❤️");
  // }

  useEffect(() => {
    const fetchMentor = async () => {
      let fetchResult = await fetch("/api/get-mentor/" + mentorId);
      let fetchedMentor = await fetchResult.json();
      setMentor(fetchedMentor);
    };
    if (mentorId) {
      fetchMentor();
    }
  }, [mentorId]);

  return (
    <div className="profile-page-wrapper">
      <div id="card-div-title" className="header">
        <h1>Mentor Profile Page</h1>
      </div>

      <div className="sidebar">
        <ProfilePageCardDiv
          mentor={mentor}
          mentorId={mentorId}
          userId={userId}
          favoritesToggle={favoritesToggle}
          like={like}
          setLike={setLike}
          user={user}
          buttonValue={buttonValue}
          //  buttonLink={"/mentor-edit/" + params.id}
          // existingValues={existingValues}
        />
      </div>
      <div className="content">
        <AboutMe
          mentorId={params.id}
          buttonLink={"/mentor-edit/" + mentorId}
          existingValues={existingValues}
          buttonDelete={"/mentor-delete/" + mentorId}
          removeMentor={()=>removeMentor(mentor._id)}
        />
      </div>

      {/* <div>
       <MessageBoard className="footer"/>
     </div> */}
    </div>
  );
}
export default ProfilePageComponent;
