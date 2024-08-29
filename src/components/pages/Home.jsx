import React, {useEffect, useState} from 'react'
import service from '../../appwrite/service'
import {Container, PostCard} from '../index.js'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
     const userData = useSelector((state)=> state.auth.userData)
    
    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                const filteredPosts = posts.documents.filter(post => post.userId === userData.$id);
                setPosts(filteredPosts);
                console.log("Filtered Posts:", filteredPosts);
            }
        })
    }, [])
  if(!userData){
    return (
        <div className="w-full py-8 mt-4 text-center">
        <Container>
            <div className="flex flex-wrap">
                <div className="p-2 w-full">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                      Login to Read Posts Baby

                        

                    </h1>
                </div>
            </div>
        </Container>
    </div>
    )
  }
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts to show

                                

                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => 
                     (  
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>)
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Home