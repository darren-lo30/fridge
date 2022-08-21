export interface User {
  id: string
  email: string,
  fullName: string,
}


export interface ResponseWithUser {
  user: User,
}