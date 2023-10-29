import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Guid } from 'guid-typescript';
import gql from 'graphql-tag';
import { TodoItemInput } from 'src/app/types/TodoItemInput';
import { ITodoItemInput } from '../../../../../../Common/models/ITodoItemInput';

@Component({
  selector: 'atp-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  EarliestDate!: Date;
  ngOnInit() {
    this.EarliestDate = new Date();
  }
  Title: string;
  Description?: string;
  DueDate: Date;
  constructor(private apollo: Apollo) {
    this.Title = '';
    this.Description = '';
    this.DueDate = new Date();
  }
  Add(): void {
    const todo: ITodoItemInput = new TodoItemInput();
    todo.Completed = false;
    todo.Id = Guid.create().toString();
    todo.CreationDate = new Date();
    todo.Title = this.Title;
    todo.Description = this.Description;
    todo.DueDate = this.DueDate;

    this.apollo.mutate({
      mutation: gql`
        mutation Add($input: TodoItemInput!) {
          Add(TodoItem: $input) {
            Title
          }
        }
      `, variables: {
        input: todo
      }
    }).subscribe();
    this.Reset();
  }

  private Reset(): void {
    this.Title = ``;
    this.Description = ``;
    this.DueDate = new Date();
  }

}
