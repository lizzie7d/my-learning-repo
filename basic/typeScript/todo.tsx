[
  {
    id: 1,
    text: '待办事项1',
    done: true,
  },
  {
    id: 2,
    text: '待办事项2',
    done: false,
  },
  {
    id: 3,
    text: '待办事项3',
    done: false,
  },
];

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const todoItem: Todo = {
  id: 1,
  text: '待办事项1',
  done: true,
};

function handleClick(todo: Todo) {
  return {
    ...todo,
    done: !todo.done,
  };
}
