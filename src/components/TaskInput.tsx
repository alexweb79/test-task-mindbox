import React, {useState} from 'react';
import {Row, Col, Input, Button} from 'antd';

interface TaskInputProps {
    addTask: (task: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({addTask}) => {
    const [task, setTask] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleAddTask = () => {
        if (task.trim() !== '') {
            addTask(task);
            setTask('');
        }
    };

    return (
        <Row align="middle" gutter={[8, 8]}>
            <Col flex="auto">
                <Input
                    placeholder="Enter a new task"
                    value={task}
                    onChange={handleInputChange}
                    onKeyDown={e => e.key === 'Enter' ? handleAddTask() : null}
                    data-testid="addTaskInput"
                />
            </Col>
            <Col flex="none">
                <Button
                    type="primary"
                    onClick={handleAddTask}
                    data-testid="addTaskButton"
                >
                    Add Task
                </Button>
            </Col>
        </Row>
    );
};

export {TaskInput};
