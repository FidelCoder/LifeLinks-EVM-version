import React, { useState, useEffect } from "react";
import { initializeContracts } from "../../contractInstance";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [socialInteractionsContract, setSocialInteractionsContract] = useState(null);

    useEffect(() => {
        const init = async () => {
            const contracts = await initializeContracts();
            setSocialInteractionsContract(contracts["contract2"]);
        };
        init();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let allPosts = [];
                let i = 1;
        
                while (true) {
                    try {
                        let post = await socialInteractionsContract.methods.getPost(i).call();
                        if (!post.isDeleted) {
                            let likes = await socialInteractionsContract.methods.getPostLikes(i).call();
                            let comments = await socialInteractionsContract.methods.getCommentsOnPost(i).call();
        
                            allPosts.push({
                                ...post,
                                likes,
                                comments
                            });
                        }
                        i++;
                    } catch (err) {
                        // Assuming that if getPost(i) fails, post i doesn't exist, so we break the loop.
                        break;
                    }
                }
                
                setPosts(allPosts);
        
            } catch (error) {
                console.log(error)
                console.error("Failed to fetch posts:", error);
            }
        };
        
        

        if (socialInteractionsContract) {
            fetchPosts();
        }
    }, [socialInteractionsContract]);

    return (
        <div className="posts">
            {posts.map((post, index) => (
                <Post post={post} key={index}/>  // Using index as a key since _id is not present
            ))}
        </div>
    );
};

export default Posts;
