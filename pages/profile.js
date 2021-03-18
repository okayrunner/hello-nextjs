import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function Profile() {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users/1', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <div>hello {data.name}!</div>
}

export default Profile