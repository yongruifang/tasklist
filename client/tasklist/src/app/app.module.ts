import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
// import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { OverdueTasksComponent } from './components/overdue-tasks/overdue-tasks.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    AllTasksComponent,
    OverdueTasksComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatNativeDateModule, // This is needed to make the date picker work
    HttpClientModule,
    ApolloModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(httpLink: HttpLink, apollo: Apollo) {
    apollo.create({
      link: httpLink.create({ uri: 'https://ph4lk07bwf.execute-api.us-east-1.amazonaws.com/dev/graphql' }),
      cache: new InMemoryCache() as any,
      defaultOptions: {
        watchQuery: {
          // To get the data on each get, set the fetchPolicy
          fetchPolicy: 'network-only'
        }
      }
    });
  }
}
