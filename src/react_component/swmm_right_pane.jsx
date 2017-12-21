import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { togglePinRightPaneAction, closeRightPaneAction } from "./actions";

class SwmmRightPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isRightPanePinned, togglePin, close} = this.props;
    let spanClass = "glyphicon glyphicon-pushpin ";
    if (isRightPanePinned) spanClass = spanClass + "right-pane-pinned";
    return (
    <div className="right-pane">
      <div id="pane-header">
        <div id="right-pane-pin-btn" onClick={togglePin}>
          <span className={spanClass}></span>
        </div>
        <div id="right-pane-close-btn" onClick={close}>
          <span className="glyphicon glyphicon-remove"></span>
        </div>
      </div>
    </div>
    );
  }
}

SwmmRightPane.propTypes = {
  isRightPanePinned: PropTypes.bool.isRequired,
  togglePin: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isRightPanePinned: (state && state.ui && state.ui.isRightPanePinned) || false
});

const mapDispatchToProps = dispatch => ({
  togglePin: () => dispatch(togglePinRightPaneAction()),
  close: () => dispatch(closeRightPaneAction()),
});

const ConnectedSwmmRightPane = connect(mapStateToProps, mapDispatchToProps)(SwmmRightPane);

export default ConnectedSwmmRightPane;