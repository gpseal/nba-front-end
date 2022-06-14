import { Link } from 'react-router-dom';
import './Button.css'


const EditButton = (props) => {

        // return "test2"
        console.log (props.id)

        if (props.id === "none") {
            return <Link className="button" to={`/edit/${props.category}`}>Add</Link>
        }
        else
        return <Link className="button" to={`/edit/${props.category}-${props.id}`}>Update</Link>
    
}
  
  export default EditButton