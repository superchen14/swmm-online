import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { togglePinRightPaneAction } from "./actions";

class SwmmRightPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isRightPanePinned, togglePin} = this.props;
    let spanClass = "glyphicon glyphicon-pushpin ";
    if (isRightPanePinned) spanClass = spanClass + "right-pane-pinned";
    return (
    <div id="right-pane">
      <div id="pane-header">
        <div id="right-pane-title" onClick={togglePin}>
        <span className={spanClass}></span>
        </div>
      </div>
    </div>
    );
  }
}

SwmmRightPane.propTypes = {
  isRightPanePinned: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isRightPanePinned: (state && state.ui && state.ui.isRightPanePinned) || false
});

const mapDispatchToProps = dispatch => ({
  togglePin: () => dispatch(togglePinRightPaneAction()),
});

const ConnectedSwmmRightPane = connect(mapStateToProps, mapDispatchToProps)(SwmmRightPane);

export default ConnectedSwmmRightPane;