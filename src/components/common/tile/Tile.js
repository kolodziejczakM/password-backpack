import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Tile.css';

const Tile = props => {
  return (
    <Link to={props.goAfterClick} className="tile">
      <figure>
        <img className="tile__image" src={props.imageSource} alt={props.alternativeText}/>
        <figcaption className="tile__description">{props.descriptiveText}</figcaption>
      </figure>
    </Link>
  );
};

Tile.propTypes = {
  goAfterClick: PropTypes.string.isRequired,
  imageSource: PropTypes.any.isRequired,
  alternativeText: PropTypes.string.isRequired,
  descriptiveText: PropTypes.string.isRequired
};

export default Tile;
