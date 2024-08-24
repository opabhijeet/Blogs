import { useEffect, useState } from "react";
import appwriteService from  "../appwrite/main";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";


export default function Home() {
    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if(user){
            appwriteService.getPosts()
            .then((res) => {
                if(res) setPosts(res.documents);
            })
        }
        else {
            setPosts([]);
        }
    }, [user]);

    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to view posts
                        </h1>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}