import React from 'react';
import PropTypes from 'prop-types';
import './PreviewIcon.css';

const PreviewIcon = ({
  src,
  alt,
  width,
  height,
}) => (
  <div className="preview-icon-frame">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  </div>
);

PreviewIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PreviewIcon;
