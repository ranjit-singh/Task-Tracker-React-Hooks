import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Modal from '../../hooks/modal/modal';
import { createTaskService, getTaskService, deleteTaskService, updateTaskService } from '../../services/taskTrackerApi';
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import './taskTable.scss';
const titleValue = 'Create Task';

const TaskTable = () => {
  const task: Array <{ id: string, taskName: string, projectName: string, comments: string }> = [];
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState(titleValue);
  const [tasks, setTasks] = useState(task);
  const [taskObj, setTaskObj] = useState({
    taskName: '',
    projectName: '',
    comments: '',
    id: ''
  });
  const [editValue, setEditValue] = useState(false);
  const createTask = () => {
    setModalShow(true);
    setTitle(titleValue);
    setEditValue(false);
  };
  const handleSubmit = async(value: { taskName: string, projectName: string, comments: string }) => {
    if (value.taskName) {
      if (editValue) {
        await updateTaskService(value);
        getTaskService().then((resp: any) => {
          setTasks(resp);
        });
      } else {
        createTaskService(value).then((resp: any) => {
          setTasks(resp);
        });
      }
    }
  };
  const editTask = (taskOb: any) => {
    setTitle('Edit Task');
    setTaskObj(taskOb);
    setModalShow(true);
    setEditValue(true);
  };
  const deleteTask = (taskOb: any) => {
    deleteTaskService(taskOb.id).then(() => {
      getTaskService().then((resp: any) => {
        setTasks(resp);
      });
    });
  };
  const getTaskList = () => {
    const contentElm: any = [];
    tasks.forEach((item, index) => {
      contentElm.push(<tr>
        <td>{index+1}</td>
        <td>{item.taskName}</td>
        <td>{item.projectName}</td>
        <td>{item.comments}</td>
        <td><button className="sec-btn" onClick={()=> editTask(item)}>Edit</button></td>
        <td><button className="sec-btn" onClick={()=> deleteTask(item)}>Delete</button></td>
      </tr>
      );
    });
    return contentElm;
  };
  return (
    <React.Fragment>
      <div className='create-task d-flex justify-content-start align-items-center mb-3'>
        <button className='create-task-btn' onClick={createTask}>
        <PlusCircleOutlined className='plus-icons' />
        {titleValue}
        </button>
        </div>
      <Table bordered hover responsive className='task-table'>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Project</th>
            <th>Comments</th>
            <th>Task Edit</th>
            <th>Task Delete</th>
          </tr>
        </thead>
        <tbody>
          {getTaskList()}
        </tbody>
      </Table>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={title}
        onSubmit={(value: any) => {handleSubmit(value);}}
        item={taskObj}
        edit= {editValue}
      />
    </React.Fragment>
  );
};

export default TaskTable;
