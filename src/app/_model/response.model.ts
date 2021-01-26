import { Article, ArticleComment } from './article.model';
import { Profile } from './profile.model';
import { User } from './user.model';

export interface UserResponse {
    user: User;
}

export interface ProfileResponse {
    profile: Profile;
}

export interface ArticleResponse {
    article: Article;
}

export interface ArticleListResponse {
    articles: Article[];
    articlesCount: number;
}

export interface TagListResponse {
    tags: string[];
}

export interface CommentResponse {
    comments: ArticleComment[];
}