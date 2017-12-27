import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import INPHelper from "../helper/inp_helper";
import sampleInpText from "../helper/sample_inp";
import { loadProjectAction } from "./actions";
import SwmmAboutMeModal from "./swmm_about_me_modal";
import SwmmAboutSwmmModel from "./swmm_about_swmm_modal";

class SwmmLeftPaneMenu extends React.Component {
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
      <div className="navbar-item has-dropdown is-hoverable" id="swmm-dropdown-menu">
        <a className="navbar-link">Menu</a>
        <div className="navbar-dropdown" id="swmm-dropdown-list">
          <a className="navbar-item" onClick={this.openInpFile}>Open...</a>
          <a className="navbar-item" onClick={this.loadSampleFile}>Load Sample INP File</a>
          <a className="navbar-item" onClick={this.toggleAboutSwmmModal}>About SWMM-Online</a>
          <a className="navbar-item" onClick={this.toggleAboutMeModal}>About Author</a>
        </div>
        <div>
          <input
            id="swmm-file-input"
            type="file"
            ref={dom => this.fileInput = dom}
            onChange={this.onInpFileOpened}
          />
        </div>
        { <SwmmAboutMeModal isActive={isAboutMeActive} onClose={this.toggleAboutMeModal}/> }
        { <SwmmAboutSwmmModel isActive={isAboutSwmmActive} onClose={this.toggleAboutSwmmModal} /> }
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