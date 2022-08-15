import axios from 'axios'

export default fetchData = async()=>{
    await axios.post(`https://id.twitch.tv/oauth2/token?client_id=71n9jotfv4acipnlmuxyy6btvrik4u&client_secret=${process.env.SECRET_KEY}&grant_type=client_credentials`);
};

fetchData();