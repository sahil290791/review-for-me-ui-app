const GEN_AI_TYPES = {
    CLAUDE_V1: 'CLAUDE_V1',
    TITAN: 'TITAN',
};

class GenAIAPIClient {
   constructor(props) {
      const { type, payload } = props;
      this._type = type;

      switch (type) {
          case GEN_AI_TYPES.CLAUDE_V1: {
              this._payload = {
                  prompt: payload?.prompt,
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
                'Access-Control-Allow-Origin': 'http://localhost:8000',
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

class PVGenAI {
    constructor(props) {
        const { type, payload } = props;
        this.aiInstance = new GenAIAPIClient({
            type,
            payload,
        });
    }
};

class RenderUI {
    constructor() {
        this._container = document.createElement('div');
        this._container.id = 'hack-ai-root';
        this._container.className = 'review-me-hack';
        this.createStyleSheet();
        this._parentRoot = document.querySelector('#dv-action-box-wrapper > #dv-action-box .dv-node-dp-action-box .dv-dp-node-watchparty').parentNode;
        
    }

    reviewMeButton = () => {
        this._reviewMeButton = document.createElement('span');
        this._reviewMeButton.className = 'review-me-hack-button';
        this._reviewMeButton.innerHTML = `
            <div class="LtCmQJ">
                <label class="jDcAoh _1ZWjx8 _62Ap1y" data-testid="review-me-button" data-automation-id="review-me-button" for="e478fa0229" aria-describedby="e478fa0229">
                    <button aria-label="Share" class="_39zede _2lS2e0 fbl-icon-btn _3CtfuB">
                        <div class="_3G1q6i"><svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true"><title>Share Android</title><svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.423 2.041 C 16.823 2.136,16.237 2.369,15.725 2.716 C 14.735 3.389,14.086 4.536,14.013 5.743 L 13.989 6.145 11.344 7.588 C 9.182 8.768,8.688 9.022,8.636 8.985 C 8.600 8.960,8.483 8.873,8.376 8.791 C 8.098 8.579,7.556 8.306,7.175 8.186 C 5.790 7.752,4.219 8.136,3.197 9.157 C 2.770 9.585,2.518 9.962,2.302 10.500 C 2.075 11.062,2.020 11.355,2.020 12.000 C 2.020 12.645,2.075 12.938,2.302 13.500 C 2.775 14.677,3.750 15.535,4.995 15.871 C 5.330 15.962,5.460 15.975,6.000 15.977 C 6.564 15.978,6.656 15.968,7.020 15.864 C 7.598 15.699,8.163 15.407,8.551 15.074 L 8.682 14.961 11.335 16.288 L 13.989 17.614 14.012 18.137 C 14.051 19.039,14.337 19.818,14.876 20.488 C 16.372 22.351,19.110 22.511,20.806 20.836 C 21.761 19.893,22.182 18.525,21.917 17.227 C 21.755 16.431,21.399 15.760,20.841 15.197 C 20.485 14.837,20.163 14.613,19.663 14.376 C 19.100 14.110,18.697 14.024,18.000 14.024 C 17.270 14.024,16.885 14.111,16.255 14.419 C 15.639 14.720,15.229 15.055,14.771 15.634 L 14.696 15.728 12.246 14.503 C 10.230 13.495,9.799 13.265,9.817 13.209 C 9.940 12.809,9.976 12.533,9.977 12.000 C 9.978 11.520,9.962 11.359,9.886 11.067 C 9.835 10.872,9.799 10.709,9.807 10.703 C 9.814 10.697,10.894 10.106,12.208 9.391 L 14.595 8.090 14.731 8.295 C 15.165 8.948,15.952 9.535,16.746 9.797 C 18.744 10.456,20.945 9.428,21.712 7.477 C 21.928 6.927,21.980 6.637,21.979 5.980 C 21.979 5.439,21.968 5.341,21.864 4.980 C 21.651 4.243,21.340 3.700,20.841 3.197 C 20.113 2.462,19.179 2.055,18.140 2.020 C 17.876 2.011,17.554 2.021,17.423 2.041 M18.383 4.043 C 19.185 4.190,19.839 4.872,19.967 5.695 C 20.153 6.894,19.209 8.000,18.000 8.000 C 17.032 8.000,16.183 7.268,16.033 6.305 C 15.933 5.663,16.132 5.061,16.596 4.596 C 17.085 4.108,17.698 3.918,18.383 4.043 M6.383 10.043 C 7.185 10.190,7.839 10.872,7.967 11.695 C 8.153 12.894,7.209 14.000,6.000 14.000 C 5.032 14.000,4.183 13.268,4.033 12.305 C 3.933 11.663,4.132 11.061,4.596 10.596 C 5.085 10.108,5.698 9.918,6.383 10.043 M18.383 16.043 C 19.185 16.190,19.839 16.872,19.967 17.695 C 20.153 18.894,19.209 20.000,18.000 20.000 C 17.032 20.000,16.183 19.268,16.033 18.305 C 15.933 17.663,16.132 17.061,16.596 16.596 C 17.085 16.108,17.698 15.918,18.383 16.043 " fill="currentColor" stroke="none" fill-rule="evenodd"></path></svg></svg>
                        </div>
                    </button>
                    <label class="_3f4YQi"><span class="_36qUej">Review Me</span></label>
                </label>
            </div>
        `;
        return this._reviewMeButton;
    };

    createStyleSheet = () => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.rel = 'stylesheet';
        styleElement.innerHTML = `
          .review-me-hack-button {
            width: 50px;
            height: 50px;
            background-color: 
          }

          .review-me-hack-button button {
            border-radius: 10000px;
            background-color: #34373D;
            -webkit-tap-highlight-color: transparent;
            width: 50px;
            height: 50px;
            justify-content: center;
            padding: 0;
            position: relative;
            transition-property: transform,background-color,-webkit-transform;
            will-change: transform,background-color;
            color: white;
            cursor: pointer;
          }
        `;
        document.querySelector('head').append(styleElement);
      };

    renderUI = () => {
        this._container.appendChild(this.reviewMeButton());
        this._parentRoot.appendChild(this._container);

        const pvGenInstance = new PVGenAI({
            type: GEN_AI_TYPES.CLAUDE_V1,
            payload: {
                prompt: 'Can you provide review for Top Gun: Maverick with IMBD score, number of reviews and rotten tomatoe score?',
            },
        });
        pvGenInstance.aiInstance.invokeInstance();
    }
}

const ui = new RenderUI();
ui.renderUI();
