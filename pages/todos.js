import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function Todos({ todos }) {
    const { data,error } = useSWR('https://mockend.com/okayrunner/hello-nextjs-data/todos?limit=5', fetcher, { initialData: todos })

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
    return (
      <ul>
      {data.map((todo) => (
        <li>{todo.title}</li>
      ))}
      </ul>
    )
  }

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://mockend.com/okayrunner/hello-nextjs-data/todos`)
  const todos = await res.json()
  
  // Pass data to the page via props
  return { props: { todos } }
}

export default Todos