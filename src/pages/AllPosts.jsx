import { useEffect, useState } from "react";
import appwriteService  from "../appwrite/main";
import { Container, PostCard } from "../components";

export default function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts([])
        .then((response) => {
            if(response) setPosts(response.documents);
        })
    },[])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}