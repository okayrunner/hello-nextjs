import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../apollo/client";
import Head from "next/head";

import styles from "../styles/Home.module.css";

const Query = gql`
  query Countries {
    countries(limit: 5) {
      id
      name
    }
  }
`;

export default function Countries() {
  const { data, loading, error, refetch } = useQuery(Query);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          {data.countries.map((country) => (
            <div key={country.code} className={styles.card}>
              <h3>{country.name}</h3>
              <p>{country.id}</p>
            </div>
          ))}
        </div>
        <button onClick={() => refetch()}>Refetch!</button>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: Query,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
