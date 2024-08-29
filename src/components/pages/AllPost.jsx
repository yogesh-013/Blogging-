import React  ,{useState , useEffect} from 'react'
import service from '../../appwrite/service.js'
import PostCard from '../PostCard.jsx'
import Container from '../container/container.jsx'
function AllPost() {
    const [posts , setPosts ] = useState([])
    useEffect(() => {
      service.getPosts().then((posts) => {
          if (posts) {
              setPosts(posts.documents)
          }
      })
  }, [])

   
    return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {posts && posts.map((post)=>(
         <div key = {post.$id} className='w-1/4 p-2'>
          <PostCard  {...post}/>
          </div>
        ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPost
