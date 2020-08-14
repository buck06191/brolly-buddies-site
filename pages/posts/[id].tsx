import Head from "next/head";

import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData, PostData, PostId } from "../../lib/posts";

import utilStyles from "../../styles/utils.module.css";

const Post: React.FC<{ postData: PostData }> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths = (): {
  paths: Array<PostId>;
  fallback: boolean;
} => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}): Promise<{ props: { postData: PostData } }> => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
