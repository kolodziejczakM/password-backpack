import React from 'react';
import PropTypes from 'prop-types';
import './InlineInformativeBlock.css';

const InlineInformativeBlock = ({
  iconSrc,
  iconWidth,
  iconHeight,
  altText,
  text,
}) => (
  <div className="inline-informative-block__inner-container">
    <img
      className="inline-informative-block__icon"
      alt={altText}
      src={iconSrc}
      width={iconWidth}
      height={iconHeight}
    />
    <h3>{text}</h3>
  </div>
);

InlineInformativeBlock.propTypes = {
  iconSrc: PropTypes.string.isRequired,
  iconWidth: PropTypes.number.isRequired,
  iconHeight: PropTypes.number.isRequired,
  altText: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default InlineInformativeBlock;
