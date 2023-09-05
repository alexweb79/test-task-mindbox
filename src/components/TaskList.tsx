import React, {useState} from 'react';
import {Row, Col, List, Button, Radio, Typography} from 'antd';

const {Title} = Typography;

interface TaskListProps {
    tasks: string[];
    completedTasks: string[];
    markTaskAsCompleted: (index: number) => void;
    deleteAllCompletedTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
   tasks,
   completedTasks,
   markTaskAsCompleted,
   deleteAllCompletedTasks,
}) => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTasks =
        filter === 'active'
            ? tasks
            : filter === 'completed'
                ? completedTasks
                : tasks.concat(completedTasks);

    const visibleTasksCount = filteredTasks.length;

    const renderItem = (task: string, index: number, isCompleted: boolean) => (
        <List.Item>
            <Title level={3}>{task}</Title>
            {!isCompleted && <Button data-testid="markTaskAsCompletedButton" onClick={() => markTaskAsCompleted(index)}>Mark as Completed</Button>}
        </List.Item>
    );

    const handleDeleteAllCompletedTasks = () => {
        deleteAllCompletedTasks();
    };

    return (
        <>
            <List
                dataSource={filteredTasks}
                renderItem={(task, index) => renderItem(task, index, completedTasks.includes(task))}
            />
            <Row justify="space-between" align="middle">
                <Col span={5}>
                    {visibleTasksCount} items left
                </Col>
                <Col>
                    <Radio.Group
                        onChange={(e) => setFilter(e.target.value)}
                        value={filter}
                    >
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button value="active">Active</Radio.Button>
                        <Radio.Button value="completed">Completed</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={5} style={{textAlign: 'right'}}>
                    <Button
                        type="default"
                        danger onClick={handleDeleteAllCompletedTasks}
                        disabled={!completedTasks.length}
                        data-testid="clearCompletedButton"
                    >
                        Clear completed
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export {TaskList};
