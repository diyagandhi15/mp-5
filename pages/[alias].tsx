import { GetServerSideProps, NextPage } from "next";
import { connect } from "../lib/db";
import { COLLECTION_NAMES } from "../types";

interface AliasPageProps {
    notFound?: boolean;
}

const AliasPage: NextPage<AliasPageProps> = ({ notFound }) => {
    if (notFound) {
        return <h1>URL Not Found</h1>;
    }
    return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const alias = context.params?.alias as string;
    const db = await connect();
    const collection = db.collection(COLLECTION_NAMES.URL_INFO);

    const urlDoc = await collection.findOne({ alias });
    if (urlDoc) {
        return {
            redirect: {
                destination: urlDoc.url,
                permanent: false,
            },
        };
    }

    return { props: { notFound: true } };
};

export default AliasPage;