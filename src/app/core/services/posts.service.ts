import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GitHubApiService } from './api/githubApi.service';

export interface Post {
  id?: string;
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly filePath = 'example.json';
  private readonly commitMessage = `Блог оновлено - ${new Date().toISOString()}`;
  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private gitHubApiService: GitHubApiService) {}

  loadPosts(): Observable<Post[]> {
    return this.gitHubApiService.loadFile(this.filePath).pipe(
      tap((posts: Post[]) => this.postsSubject.next(posts))
    );
  }

  addPost(newPost: Post): void {
    const posts = this.postsSubject.getValue();
    newPost.id = this.gitHubApiService.generateId('post');
    this.postsSubject.next([...posts, newPost]);
  }

  editPost(updatedPost: Post): void {
    const posts = this.postsSubject.getValue().map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    this.postsSubject.next(posts);
  }

  deletePost(id: string): void {
    const posts = this.postsSubject.getValue().filter((post) => post.id !== id);
    this.postsSubject.next(posts);
  }

  savePosts(): Observable<any> {
    const posts = this.postsSubject.getValue();
    return this.gitHubApiService.getFileSha(this.filePath).pipe(
      switchMap((sha) => this.gitHubApiService.saveFile(this.filePath, posts, this.commitMessage, sha))
    );
  }
}
