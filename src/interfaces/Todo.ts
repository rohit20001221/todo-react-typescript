export interface Todo {
  title: string;
  subtitle: string;
  isCompleted: boolean;
  dateCreated: string;
}

export interface TodoItemProps {
  item: Todo;
}

export interface TodoCollectionType {
  todos: Array<any>;
}
