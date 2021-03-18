import useSWR from "swr";
import { request } from "graphql-request";
import styles from "../styles/Home.module.css";

const clientFetcher = (query) => request("/graphql", query);

const serverFetcher = (query) =>
  request("http://localhost:3000/graphql", query);

const QUERY = `query catalog {
  catalog {
    courses {
      id
      title
      enrollmentStatus
    }
  }
}`;

export default function Catalog(props) {
  const { data, err, mutate } = useSWR(QUERY, clientFetcher, {
    initialData: props.data,
  });

  if (err) {
    return <div>failed to load</div>;
  }

  if (!data) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <button onClick={() => mutate()}>Refetch!</button>
        <div className={styles.grid}>
          {data.catalog.courses.map((course) => (
            <div key={course.id} className={styles.card}>
              <h3>{course.title}</h3>
              <h6>{course.enrollmentStatus}</h6>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await serverFetcher(QUERY);
  return {
    props: {
      data: data,
    },
  };
}
