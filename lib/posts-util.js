import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { v4 as uuidv4 } from "uuid";
const postsDirectory = path.join(process.cwd(), "posts");

export function getPostFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(fileIdentifier) {
  const postSlug = fileIdentifier.replace(/\.md$/, ""); // 확장자명 지우기
  const filePath = path.join(postsDirectory, `${postSlug}.md`); //md파일 경로
  const fileContent = fs.readFileSync(filePath, "utf-8"); //md파일 읽기
  const { data, content } = matter(fileContent); //md파일 객체로 변환

  const postData = {
    slug: postSlug,
    ...data,
    content,
    id: uuidv4(),
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostFiles();
  const allPosts = postFiles.map((postFile) => getPostData(postFile));
  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((post) => post.isFeatured === true);
  return featuredPosts;
}
