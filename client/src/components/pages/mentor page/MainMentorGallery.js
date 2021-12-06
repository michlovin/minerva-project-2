import { useState } from "react";
import MentorDirectoryComponent from "../../directories/MentorDirectoryComponent";
import MentorDetail from "../../bio-cards/MentorDetail";

//replace MentorDetail with ProfilePageComponent on click
function MainMentorGallery() {
  const [selectedMentorId, setSelectedMentorId] = useState();

  return (
    <div className="main-bio-list">
      {!selectedMentorId && (
        <MentorDirectoryComponent setSelectedMentorId={setSelectedMentorId} />
      )}
      {selectedMentorId && (
        <div>
          <button onClick={() => setSelectedMentorId(undefined)}>
            Go Back
          </button>
          <MentorDetail mentorId={selectedMentorId} />
        </div>
      )}
    </div>
  );
}

export default MainMentorGallery;
