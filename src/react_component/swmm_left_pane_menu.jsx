import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import INPHelper from "../helper/inp_helper";
import { loadProjectAction } from "./actions";

class SwmmLeftPaneMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMenuExpanded: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.openInpFile = this.openInpFile.bind(this);
    this.onInpFileOpened = this.onInpFileOpened.bind(this);
  }

  toggleMenu() {
    this.setState({ isMenuExpanded: !this.state.isMenuExpanded });
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
    const dropdownClassName = this.state.isMenuExpanded ? "dropdown open" : "dropdown";

    return (
      <div style={{float: "right"}}>
        <ul className="nav navbar-nav">
          <li className={dropdownClassName}>
            <a href="#" id="swmm-menu">
              <span className="glyphicon glyphicon-menu-hamburger" id="left-pane-menu" onClick={this.toggleMenu}>
              </span>
            </a>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={this.openInpFile}>Open...</a></li>
            </ul>
          </li>
        </ul>
        <div>
          <input
            id="swmm-file-input"
            type="file"
            ref={dom => this.fileInput = dom}
            onChange={this.onInpFileOpened}
          />
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