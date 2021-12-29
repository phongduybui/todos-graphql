export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type AddTaskInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Priority>;
  task_description: Scalars['String'];
  task_due?: InputMaybe<Scalars['Date']>;
  task_name: Scalars['String'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  task_id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask?: Maybe<Task>;
  deleteTask?: Maybe<DeleteTaskPayload>;
  login?: Maybe<AuthPayload>;
  register?: Maybe<AuthPayload>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  task: AddTaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  user_name: Scalars['String'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID'];
  task: UpdateTaskInput;
};

export enum Priority {
  High = 'high',
  Low = 'low',
  Medium = 'medium'
}

export enum Provider {
  Google = 'google',
  System = 'system'
}

export type Query = {
  __typename?: 'Query';
  me: User;
  task: Task;
  tasks?: Maybe<TasksPayload>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTasksArgs = {
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<TasksOrderByInput>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Task = {
  __typename?: 'Task';
  completed: Scalars['Boolean'];
  priority: Priority;
  task_description?: Maybe<Scalars['String']>;
  task_due: Scalars['Date'];
  task_id: Scalars['ID'];
  task_name: Scalars['String'];
  user_id: Scalars['String'];
};

export type TasksOrderByInput = {
  task_due?: InputMaybe<Sort>;
  task_name?: InputMaybe<Sort>;
};

export type TasksPayload = {
  __typename?: 'TasksPayload';
  count: Scalars['Int'];
  tasks: Array<Task>;
};

export type UpdateTaskInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  priority?: InputMaybe<Priority>;
  task_description?: InputMaybe<Scalars['String']>;
  task_due?: InputMaybe<Scalars['Date']>;
  task_name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  email: Scalars['String'];
  provider: Provider;
  user_id: Scalars['ID'];
  user_name: Scalars['String'];
};
