import { useState } from "react"
import appwriteService from "../appwrite/main"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "../components";

export default function EditPost(){
    const [post, setPost] = useState([]);
    const slug = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug)
            .then((res) =>{
                if(res) setPost(res);
            })
        }
        else{
            navigate("/");
        }
    },[slug, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}