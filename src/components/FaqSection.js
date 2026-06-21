import React, { useState } from "react";
import "./FaqSection.css";

const FAQ_DATA = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from USD3.99 to USD15.99 a month. No extra costs, no contracts."
  },
  {
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app.\n\nYou can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
  },
  {
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
  },
  {
    question: "What can I watch on Netflix?",
    answer:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
  },
  {
    question: "Is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.\n\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
  }
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-list">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className={`faq-icon ${isOpen ? "open" : ""}`}>+</span>
              </button>

              {isOpen && (
                <div className="faq-answer">
                  {item.answer.split("\n\n").map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
        <div className="form_wrapper">
      <p className="faq-subtext">
        Ready to watch? Enter your email to create or restart your membership.
      </p>

      <div className="faq__form">
          <input
            type="email"
            placeholder="Email address"
            className="hero__input"
          />
          <button className="hero__button">Get Started</button>
        </div>
        </div>
    </section>
  );
};

export default FaqSection;
