import { useState, useEffect } from "react";
import React from "react";
import AddPost from "./components/AddPosts";
import Post from "./components/post";

function App() {
  const [posts, setPosts] = useState([]);
  const [catImages, setCatImages] = useState([]);

  const fetchPosts = async () => {
    const response1 = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=4"
    );
    const data1 = await response1.json();

    const response2 = await fetch(
      "https://cataas.com/api/cats?limit=10&skip=0"
    );
    const data2 = await response2.json();

    const combinedData = [...data1, ...data2];

    setPosts(combinedData);
  };

  const fetchCatImages = async () => {
    try {
      const response = await fetch(
        "https://cataas.com/api/cats?limit=10&skip=0"
      );
      const data = await response.json();
      setCatImages(data);
    } catch (error) {
      console.error("Ошибка при загрузке изображений котиков:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCatImages();
  }, []);

  const addPost = async (title, body) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    setPosts((prevPosts) => [data, ...prevPosts]);
  };

  const deletePost = async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    }
  };

  return (
    <main>
      <h1>Consuming REST api tutorial</h1>
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            imagesUrl={catImages.url}
            deletePost={deletePost}
          />
        ))}
      </section>
    </main>
  );
}
export default App;
