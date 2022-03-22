export function createTaskService(task: any) {
  return new Promise((resolve, reject) => {
    let taskList = [];
    const tasklistTemp = sessionStorage.getItem('taskList');
    if (tasklistTemp && tasklistTemp !== null) {
      taskList = JSON.parse(tasklistTemp);
      taskList.push(task);
      sessionStorage.setItem('taskList', JSON.stringify(taskList));
      resolve(taskList);
    } else {
      taskList.push(task);
      sessionStorage.setItem('taskList', JSON.stringify(taskList));
      resolve(taskList);
    }
    reject('Error');
  });
}
export function updateTaskService(task: any) {
  return new Promise((resolve, reject) => {
    let taskList = [];
    const tasklistTemp = sessionStorage.getItem('taskList');
    if (tasklistTemp && tasklistTemp !== null) {
      taskList = JSON.parse(tasklistTemp);
      const index = taskList.findIndex((element: any) => element.id === task.id);
      taskList.splice(index, 1, task);
      sessionStorage.setItem('taskList', JSON.stringify(taskList));
      resolve(taskList);
    } else {
      reject('Error');
    }
  });
}
export function getTaskService() {
  return new Promise((resolve, reject) => {
    let taskList = sessionStorage.getItem('taskList');
    if (taskList && taskList !== null) {
      taskList = JSON.parse(taskList);
      resolve(taskList);
    } else {
      reject('Error');
    }
  });
}
export function deleteTaskService(id: any) {
  return new Promise((resolve, reject) => {
    let taskList = [];
    const tasklistTemp = sessionStorage.getItem('taskList');
    if (tasklistTemp && tasklistTemp !== null) {
      taskList = JSON.parse(tasklistTemp);
      const index = taskList.findIndex((element: any) => element.id === id);
      taskList.splice(index, 1);
      sessionStorage.setItem('taskList', JSON.stringify(taskList));
      resolve(taskList);
    } else {
      reject('Error');
    }
  });
}
