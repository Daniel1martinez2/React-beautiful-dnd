import './App.css';
import initialData from './initial-data'; 
import React, {useState} from 'react'; 
import Column from './Column'; 
import {DragDropContext} from 'react-beautiful-dnd'; 
function App() {
  const [initData, setInitData] = useState(initialData); 
  const onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if(!destination){
      return; 
    };
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }; 
    const column = initData.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds); 
    newTaskIds.splice(source.index, 1); 
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };
    const newState = {
      ...initData,
      columns: {
        ...initData.columns,
        [newColumn.id]: newColumn
      }
    }; 
    setInitData(newState);
    console.log(initData.columns['column-1'].taskIds);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd} >
      {initData.columnOrder.map(columnId => {
        const column = initData.columns[columnId];
        const tasks = column.taskIds.map(taskId => initData.tasks[taskId]); 
        return <Column key={column.id} column={column} tasks={tasks} />; 
      })}
    </DragDropContext>
  );
}

export default App;
