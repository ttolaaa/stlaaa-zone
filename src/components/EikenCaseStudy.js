import React from "react";
import gilmobile from "../assets/glimobile.png";


const EikenCaseStudy = () => {
  return (
    <div>
      <div className="eiken">
        <div className="eiken-text-column">
          <div className="text-project-mobile">
            <h5 className="not-bold">November 2020 - October 2023.</h5>
            <hr className="line"></hr>
            <h3>Eiken Vocabulary Enhancement Mobile Application </h3>
            <h4>Summary</h4>
            <p>
              <b>Eiken Mobile Application</b> is a
              solution for Japanese elementary students, offering quizzes,
              flashcards, and listening exercises aligned with Eiken test
              levels. Designed to enhance language proficiency, it helps
              students prepare effectively by adhering to word limitations for
              each proficiency level.
            </p>
            <p className="paragraph-project-mobile">
              <b>EIKEN</b> is an abbreviation of <b>Jitsuyo Eigo Gino Kentei</b>{" "}
              (Test in Practical English Proficiency).
            </p>

            <p>
              <b>Collaborator</b>
              <br></br>
              Erika K. (Project Manager) , Bhushan KC (Head of English Teacher)
              , Unica V. (Head of Japanese Teacher) , Hak Lay (API Developer)
            </p>

            <p>
              <b>Role and Responsibilities</b>
              <br></br>
              Research and Design Lead Primary and Secondary Research,
              User/Usability Testing, Heuristic Analysis, Affinity Diagramming,
              Concept Mapping, Low to high fidelity Design, UX Design,
              prototyping, UI Design, Mobile Developer (Flutter + Material UI)
            </p>
          </div>
        </div>
        <div className="eiken-img-column">
          <img className="column-img-eiken" src={gilmobile} alt="Image 1" />
        </div>
      </div>
    </div>
  );
};

export default EikenCaseStudy;
