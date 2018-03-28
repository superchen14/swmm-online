import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import INPHelper from "../helper/inp_helper";
import sampleInpText from "../helper/sample_inp.es6";
import { loadProjectAction } from "./actions";
import SwmmAboutMeModal from "./swmm_about_me_modal";
import SwmmAboutSwmmModal from "./swmm_about_swmm_modal";

class SwmmHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAboutMeModalActive: false, isSwmmModalActive: false };
    this.toggleAboutMeModal = this.toggleAboutMeModal.bind(this);
    this.toggleAboutSwmmModal = this.toggleAboutSwmmModal.bind(this);
    this.openInpFile = this.openInpFile.bind(this);
    this.onInpFileOpened = this.onInpFileOpened.bind(this);
    this.loadSampleFile = this.loadSampleFile.bind(this);
  }

  toggleAboutMeModal() {
    this.setState({ isAboutMeModalActive: !this.state.isAboutMeModalActive });
  }

  toggleAboutSwmmModal() {
    this.setState({ isSwmmModalActive: !this.state.isSwmmModalActive });
  }

  openInpFile() {
    this.fileInput.click();
  }

  onInpFileOpened(e) {
    const file = e.currentTarget.files[0];
    if (!file) return;

    const {loadProject} = this.props;
    const fileReader = new FileReader();
    fileReader.onloadend = function(e) {
      const inpHelper = new INPHelper(e.target.result);
      const project = inpHelper.parse();
      loadProject(project);
    };
    fileReader.readAsText(file);
  }

  loadSampleFile() {
    const inpHelper = new INPHelper(sampleInpText);
    const project = inpHelper.parse();
    this.props.loadProject(project);
  }

  render() {
    const isAboutMeActive = this.state.isAboutMeModalActive;
    const isAboutSwmmActive = this.state.isSwmmModalActive;
    return (
      <nav id="swmm-header" className="navbar is-white">
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="/images/swmm.png"/>
            &nbsp;SWMM-online
          </a>
          <a className="navbar-item is-hidden-desktop" href="https://github.com/superchen14/swmm-online"><i className="fa fa-github fa-2x" aria-hidden="true"/></a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">File</a>
              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={this.openInpFile}>Open...</a>
                <a className="navbar-item" onClick={this.loadSampleFile}>Reload Sample INP File</a>
              </div>
              <div>
                <input
                  id="swmm-file-input"
                  type="file"
                  ref={dom => this.fileInput = dom}
                  onChange={this.onInpFileOpened}
                />
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">About</a>
              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={this.toggleAboutSwmmModal}>About SWMM-Online</a>
                <a className="navbar-item" onClick={this.toggleAboutMeModal}>About Author</a>
                <SwmmAboutMeModal isActive={isAboutMeActive} onClose={this.toggleAboutMeModal}/>
                <SwmmAboutSwmmModal isActive={isAboutSwmmActive} onClose={this.toggleAboutSwmmModal}/>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <a className="navbar-item" href="https://github.com/superchen14/swmm-online"><i className="fa fa-github fa-2x" aria-hidden="true"/></a>
          </div>
        </div>
      </nav>
    );
  }
}

SwmmHeader.propTypes = {
  loadProject: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({ loadProject: project => dispatch(loadProjectAction(project)) });
const ConnectedSwmmHeader = connect(mapStateToProps, mapDispatchToProps)(SwmmHeader);

export default ConnectedSwmmHeader;