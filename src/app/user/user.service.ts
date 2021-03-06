import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ApolloQueryResult, gql } from '@apollo/client/core';

export const GET_USER_QUERY = gql`
  query ($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export interface UserQueryResponse {
  user: User | null;
  errors: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUserFromId(id: string): Observable<ApolloQueryResult<UserQueryResponse>> {
    return this.apollo.watchQuery<UserQueryResponse>({
      query: GET_USER_QUERY,
      variables: { id: id },
    }).valueChanges;
  }
}
