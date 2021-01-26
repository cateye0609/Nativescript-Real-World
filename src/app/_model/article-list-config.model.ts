export interface ArticleQueryOption {
  type: string;
  option: {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  };
}