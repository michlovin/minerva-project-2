import React from "react";
import "./BioDirectory.style.css";
import "../bio-cards/portraitCard.style.css";
import PortraitCardComponent from "../bio-cards/PortraitCardComponent";

//
//
const MentorDirectoryComponent = ({ props }) => {
  function selectMentor(id) {
    console.log("selectMentor called on id: ", id);
    props.setSelectedMentorId(id);
  }

  return (
    <>
      <h1>{props.title}</h1>
      <div className="directory-menu">
        {props.mentorsArray &&
          props.mentorsArray.map((mentor, index) => {
            return (
              <PortraitCardComponent
                className="card"
                key={index}
                onMentorSelected={() => selectMentor(mentor._id)}
                firstName={mentor.firstName}
                lastName={mentor.lastName}
                imageURL={mentor.avatar}
                description={mentor.description}
                city={mentor.city}
                science={mentor.science}
                technology={mentor.technology}
                engineering={mentor.engineering}
                mathematics={mentor.mathematics}
                mentor={mentor}
                user={props.user}
                setUser={props.setUser}
              />
            );
          })}
      </div>
    </>
  );
};
export default MentorDirectoryComponent;
