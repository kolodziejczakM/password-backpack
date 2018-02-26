import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

const Tile = props => (
  <button onClick={props.doAfterClick} className="tile">
    <figure>
      <img className="tile__image" src={props.imageSource} alt={props.alternativeText} />
      <figcaption className="tile__description">{props.descriptiveText}</figcaption>
    </figure>
  </button>
);

Tile.propTypes = {
  doAfterClick: PropTypes.func.isRequired,
  imageSource: PropTypes.isRequired,
  alternativeText: PropTypes.string.isRequired,
  descriptiveText: PropTypes.string.isRequired,
};

export default Tile;
