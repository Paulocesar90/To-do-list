import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from '@phosphor-icons/react';
import { ThemeProvider } from 'styled-components';
import styles from './App.module.css';
import { Button } from './components/Button';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { Empty } from './components/List/Empty';
import { Header as ListHeader } from './components/List/Header';
import { Item } from './components/List/Item';
import { GlobalStyles } from './components/GlobalStyles';
import { lightTheme, darkTheme } from './components/Themes';
import ToggleThemeButton from './components/ToggleThemeButton';

export interface ITask {
  id: number;
  text: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const checkedTasksCounter = tasks.reduce(
    (prevValue, currentTask) => (currentTask.isChecked ? prevValue + 1 : prevValue),
    0
  );

  function handleAddTask() {
    if (!inputValue) {
      return;
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    };

    setTasks((state) => [...state, newTask]);
    setInputValue('');
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (!window.confirm('Deseja mesmo apagar essa tarefa?')) {
      return;
    }

    setTasks(filteredTasks);
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isChecked: value } : task
    );

    setTasks(updatedTasks);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }

  const themeToggler = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <main className={`${styles.appContainer} ${theme}`}>
          <Header />

          <section className={styles.content}>
            <div className={styles.taskInfoContainer}>
              <Input
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                value={inputValue}
              />
              <Button onClick={handleAddTask}>
                Criar
                {theme === 'light' ? <PlusCircle size={16} color="#f2f2f2" weight="bold" /> : <PlusCircle size={16} color="#f2f2f2" weight="bold" />}
              </Button>
            </div>

            <div className={styles.tasksList}>
              <ListHeader
                tasksCounter={tasks.length}
                checkedTasksCounter={checkedTasksCounter}
              />

              <AnimatePresence>
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <Item
                      data={task}
                      removeTask={() => handleRemoveTask(task.id)}
                      toggleTaskStatus={handleToggleTask}
                      theme={theme}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {tasks.length === 0 && <Empty />}
            </div>

            <ToggleThemeButton theme={theme} onToggle={themeToggler} />
          </section>
        </main>
      </>
    </ThemeProvider>
  );
}
