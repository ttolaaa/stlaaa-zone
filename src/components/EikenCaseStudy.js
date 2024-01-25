import React from "react";
import mobileapp from "../assets/mobileapp.gif";
import giffile from "../assets/giffile.gif";
import gilmobile from "../assets/glimobile.png"
import EikenCaseStudyPB from "../components/EikenCaseStudy-PB"
import PersonalProject from "./Personal-projects";

const EikenCaseStudy = () => {
  return (
    <div className="eiken">
      <div className="column">
        <div className="text-project-mobile">
          <h5 className="not-bold">November 2020 - October 2023.</h5>
          <hr className="line"></hr>
          <h3>Eiken Vocabulary Enhancement Mobile Application </h3>
          <h4>Summary</h4>
          <p>
            <b>Eiken Mobile Application</b> The Eiken Mobile App is a tailored
            solution for Japanese elementary students, offering quizzes,
            flashcards, and listening exercises aligned with Eiken test levels.
            Designed to enhance language proficiency, it helps students prepare
            effectively by adhering to word limitations for each proficiency
            level.
          </p>
          <p className="paragraph-project-mobile">
            <b>EIKEN</b> is an abbreviation of <b>Jitsuyo Eigo Gino Kentei</b>{" "}
            (Test in Practical English Proficiency), one of the most widely used
            English-language testing programs in <b>Japan</b>. It is offered at
            7 levels: Grade 1, Grade Pre-1, Grade 2, Grade Pre-2, Grade 3, Grade
            4, and Grade 5.
          </p>
          
          <p>
            <b>Collaborator</b><br></br>
            Erika K. (Project Manager) , Bhushan KC (Head of English Teacher) ,
            Unica V. (Head of Japanese Teacher) , Hak Lay (API Developer)
          </p>

          <p>
            <b>Role and Responsibilities</b><br></br>
            Research and Design Lead Primary and
            Secondary Research, User/Usability Testing, Heuristic Analysis,
            Affinity Diagramming, Concept Mapping, Low to high fidelity Design, UX Design, prototyping, UI Design, Mobile Developer (Flutter + Material UI)
          </p>
        </div>
      </div>
      <div className="column">
        <img className="column-img-eiken"src={gilmobile} alt="Image 1" />
      </div>
      
      
    </div>
  );
};

export default EikenCaseStudy;
