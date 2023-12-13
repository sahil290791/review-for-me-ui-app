const aws = require('@aws-sdk/signature-v4');
const { Sha256 } = require('@aws-crypto/sha256-js');
import fetch from 'cross-fetch';

const GEN_AI_TYPES = {
    CLAUDE_V1: 'CLAUDE_V1',
    TITAN: 'TITAN',
};

const GEN_AI_MODEL_URLS = {
    CLAUDE_V1: {
        url: 'https://vmr47me5ra.execute-api.us-east-1.amazonaws.com/prod/bedrock_claude_instant_v1',
    },
    TITAN: {
        url: 'https://vmr47me5ra.execute-api.us-east-1.amazonaws.com/prod/bedrock_titan_text_g1',
    }
}

class GenAIAPIClient {
   static API_KEY = 'xegz1ZgcOc9ec4RKZsOsRalv7PI3ark9LbuX2JH0';
   static TEAM_IDENTIFIER = 'Team16';
   constructor(props) {
      const { type, payload } = props;
      this._type = type;

      switch (type) {
          case GEN_AI_TYPES.CLAUDE_V1: {
              this._payload = {
                  "prompt": "Provide a 100 word summary of London",
                  teamIdentifier: GenAIAPIClient.TEAM_IDENTIFIER,
                  "topP": 1,
                  "temperature": 0,
                  "maxTokenCount": 512
              };
              break;
          }
          case GEN_AI_TYPES.TITAN:
              console.log('active');
              break;
          default:
              throw new Error('Unknown AI Model Type');
      }
   }

   invokeInstance = function() {
       const result = this.makeRequest({
                  type: this._type,
                  payload: this._payload,
              });
       return result;
   };

   makeRequest = async function(props) {
       const {
           type,
           payload,
       } = props;

       const auth = {
           'accessKeyId': 'ASIAQ52I6ARQR3O5C7MA',
           'secretAccessKey': '+qnZIIQ2bEBRIa2rtpFG1x871hymgXnlKcjwV/xI',
           'sessionToken': 'FwoGZXIvYXdzEMT//////////wEaDCoeEQwy+h1bStUuiCK/Ab14iaX9Nnr9PvTYL0braShcQjOaSczfi4WVhiQyHF2+w7gzcFDueZiL+n9ZHs7gh5nCl+R9W0DmZCWYwEvl1gKuAScyFicSYnVcbTfck6nzgam/GpYfJKcuN7JA76pWhy7YxuuxLSXdWu0xbWAN6cLI2SsPw8cC7zIw9Wvb7GKpqaOhYas7+8Ex4Sgp1ILhIlM8jBowtwAZacuj0uYjuO1ZgvcFuuGIu+QXL+KTSkCwVHeOt/+9Y38WPvX8Tr1/KJz34KsGMi3ru5KszF7SIF9lRpzLJ8Vv9iJIF/vEGl2BTGsw4nyLcvjXDn2oBnyzRODniI0=',
        //    'expiration': '2023-12-12T02:19:55+00:00',
       };

       const apiUrl = new URL(GEN_AI_MODEL_URLS[type].url);

       const sigv4 = new aws.SignatureV4({
            service: 'execute-api',
            region: 'us-east-2',
            credentials: auth,
            sha256: Sha256,
            applyChecksum: false,
      });

      const signed = await sigv4.sign({
        method: 'POST',
        // hostname: apiUrl.host,
        path: apiUrl.pathname,
        // protocol: apiUrl.protocol,
        // withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
          host: apiUrl.hostname, // compulsory
          'X-Api-Key': GenAIAPIClient.API_KEY,
        },
        mode: 'no-cors',
        body: JSON.stringify(payload),
      });

       try {
        const { data } = await fetch(GEN_AI_MODEL_URLS[type].url, {
          ...signed,
        });
    
        console.log('Successfully received data: ', data);
        return data;
      } catch (error) {
        console.log('An error occurred', error);
    
        throw error;
      }
   };
}

class PVGenAI {
    constructor(props) {
        const { type } = props;
        // this.appendScript();
        this.aiInstance = new GenAIAPIClient({
            type,
            payload: '',
        });
    }

    // appendScript = function() {
    //     const script = document.createElement('script');
    //     // use local file
    //     // script.src = 'script.js';
    //     // script.src =
    //        // 'https://cdn.jsdelivr.net/npm/aws4@1.12.0/aws4.min.js';
    //     script.type = 'module';
    //     script.onload = () => {
    //         console.log('Script loaded successfuly');
    //     };
    //     script.onerror = () => {
    //         console.log('Error occurred while loading script');
    //     };
    //     script.text = code;
    //     document.body.appendChild(script);
    // };
};

const pvGenInstance = new PVGenAI({
    type: GEN_AI_TYPES.CLAUDE_V1,
});
pvGenInstance.aiInstance.invokeInstance();