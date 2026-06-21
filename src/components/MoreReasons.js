import React from "react";
import "./MoreReasons.css";

import TvIcon from "../icons/TvIcon";
import DownloadIcon from "../icons/DownloadIcon";
import DevicesIcon from "../icons/DevicesIcon";
import KidsIcon from "../icons/KidsIcon";

function MoreReasons() {
  const reasons = [
    {
      id: 1,
      title: "Enjoy on your TV",
      text: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      icon: <TvIcon />
    },
    {
      id: 2,
      title: "Download your shows to watch offline",
      text: "Save your favorites easily and always have something to watch.",
      icon: <DownloadIcon />
    },
    {
      id: 3,
      title: "Watch everywhere",
      text: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      icon: <DevicesIcon />
    },
    {
      id: 4,
      title: "Create profiles for kids",
      text: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
      icon: <KidsIcon />
    }
  ];

  return (
    <section className="section">
 

    <section className="reasons">
      <h2 className="reasons__title">More Reasons to Join</h2>

      <div className="reasons__grid">
        {reasons.map((item) => (
          <div className="reason__card" key={item.id}>
            <div className="reason__icon">{item.icon}</div>
            <h3 className="reason__heading">{item.title}</h3>
            <p className="reason__text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
    </section>
  );
}

export default MoreReasons;