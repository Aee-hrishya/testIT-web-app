import React, { useRef, useEffect } from "react";
import "./LandingPage.scss";
import Card from "../Card/Card.component";
import Footer from "../Footer/Footer.component";

const LandingPage = () => {
  const scrollRef = useRef(null);
  let scrollAmount = 0;
  let scrollInterval = 3000;
  let scrollStep = 200;
  useEffect(() => {
    const interval = setInterval(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        scrollAmount += scrollStep;
        if (
          scrollAmount >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollAmount = 0; // Reset to start when reaching the end
        }
        scrollContainer.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }, scrollInterval);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="main-description">
        <h1 className="title">Come test it with us.....</h1>
        <h2 className="title-info">
          The best platform out there to test the skills for the ideal candidate
          for your organization!
        </h2>
      </div>
      <div className="tests">
        <h2 className="tests-section-title">
          Have a look at the tests we offer!
        </h2>
        <div className="card-section" ref={scrollRef}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
