export const GEN_AI_TYPES = {
    CLAUDE_V1: 'CLAUDE_V1',
    TITAN: 'TITAN',
};

export default class GenAIAPIClient {
    constructor(props) {
       const { type, payload } = props;
       this._type = type;
 
       switch (type) {
           case GEN_AI_TYPES.CLAUDE_V1: {
               break;
           }
           case GEN_AI_TYPES.TITAN:
               break;
           default:
               throw new Error('Unknown AI Model Type');
       }
    }
 
    invokeInstance = async function() {
        const result = await this.makeRequest({
                   payload: this._payload,
               });
        return result;
    };
 
    makeRequest = async function(props) {
        const {
            payload,
        } = props;
 
        try {
         const result = await fetch('http://localhost:3000/pvbot', {
             headers: {
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': 'http://localhost:8000,https://www.primevideo.com',
                 'Access-Control-Allow-Methods': 'POST,OPTIONS'
             },
             body: JSON.stringify(payload),
             method: 'POST',
         }).then((res) => res.json())
         .catch((err) => console.log(err));
     
         console.log('Successfully received data: ', result);
         return result;
       } catch (error) {
         console.log('An error occurred', error);
     
         throw error;
       }
    };
 }