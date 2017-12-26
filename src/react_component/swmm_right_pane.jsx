import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import ConnectedSwmmRightPanePropertyList from "./swmm_right_pane_property_list.jsx";
import { togglePinRightPaneAction, closeRightPaneAction } from "./actions";

class SwmmRightPane extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {isRightPanePinned, togglePin, close} = this.props;
    let spanClass = "fa fa-thumb-tack ";
    if (!isRightPanePinned) spanClass = spanClass + "right-pane-unpinned";
    return (
    <div className="right-pane">
      <div id="pane-header">
        <div id="right-pane-pin-btn" onClick={togglePin}>
          <i className={spanClass}/>
        </div>
        <div id="right-pane-close-btn" onClick={close}>
          <i className="fa fa-remove"/>
        </div>
      </div>
      <div id="right-pane-body">
        <ConnectedSwmmRightPanePropertyList/>
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
  isRightPanePinned: (state && state.ui && state.ui.isRightPanePinned) || false,
});

const mapDispatchToProps = dispatch => ({
  togglePin: () => dispatch(togglePinRightPaneAction()),
  close: () => dispatch(closeRightPaneAction()),
});

const ConnectedSwmmRightPane = connect(mapStateToProps, mapDispatchToProps)(SwmmRightPane);

export default ConnectedSwmmRightPane;