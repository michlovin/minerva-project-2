import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AboutMe from "./AboutMe";
import ProfilePageCardDiv from "./ProfilePageCardDiv";
import "./ProfilePage.css";
import { useNavigate } from "react-router"; //add this
import TitleComponent from "../../title/TitleComponent";

// this will render the Mentor Card, About Me & Q&A and like button

function ProfilePageComponent({ user, setUser }) {
  const [buttonValue, setButtonValue] = useState("");
  const [like, setLike] = useState(false);
  const [mentor, setMentor] = useState();
  let userId = user?._id;
  let params = useParams();
  let mentorId = params.id;
  const navigate = useNavigate();

  console.log("user favorites", user?.favorites);
  //
  //

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
  //will the delete function below work?

  async function deleteMentor(id) {
    console.log("FROM DELETE MENTOR FUNCTION");
    await fetch(`/api/delete-mentor/` + id, {
      method: "DELETE",
    });
    console.log("Are you sure you want to DELETE Mentor?", mentorId);
    navigate("/mentor-gallery");
  }
  // async function deleteMentor(id) {
  //   await fetch(`/api/delete-mentor/` + id, {
  //     method: "DELETE",
  //   });
  // }

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

  return (
    <div>
      <TitleComponent title="Mentor Profile Page" />
      <div className="profile-page-wrapper">
        <div className="sidebar">
          <ProfilePageCardDiv
            mentor={mentor}
            mentorId={mentorId}
            userId={userId}
            user={user}
            setUser={setUser}
            buttonValue={buttonValue}
            //  buttonLink={"/mentor-edit/" + params.id}
            // existingValues={existingValues}
          />
        </div>
        <div className="content">
          <AboutMe
            mentorId={params.id}
            buttonLink={"/mentor-edit/" + mentorId}
            // existingValues={existingValues}
            buttonDelete={"/mentor-delete/" + mentorId}
            removeMentor={() => deleteMentor(mentor._id)}
          />
        </div>

        <div className="sidebar">
          <ProfilePageCardDiv
            mentor={mentor}
            mentorId={mentorId}
            userId={userId}
            user={user}
            setUser={setUser}
            buttonValue={buttonValue}
            //  buttonLink={"/mentor-edit/" + params.id}
            // existingValues={existingValues}
          />
        </div>
        <div className="content">
          <AboutMe
            mentorId={params.id}
            buttonLink={"/mentor-edit/" + mentorId}
            // existingValues={existingValues}
            // buttonDelete={"/delete-mentor/" + mentorId}
            deleteMentor={() => deleteMentor(mentorId)}
          />
        </div>

        {/* <div>
        {/* <div>
       <MessageBoard className="footer"/>
     </div> */}
      </div>
    </div>
  );
}
export default ProfilePageComponent;
