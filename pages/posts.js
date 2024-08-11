import { fetchEntries } from '../../lib/contentful';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>{post.fields.title}</h1>
      <div>
        <ReactMarkdown>{post.fields.content}</ReactMarkdown>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await fetchEntries();
  const paths = posts.map(post => ({
    params: { slug: post.fields.slug }
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const posts = await fetchEntries();
  const post = posts.find(post => post.fields.slug === params.slug);

  return {
    props: {
      post
    }
  };
}
