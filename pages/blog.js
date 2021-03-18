function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    //  Incremental Static Regeneration allows you to update existing 
    // pages by re-rendering them in the background as traffic comes in.
    // Inspired by stale-while-revalidate, background regeneration ensures 
    // traffic is served uninterruptedly, always from static storage, 
    // and the newly built page is pushed only after it's done generating.
    //
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 second
    //
    // Now the list of blog posts will be revalidated once per second; 
    // if you add a new blog post it will be available almost immediately, 
    // without having to re-build your app or make a new deployment.
    // :mind-blown:
    revalidate: 1, // In seconds
  }
}




export default Blog