import {Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({handleSubmit,revText,labelText,defaultValue}) => {
  const navigate = useNavigate();
  return (

    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" placeholder='Write a review' rows={3} defaultValue={defaultValue}/>
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
        <Button variant="outline-info" onClick={() => navigate("/")}>Back</Button>
    </Form>   

  )
}

export default ReviewForm
