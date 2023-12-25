import {createClient, type ClientConfig} from '@sanity/client'

const config: ClientConfig = {
    projectId: '5e1spvi8',
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2023-12-23', // use current date (YYYY-MM-DD) to target the latest API version
}
const client = createClient(config);

export default client;
