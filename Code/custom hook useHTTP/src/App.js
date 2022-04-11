import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';
import SimpleInput from './components/SimpleInput';

function App() {
  const [isLoading, error, fetchFn] = useHttp();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async (taskText) => {

    await fetchFn((data) => {
      const loadedTasks = data.sort((a, b) => b.id - a.id).map(todo => {
        return {
          id: todo.id,
          text: todo.title
        }
      });

      setTasks(loadedTasks);
    }, { url: 'https://jsonplaceholder.typicode.com/todos' });

  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <SimpleInput />
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
