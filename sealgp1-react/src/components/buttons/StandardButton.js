import { Link } from 'react-router-dom';
import './Button.css'

const StdButton = (props) => {

    return (
        <Link className="button" to={`/${props.category}/edit/${props.id}`}>Edit</Link>
    )
  };
  
  export default StdButton;