import { fetchEntries } from '../lib/contentful';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <h1>Car Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.fields.slug}>
            <Link href={`/posts/${post.fields.slug}`}>
              <a>{post.fields.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await fetchEntries();
  return {
    props: {
      posts
    }
  };
}
