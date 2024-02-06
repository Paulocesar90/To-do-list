import { Trash, Check } from '@phosphor-icons/react';
import { ITask } from '../../App';
import styles from './Item.module.css';

interface Props {
  data: ITask;
  removeTask: (id: number) => void;
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
  theme: 'light' | 'dark';
}

export function Item({ data, removeTask, toggleTaskStatus, theme }: Props) {
  function handleTaskToggle() {
    toggleTaskStatus({ id: data.id, value: !data.isChecked });
  }

  function handleRemove() {
    removeTask(data.id);
  }

  const checkboxCheckedClassname = data.isChecked
    ? theme === 'light'
      ? styles['checkbox-checked-light']
      : styles['checkbox-checked']
    : theme === 'light'
    ? styles['checkbox-unchecked-light']
    : styles['checkbox-unchecked'];

  const paragraphCheckedClassname = data.isChecked
    ? theme === 'light'
      ? styles['paragraph-checked-light']
      : styles['paragraph-checked']
    : '';

  return (
    <div className={theme === 'light' ? styles['container-light'] : styles.container}>
      <div>
        <label className={theme === 'light' ? styles['label-light'] : styles.label} htmlFor="checkbox" onClick={handleTaskToggle}>
          <span className={`${theme === 'light' ? styles['checkbox-light'] : styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.isChecked && <Check size={12} />}
          </span>

          <p className={`${theme === 'light' ? styles['paragraph-light'] : styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button onClick={handleRemove}>
        <Trash size={16} color={theme === 'light' ? '#333333' : '#808080'} />
      </button>
    </div>
  );
}
