import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function Profile() {
  const { data, error } = useSWR("/api/me", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>hello {data.username}!</div>;
}

export default Profile;
