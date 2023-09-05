import React, {useState} from 'react';
import {Row, Col, Typography} from 'antd';
import {TaskInput} from '../components/TaskInput';
import {TaskList} from '../components/TaskList';

const {Title} = Typography;

const TodosPage: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    const addTask = (task: string) => {
        setTasks([...tasks, task]);
    };

    const markTaskAsCompleted = (index: number) => {
        const completedTask = tasks[index];
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        setCompletedTasks([...completedTasks, completedTask]);
    };

    const deleteAllCompletedTasks = () => {
        setCompletedTasks([]);
    };

    return (
        <Row>
            <Col span={12} offset={6}>
                <Title level={1}>Todos</Title>
                <TaskInput addTask={addTask}/>
                <TaskList
                    tasks={tasks}
                    completedTasks={completedTasks}
                    markTaskAsCompleted={markTaskAsCompleted}
                    deleteAllCompletedTasks={deleteAllCompletedTasks}
                />
            </Col>
        </Row>
    );
}

export {TodosPage};
