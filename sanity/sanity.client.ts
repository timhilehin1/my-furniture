import {createClient, type ClientConfig} from '@sanity/client'

const config: ClientConfig = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: process.env.SANITY_API_TOKEN, // use current date (YYYY-MM-DD) to target the latest API version
}
const client = createClient(config);

export default client;
