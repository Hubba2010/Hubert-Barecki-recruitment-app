export interface PostModel {
  userId: string | number,
  id: string | number,
  title: string,
  body: string
}

export interface PostCommentModel {
  postId: string | number,
  id: string | number,
  name: string,
  email: string,
  body: string
}
