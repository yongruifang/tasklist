import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { ITodoItem } from '../../../../../../Common/models/TodoItem';
import { TodoItemQuery } from 'src/app/types/TodoItemQuery';
import { SubscriptionBase } from 'src/app/types/SubscriptionBase';
@Component({
  selector: 'atp-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],

})
export class AllTasksComponent extends SubscriptionBase implements OnInit {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  onload = false;

  ngOnInit() {
    // when waiting the data request, show the loading message
    this.Subscribe<TodoItemQuery>(gql`query ItemsQuery {
      TodoItems {
        Id,
        Title,
        Description,
        DaysCreated,
        DueDate,
        Completed
      }
    }`).subscribe(todo => {
      this.todos = new Array<ITodoItem>();
      todo.data.TodoItems.forEach(x => {
        this.todos.push(x);
      });
      this.onload = true;
    });
  }
}
