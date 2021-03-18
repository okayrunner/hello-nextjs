function Todos({ todos }) {
    return (
      <ul>
      {todos.map((todo) => (
        <li>{todo.title}</li>
      ))}
      </ul>
    )
  }

  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
    const todos = await res.json()
  
    // Pass data to the page via props
    return { props: { todos } }
  }

  export default Todos