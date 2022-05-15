import { fromGlobalId } from "graphql-relay";
import { Todo } from "../../models/Todo";

export const loadAll = async (ownerId: string) => {
  const todos = await Todo.find({ owner: ownerId })
    .sort("-createdAt")
    .populate("owner");

  return todos;
};

export const load = async (ownerId: string, globalId: string) => {
  const { id } = fromGlobalId(globalId);

  const todo = await Todo.findOne({ _id: id })
  .populate("owner");

  if (!todo) {
    return null;
  }

  if (!todo.owner.equals(ownerId)) {
    return null;
  }

  return todo;
};
