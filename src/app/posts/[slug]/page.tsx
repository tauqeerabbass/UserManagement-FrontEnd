"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/${slug}`);
      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching post with slug:", slug);
    fetchPost();
  }, [slug]);

  if (!post) return <p className="text-center mt-40">Loading...</p>;

  return (
    <div className="min-h-screen overflow-y-auto p-10 bg-gray-50">
      <h1 className="text-4xl font-semibold mb-10 text-center mt-16">
        {post.title}
      </h1>
      <div className="flex justify-center mt-10 w-full">
        <img
          src={
            "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlzc2FuJTIwcjM1JTIwZ3RyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"
          }
          alt={post?.name}
          className="w-10/12 h-140 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="text-[16px] md:text-xl mt-10 px-8 md:px-14 lg:px-28 xl:px-36 2xl:px-60">
      {post.content && (
        <>
          <h2 className="font-semibold ">Content</h2>
          <p className="text-start mt-5 text-gray-600">{post.content}</p>
        </>
      )}
      {post.description && (
        <>
          <h2 className="font-semibold mt-10">Description</h2>
          <p className="text-start mt-5 text-gray-600">
            {post.description}
          </p>
        </>
      )}
      </div>
      {/* <p className="text-start mt-10 px-52 py-10">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel accusamus
        architecto nam quae distinctio libero natus veniam? Beatae, autem, id
        veritatis distinctio modi sint sapiente accusantium pariatur assumenda
        natus odit! Aut exercitationem error vero optio, nobis iste tempore
        voluptatibus necessitatibus quaerat minus provident a aperiam non,
        impedit reprehenderit maxime repellendus, libero placeat suscipit
        accusamus deleniti quibusdam unde dolores odio. Voluptatum! Ad neque
        magni fugit eaque expedita saepe reiciendis impedit doloribus quidem,
        illo, harum obcaecati esse earum dolor nostrum culpa porro quo quaerat
        sequi optio quisquam, labore quibusdam consequuntur inventore! Ea! Qui
        maiores facere voluptates ullam? Aspernatur laborum laudantium esse
        molestias beatae ullam minima id non. Inventore facere beatae asperiores
        minus magni in consequatur maxime, aliquam voluptatem repellat eos
        possimus iure. Sequi, amet. Repellat illo sequi adipisci atque saepe
        veritatis nisi autem hic necessitatibus voluptatem aliquid, nesciunt
        odit corrupti assumenda nihil aut eveniet! Iure, asperiores eligendi
        alias vitae nam tempora temporibus.
      </p> */}
    </div>
  );
}
