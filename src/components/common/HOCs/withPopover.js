import React, { Fragment } from 'react';
import './withPopover.css';

const defaultState = {
  textAlign: 'left',
  width: '200px',
  padding: '15px',
  bottom: '110%',
  left: '10%',
  color: '#000',
  background: '#fff',
  fontSize: '14px',
  text: 'To change this text - please provide configuration object to withPopover component',
  removeChildrenMargins: false,
};

const getWrapperClassName = (removeChildrenMargins) => {
  const baseClassName = 'popover-wrapped-component';

  if (removeChildrenMargins) {
    return `${baseClassName}--removed-children-margins`;
  }

  return baseClassName;
};

const withPopover = popoverProps => WrappedComponent => props => (
  <Fragment>
    <div className="root-wrapper">
      <div className={getWrapperClassName(popoverProps.removeChildrenMargins)}>
        <WrappedComponent {...props} />
      </div>
      <div className="popover">
        <div
          className="popover-cloud"
          style={{
            ...defaultState,
            ...popoverProps,
          }}
        >
          {popoverProps.text ? popoverProps.text : defaultState.text}
        </div>
      </div>
    </div>
  </Fragment>
);

export default withPopover;
