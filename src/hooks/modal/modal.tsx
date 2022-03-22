import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import './modal.scss';
interface Props {
  show?: boolean,
  onHide: any,
  title?: string,
  onSubmit: any,
  item: {
    id: string,
    taskName: string,
    projectName: string,
    comments: string
  },
  edit: boolean
}
const ModalBox = (props: Props) => {
  const initialFormValue: any = {
    id: props.item?.id,
    taskName: props.item?.taskName,
    projectName: props.item?.projectName,
    comments: props.item?.comments
  };
  const [taskName, setTaskName] = useState(initialFormValue.taskName);
  const [projectName, setProjectName] = useState(initialFormValue.projectName);
  const [comments, setComments] = useState(initialFormValue.comments);
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    setTaskName(initialFormValue.taskName);
    setProjectName(initialFormValue.projectName);
    setComments(initialFormValue.comments);
  }, [props.item]);
  const getRanHex = (size: any) => {
    const result = [];
    const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  
    for (let n = 0; n < size; n++) {
      result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
  }
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (taskName !== '' && projectName !== '') {
      initialFormValue.id = props.edit ? props.item?.id : getRanHex(12);
      initialFormValue.taskName = taskName;
      initialFormValue.projectName = projectName;
      initialFormValue.comments = comments;
      props.onSubmit(initialFormValue);
      cancelModal();
    }
  };
  const handleInputTaskName = (event: any) => {
    setTaskName(event.target.value);
  };
  const handleSelectProject = (event: any) => {
    setProjectName(event.target.value);
  };
  const handleComments = (event: any) => {
    setComments(event.target.value);
  };
  const cancelModal = () => {
    setTaskName('');
    setProjectName('');
    setComments('');
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form name="formTask" noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="formTaskName">
            <Form.Label>*Task Name</Form.Label>
            <Form.Control type="text" required placeholder="Enter task name"
             onChange={handleInputTaskName} value={taskName} />
            <Form.Control.Feedback type="invalid">
              Please enter a task name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>*Project Name</Form.Label>
            <Form.Select aria-label="Select Project" required
             onChange={handleSelectProject} value={projectName}>
              <option>Select Project</option>
              <option value="Project Name 1">Project Name 1</option>
              <option value="Project Name 2">Project Name 2</option>
              <option value="Project Name 3">Project Name 3</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a project
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formComments">
            <Form.Label>Comments</Form.Label>
            <FormControl as="textarea" aria-label="With textarea" onChange={handleComments} value={comments} />
          </Form.Group>
          <div className='button-group'>
            <Button variant="light" onClick={cancelModal}>
              Cancel
            </Button>
            <Button className='btn-submit' onClick={handleSubmit}>
              {props.edit ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBox;
