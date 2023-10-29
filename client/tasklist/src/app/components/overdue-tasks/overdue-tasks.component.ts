import { Component, OnInit, Output } from '@angular/core';
import { ITodoItem } from '../../../../../../Common/models/TodoItem';
import { Apollo } from 'apollo-angular';
import { OverdueTodoItemQuery, TodoItemQuery } from 'src/app/types/TodoItemQuery';
import gql from 'graphql-tag';
import { SubscriptionBase } from '../../types/SubscriptionBase';

@Component({
  selector: 'atp-overdue-tasks',
  templateUrl: './overdue-tasks.component.html',
  styleUrls: ['./overdue-tasks.component.scss']
})
export class OverdueTasksComponent extends SubscriptionBase implements OnInit {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  ngOnInit() {
    this.Subscribe<OverdueTodoItemQuery>(gql`query ItemsQuery {
      OverdueTodoItems {
        Id,
        Title,
        Description,
        DaysCreated,
        DueDate,
        Completed
      }
    }`).subscribe(todo => {
      this.todos = new Array<ITodoItem>();
      todo.data.OverdueTodoItems.forEach(x => {
        this.todos.push(x);
      });
    });
  }
}
