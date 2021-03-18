import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = (query) => request("/graphql", query);

export default function Me() {
  const { data, error } = useSWR(
    `query me {
      me {
        id
        username
      }
    }`,
    fetcher
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (!data) return <div>loading...</div>;

  return <div>You're signed in as {data.me.username}</div>;
}
