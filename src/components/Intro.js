import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  faMediumM,
  faLinkedin,
  faGithub,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import introCard from "../assets/intro-card.png";
import Projects from "./Project";
import Works from "./Works";
import PersonalProject from "./Personal-projects";

export default function Intro() {
  return (
    <div>
      <div className="intro">
        <div className="image-intro">
          <img className="img-intro" src={introCard} alt="My Image" />
        </div>
        <div className="text-intro">
          <p className="paragraph-intro">
            Hey there! I'm<b> Tola (トラーです🐰)...🧪</b> <br></br>
            はじめまして。私の portfolio へようこそ。<br></br>
            {/* (日本語を少し話せます。) */}
          </p>
          {/* <p className="paragraph-intro">
            はじめまして。私の portfolio{" "}
            へようこそ。日本語を少し話せます。
          </p> */}

          {/* I'm a San Francisco-based 🌉 Product Designer passionate about designing intuitive solutions for data and AI/ML products to empower people to achieve more. 
          I'm currently at Cruise, working on ML experimentation tools for autonomous vehicles. */}
          <p className="paragraph-intro">
            I'm a Tokyo-based🗼 <b>Web App Engineer</b> passionate about
            designing intuitive solutions for end-to-end products to empower
            people to achieve more.
          </p>
          <p className="paragraph-intro">
            Currently at a startup company <b> <a
                href="https://jiproce.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                ジプロス(JIPROCE)
              </a></b>, working on
            end-to-end product designing, developing and delivering a completed
            web solution for student{" "}
            <b>
              <a
                href="https://online.gli-english.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                online.gli-english.com
              </a>
            </b>{" "}
            , for admin{" "}
            <b>
              <a
                href="https://gli-online-admin.vercel.app/admin/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                online-gli-admin.com
              </a>
            </b>
          </p>

          <p className="paragraph-intro">
            Currently seeking for new opportunities where I can contribute my pass
            experience to the team and grow in a new and fast-paced
            environment. I am interested in roles related to
            <b> Product Design</b>, <b>Frontend Development</b> and{" "}
            <b>Quality Assurance.</b> Please feel free to DM me on {" "}
            <a
              href="https://www.linkedin.com/in/som-tola/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="social-icon-white"
              />
            </a>{" "}
            LinkedIn for a quick chat. ☺️
          </p>
          <p className="paragraph-intro">
            Previously at <b>Kirirom Institute of Technology</b> a.k.a{" "}
            <b>(KIT) in Cambodia 🇰🇭 </b> as an undergraduate student and intern
            on Product Design, Front End Development and System Quality
            Assurance projects.
          </p>
          <p className="paragraph-intro">
            Visit to my blogs&nbsp; → 
            {/* <FontAwesomeIcon icon={faCircleArrowRight} /> */}
            &nbsp;   &nbsp; 
            <a
              href="https://medium.com/@somtola"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faMediumM} className="social-icon-white" />
            </a>
            &nbsp;   &nbsp;
          <a
              href="https://www.linkedin.com/in/som-tola/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="social-icon-white"
              />
            </a>
            &nbsp;   &nbsp;
            <a
              href="https://github.com/ttolaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="social-icon-white" />
            </a>
            &nbsp;     &nbsp;
            <a
              href="https://www.youtube.com/@thisistolaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} className="social-icon-white" />
            </a>
          </p>

          {/* <p className="paragraph-intro">
            Visit to my blogs <FontAwesomeIcon icon={faCircleArrowRight} />
            <a
              href="https://medium.com/@somtola"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faMediumM} className="social-icon-white" />
            </a> 
            <a
              href="https://www.linkedin.com/in/som-tola/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="social-icon-white"
              />
            </a>
            <a
              href="https://github.com/ttolaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="social-icon-white" />
            </a>
            <a
              href="https://www.youtube.com/@thisistolaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} className="social-icon-white" />
            </a>
          </p> */}
          {/* <ul className="social-icon">
            <a
              href="https://medium.com/@somtola"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faMediumM} className="social-icon-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/som-tola/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="social-icon-white"
              />
            </a>
            <a
              href="https://github.com/ttolaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="social-icon-white" />
            </a>
            <a
              href="https://www.youtube.com/@thisistolaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} className="social-icon-white" />
            </a>
          </ul> */}
          <p className="paragraph-intro">
            FYI, I'm not a YouTuber; I moved to Japan 2 years ago 🇰🇭 → 🇯🇵 and in
            my videos you will find me sharing my early career stories in tech
            and navigating through life in my 20s. I just made the youtube channel for
            pleasure so that one day my future children or grandkids may see my
            adventures in Tokyo. Additionally, I've uploaded the video of how to
            maximize the experience at the world-best women in technology
            conference, the <b>Grace Hopper Celebration</b>, where I
            participated in the 2019 in Orlando, Florida, USA.
          </p>
        </div>
      </div>

      <Projects />
      <PersonalProject />
      <Works />
    </div>
  );
}
