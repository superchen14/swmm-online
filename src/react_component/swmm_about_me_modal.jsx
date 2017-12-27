import React from "react";
import PropTypes from 'prop-types';

const SwmmAboutMeModal = ({isActive, onClose}) => {
    const className = isActive ? "modal is-active" : "modal";
    return (
      <div className={className}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">About Author</p>
            <button className="delete" aria-label="close" onClick={onClose}></button>
          </header>
          <section className="modal-card-body">
            <div className="content">
              <h1>Who Am I</h1>
              <p>My name is Paul Chen. A web developer working at SAP Shanghai Labs.</p>
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
          </section>
          <footer className="modal-card-foot">
          </footer>
        </div>
      </div>
    );
}

SwmmAboutMeModal.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default SwmmAboutMeModal;