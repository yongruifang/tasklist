import { Apollo } from 'apollo-angular';
import { ApolloQueryResult, DocumentNode, TypedDocumentNode } from '@apollo/client/core';
import { ITodoItem } from '../../../../../Common/models/TodoItem';
import { OverdueTodoItemQuery, TodoItemQuery } from 'src/app/types/TodoItemQuery';
import { Observable } from 'rxjs';
import { GraphQLError } from 'graphql';

type ApolloQueryResultWithStale<T> = ApolloQueryResult<T> & { stale: boolean };

export class SubscriptionBase {
    todos: ITodoItem[] = new Array<ITodoItem>();
    constructor(private apollo: Apollo) {
    }
    protected Subscribe<T extends OverdueTodoItemQuery | TodoItemQuery>(gqlQuery: DocumentNode | TypedDocumentNode<T, {}>): Observable<ApolloQueryResultWithStale<T>> {
        return this.apollo.query<T>({
            query: gqlQuery,
            fetchPolicy: 'no-cache'
        }) as Observable<ApolloQueryResultWithStale<T>>;
    }
    resubscribe = (event: string) => {
        const index = this.todos.findIndex(x => x.Id === event);
        this.todos.splice(index, 1);
    }
}