import Modal from "./src/Modal/Modal";
import GenAIAPIClient, { GEN_AI_TYPES } from "./src/Modal/models/PVGenAIAPIClient";
import { getTitleMetadata } from "./src/utils/messaging";

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
                    <button aria-label="Review Me" class="_39zede _2lS2e0 fbl-icon-btn _3CtfuB">
                        <div class="_3G1q6i">
                        <svg class="fbl-icon _30dE3d _1a_Ljt" viewBox="0 0 24 24" height="24" width="24" role="img" aria-hidden="true">
                            <title>Review Me</title>
                            <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 356.859 356.859" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M9.849,130.711l341.726-60.257l-1.203-6.856l-8.612-48.845L0,75.016l1.347,7.629l7.265,41.216l1.208,6.856l0.005-0.001
                                        v188.596c0,12.534,10.255,22.794,22.794,22.794h301.445c12.534,0,22.794-10.255,22.794-22.794v-188.6H9.849z M336.174,23.606
                                        l6.077,34.468l-40.09-28.472L336.174,23.606z M287.36,32.212l47.939,34.043l-41.216,7.265l-47.939-34.043L287.36,32.212z
                                        M230.252,42.283l47.939,34.043l-41.211,7.265l-47.939-34.043L230.252,42.283z M173.153,52.349l47.939,34.043l-41.216,7.265
                                        l-47.939-34.043L173.153,52.349z M116.045,62.42l47.939,34.043l-41.216,7.265L74.829,69.686L116.045,62.42z M58.941,72.492
                                        l47.939,34.043L65.664,113.8L17.725,79.757L58.941,72.492z M8.904,87.944L49.772,116.6l-34.877,6.149L8.904,87.944z
                                        M340.224,138.458l-41.298,41.851h-41.851l41.298-41.851H340.224z M282.235,138.458l-41.298,41.851h-41.851l41.298-41.851H282.235
                                        z M224.246,138.458l-41.298,41.851h-41.846l41.298-41.851H224.246z M166.262,138.458l-41.298,41.851H83.113l41.298-41.851H166.262
                                        z M15.857,174.472v-36.014h35.538L15.857,174.472z M66.427,138.458h41.851L66.98,180.308H25.129L66.427,138.458z M333.619,321.856
                                        H31.846v-115.62h301.773V321.856z M350.817,180.308h-35.753l35.753-35.804V180.308z"/>
                                    <rect x="221.834" y="216.829" width="101.192" height="30.346"/>
                                    <rect x="221.834" y="258.266" width="101.192" height="52.997"/>
                                    <rect x="96.036" y="216.829" width="114.708" height="30.346"/>
                                    <rect x="42.44" y="216.829" width="42.506" height="94.433"/>
                                    <rect x="96.036" y="258.266" width="114.708" height="52.997"/>
                                </g>
                            </g>
                            </svg>
                        </svg>
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

          .review-me-hack-button:hover {
            fill: #000000;
          }

          .review-me-hack-button svg {
            fill: #ffffff;
            height: 24px !important;
            width: 24px !important;
          }

          .review-me-hack-button svg:hover {
            fill: #000000;
          }
        `;
        document.querySelector('head').append(styleElement);
      };

    renderModal = () => {
        this._modalClass = new Modal();
        this._modalClass.render();
        this._modalContainer = this._modalClass._modalContainer;
        this.cleanup();
    }

    cleanup = () => {
        document.querySelector('.review-me-prompts').innerHTML = '';
        document.querySelector('.review-me-result-container').innerHTML = '';
        document.querySelector('.review-me-loader').classList.remove('review-me-hidden');
    };

    extractTitleName = async () => {
        const titleMetadata = await getTitleMetadata();
        if (!titleMetadata) {
            const text = document.querySelector('title').text;
            const [_first, titleName] = text.split(': ');
            return titleName;
        } else {
            return titleMetadata.catalog.title;
        }
    }

    activateListeners = async () => {
        const title = await this.extractTitleName();
        this._reviewMeButton.addEventListener('click', async (e) => {
            this.pvGenInstance = new GenAIAPIClient({
                type: GEN_AI_TYPES.CLAUDE_V1,
            });
            this._modalContainer.classList.remove('review-me-hidden');
            const result = await this.pvGenInstance.makeRequest({
                payload: {
                    prompt: `Can you give me a detailed critic of the movie ${title}?`,
                },
            });
            document.querySelector('.review-me-loader').classList.add('review-me-hidden');
            this.updatePrompt(result);

            // Additional context can be passed
            this._modalClass.renderPrompts();
        });
    };

    updatePrompt = (result) => {
        const botMsgPill = document.createElement('div');
        botMsgPill.className = 'review-me-bot-msg-pill';
        botMsgPill.innerHTML = `
            <div class="pv-bot-icon">PV</div>
            <span>${result.response}</span>
        `;
        document.querySelector('.review-me-result-container').appendChild(botMsgPill);
    };

    removeJSErrorModal = () => {
        setTimeout(() => {
            const dom = document.querySelector('#DVWebNode-js-errors-portal');
            if (dom) {
                dom.remove();
            }
        }, 1500);
        
    };

    renderUI = async () => {
        this.removeJSErrorModal();
        this.renderModal();
        this._container.appendChild(this.reviewMeButton());
        this._parentRoot.appendChild(this._container);
        this.activateListeners();
    }
}

const ui = new RenderUI();
ui.renderUI();
