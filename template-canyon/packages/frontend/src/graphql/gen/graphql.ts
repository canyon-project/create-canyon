/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type GetProjectsResponseModel = {
  __typename?: 'GetProjectsResponseModel';
  data: Array<ProjectRecordsModel>;
  total: Scalars['Float']['output'];
};

export type ProjectRecordsModel = {
  __typename?: 'ProjectRecordsModel';
  /** Description */
  description: Scalars['String']['output'];
  /** ID */
  id: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** 获取Project */
  getProjects: GetProjectsResponseModel;
};


export type QueryGetProjectsArgs = {
  current: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type GetProjectsQueryVariables = Exact<{
  current: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetProjectsQuery = { __typename?: 'Query', getProjects: { __typename?: 'GetProjectsResponseModel', total: number, data: Array<{ __typename?: 'ProjectRecordsModel', id: string, description: string }> } };


export const GetProjectsDocument = {"__meta__":{"hash":"4bde14338b2e74fcf81b5c85fe8da2847deab8ed"},"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"current"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"current"},"value":{"kind":"Variable","name":{"kind":"Name","value":"current"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;