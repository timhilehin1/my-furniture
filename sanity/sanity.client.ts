import {createClient, type ClientConfig} from '@sanity/client'

const config: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // or the name you chose in step 1
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_TOKEN, // use current date (YYYY-MM-DD) to target the latest API version
}
const client = createClient(config);

export default client;
