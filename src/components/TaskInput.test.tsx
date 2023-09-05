import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import {TaskInput} from './TaskInput';

describe('TaskInput', () => {
    test('renders TaskInput component', () => {
        render(<TaskInput addTask={() => {}}/>);
        const inputElement = screen.getByTestId('addTaskInput');
        expect(inputElement).toBeInTheDocument();
    });

    test('addTask function is called on button click', () => {
        const addTaskMock = jest.fn();
        render(<TaskInput addTask={addTaskMock}/>);
        const inputElement = screen.getByTestId('addTaskInput');
        const addButton = screen.getByTestId('addTaskButton');

        fireEvent.change(inputElement, {target: {value: 'Test Task'}});
        fireEvent.click(addButton);

        expect(addTaskMock).toHaveBeenCalledWith('Test Task');
    });

    test('addTask function is called on Enter key down', () => {
        const addTaskMock = jest.fn();
        render(<TaskInput addTask={addTaskMock}/>);
        const inputElement = screen.getByTestId('addTaskInput');

        fireEvent.change(inputElement, {target: {value: 'Test Task'}});
        fireEvent.keyDown(inputElement, {key: 'Enter'});

        expect(addTaskMock).toHaveBeenCalledWith('Test Task');
    });
});
