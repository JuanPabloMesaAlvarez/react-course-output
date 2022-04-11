import { useState } from 'react';
import useHttp from '../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  const [isLoading, error, sendData] = useHttp();

  const enterTaskHandler = async (taskText) => {

    const requestConfig = {
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'POST',
      body: {
        userId: 1,
        title: taskText,
        completed: false
      },
      headers: {
        'Content-Type': 'application/json',
      }
    };

    sendData((data) => {
      const generatedId = data.id; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    }, requestConfig)

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
