import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import INPHelper from "../helper/inp_helper";
import { loadProjectAction } from "./actions";

class SwmmLeftPaneMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAboutMeModalActive: false };
    this.toggleAboutMeModal = this.toggleAboutMeModal.bind(this);
    this.openInpFile = this.openInpFile.bind(this);
    this.onInpFileOpened = this.onInpFileOpened.bind(this);
  }

  toggleAboutMeModal() {
    this.setState({ isAboutMeModalActive: !this.state.isAboutMeModalActive });
  }

  openInpFile() {
    this.fileInput.click();
    this.toggleMenu();
  }

  onInpFileOpened(e) {
    const {loadProject} = this.props;
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = function(e) {
      const inpHelper = new INPHelper(e.target.result);
      const project = inpHelper.parse();
      loadProject(project);
    };
    fileReader.readAsText(file);
  }

  render() {
    const aboutMeModalClassName = this.state.isAboutMeModalActive ? "modal is-active" : "modal";
    return (
      <div className="navbar-item has-dropdown is-hoverable" id="swmm-dropdown-menu">
        <a className="navbar-link">Menu</a>
        <div className="navbar-dropdown" id="swmm-dropdown-list">
          <a className="navbar-item" onClick={this.openInpFile}>Open...</a>
          <a className="navbar-item" onClick={this.toggleAboutMeModal}>About Me</a>
        </div>
        <div>
          <input
            id="swmm-file-input"
            type="file"
            ref={dom => this.fileInput = dom}
            onChange={this.onInpFileOpened}
          />
        </div>
        <div className={aboutMeModalClassName}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">About</p>
              <button className="delete" aria-label="close" onClick={this.toggleAboutMeModal}></button>
            </header>
            <section className="modal-card-body">
              <div className="content">
                <h1>What is Swmm-Online</h1>
                <p>This is a read-only online version of <a href="https://www.epa.gov/water-research/storm-water-management-model-swmm">Storm Water Management Model</a></p>
                <h1>Source Code</h1>
                <p>Will upload to github</p>
                <h1>Who am I</h1>
                <p>My name is Paul Chen. A web developer working at SAP Shanghai Labs.</p>
                <h1>Contact Me</h1>
                <p><embed src="/img/gmail.svg" type="image/svg+xml" style={{width: 28}}/>&nbsp;&nbsp;&nbsp;&nbsp;<a href="mailto:superchen14@email.com">superchen14@gmail.com</a></p>
                <p><i className="fa fa-github fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/superchen14">https://github.com/superchen14</a></p>
                <p><i className="fa fa-qq fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;<a href="">511744534</a></p>
                <p><i className="fa fa-weixin fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;<a href="">superchen14</a></p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <a className="button" onClick={this.toggleAboutMeModal}>Close</a>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

SwmmLeftPaneMenu.propTypes = {
  loadProject: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({ loadProject: project => dispatch(loadProjectAction(project)) });
const ConnectedSwmmLeftPaneMenu = connect(mapStateToProps, mapDispatchToProps)(SwmmLeftPaneMenu);

export default ConnectedSwmmLeftPaneMenu;