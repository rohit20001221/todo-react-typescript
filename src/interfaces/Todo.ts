export interface Todo {
  title: string;
  subtitle: string;
  isCompleted: boolean;
  dateCreated: string;
  id: Number | null;
}

export interface TodoItemProps {
  item: Todo;
}

export interface TodoCollectionType {
  todos: Array<any>;
}
