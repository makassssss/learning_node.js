import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Portal = ({ open, children }) => (
	open
		? ReactDOM.createPortal(children, document.body)
		: null
);

Portal.propTpyes = {
	open: PropTypes.bool,
    children: PropTypes.node,
};

export default Portal;
