import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {TaskList} from './TaskList';

const tasks = ['Task 1', 'Task 2'];
const completedTasks = ['Completed Task'];

describe('TaskList', () => {
    test('renders TaskList component with tasks and completed tasks', () => {
        render(
            <TaskList
                tasks={tasks}
                completedTasks={completedTasks}
                markTaskAsCompleted={() => {}}
                deleteAllCompletedTasks={() => {}}
            />
        );

        tasks.forEach((task) => {
            const taskElement = screen.getByText(task);
            expect(taskElement).toBeInTheDocument();
        });

        completedTasks.forEach((completedTask) => {
            const completedTaskElement = screen.getByText(completedTask);
            expect(completedTaskElement).toBeInTheDocument();
        });
    });

    test('markTaskAsCompleted function is called when "Mark as Completed" button is clicked', () => {
        const tasks = ['Task 1', 'Task 2', 'Task 3'];
        const markTaskAsCompleted = jest.fn();

        render(
            <TaskList
                tasks={tasks}
                completedTasks={[]}
                markTaskAsCompleted={markTaskAsCompleted}
                deleteAllCompletedTasks={() => {}}
            />
        );

        const markAsCompletedButtons = screen.getAllByTestId('markTaskAsCompletedButton');

        fireEvent.click(markAsCompletedButtons[0]);

        expect(markTaskAsCompleted).toHaveBeenCalled();
    });

    test('Clicking "Clear completed" button calls deleteAllCompletedTasks', () => {
        const tasks = ['Task 1', 'Task 2'];
        const completedTasks = ['Completed Task 1', 'Completed Task 2'];
        const deleteAllCompletedTasks = jest.fn();

        render(
            <TaskList
                tasks={tasks}
                completedTasks={completedTasks}
                markTaskAsCompleted={() => {}}
                deleteAllCompletedTasks={deleteAllCompletedTasks}
            />
        );

        const deleteAllButton = screen.getByTestId('clearCompletedButton');
        fireEvent.click(deleteAllButton);

        expect(deleteAllCompletedTasks).toHaveBeenCalledTimes(1);
    });
});
