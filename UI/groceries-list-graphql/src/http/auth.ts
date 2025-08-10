import { gql, type TypedDocumentNode } from "@apollo/client";

export const LOGIN: TypedDocumentNode<LoginOutput, LoginInput> = gql`
  mutation LoginUser($loginInput: LoginInput!){
		loginUser(loginInput: $loginInput){
			accessToken,
			user {
				id,
				email,
				firstName,
				lastName,
				roles
			}
		}
	}
`;

export const REFRESH_TOKEN: TypedDocumentNode<RefreshTokenOutput, {}> = gql`
  mutation RefreshToken{
    refreshToken{
      accessToken,
      user{
				id,
        email,
        firstName,
        lastName,
				roles
      }
    }
  }
`;

export interface LoginInput {
	loginInput: {
		email: string,
		password: string
	}
}

export interface LoginOutput {
	loginUser: UserData;
}

export interface RefreshTokenOutput {
	refreshToken: UserData;
}

export interface User {
	id: string;
	firstName: string,
	lastName: string,
	email: string,
	roles: string[]
}

export interface UserData{
	user: User,
	accessToken: string
}