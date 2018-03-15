import React from "react";
import SwmmModal from "./utility/swmm_modal.jsx";

const SwmmAboutMeModal = (props) => {
  return (
    <SwmmModal {...props} title="About Author">
      <div className="content">
        <h1>Who Am I</h1>
        <p>My name is Paul Chen. A web developer in Shanghai China.</p>
        <h1>Contact Me</h1>
        <div className="columns is-12">
          <div className="column is-1"><i className="fa fa-envelope fa-2x" aria-hidden="true"/></div>
          <div className="column is-5"><a href="mailto:superchen14@email.com">superchen14@gmail.com</a></div>
          <div className="column is-1"><i className="fa fa-qq fa-2x" aria-hidden="true"/></div>
          <div className="column is-5"><a href="">511744534</a></div>
        </div>
        <div className="columns is-12">
          <div className="column is-1"><i className="fa fa-github-square fa-2x" aria-hidden="true"/></div>
          <div className="column is-5"><a href="https://github.com/superchen14">https://github.com/superchen14</a></div>
          <div className="column is-1"><i className="fa fa-weixin fa-2x" aria-hidden="true"/></div>
          <div className="column is-5"><a href="">superchen14</a></div>
        </div>
      </div>
    </SwmmModal>
  );
}

export default SwmmAboutMeModal;