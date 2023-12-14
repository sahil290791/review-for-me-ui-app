import { ACTION_PROMPTS, COMEDY_PROMPTS, SCI_FI_PROMPTS } from "../constants/prompts";
import { MsgTypes, getContentType, getTitleMetadata, scrollToBottom, updatePrompt } from "../utils/messaging";

import GenAIAPIClient, { GEN_AI_TYPES } from "./models/PVGenAIAPIClient";

export default class Modal {
    constructor() {
        this._modalContainer = document.createElement('div');
        this._modal = document.createElement('div');
        this._modalHeader = document.createElement('div');
        this._modalBody = document.createElement('div');
        this.aiInstance = new GenAIAPIClient({
            type: GEN_AI_TYPES.CLAUDE_V1,
        });
        this.prompts = [
            {
                promptType: 'is_it_recommended',
                promptLabel: 'Should I watch this?',
                promptQuery: 'Should I watch <strong><title></strong> based on my past watch history?',
                promptQueryPayload: 'Should I watch <strong><title></strong> based on my past experience of watching <movie_list>?',
                relatedPrompts: [{ promptType: 'not_for_me', showResponse: true }, {promptType: 'similar_movies'}, {promptType: 'restart'}],
                priority: 1,
            },
            {
                promptType: 'not_for_me',
                promptQuery: 'Can you suggest some other <contentType>s as I am not interested in watching <strong><title></strong>?',
                promptQueryPayload: 'Can you suggest some other <contentType>s based on my watch history of <movie_list> as I am not interested in watching <strong><title></strong>',
                promptLabel: 'Not for me',
                relatedPrompts: [{ promptType: 'im_in_the_mood_for' }, { promptType: 'similar_recent_movies', showResponse: true }, {promptType: 'free_prime_movies'}, {promptType: 'holiday_season_movies'}, {promptType: 'restart'}],
                priority: 2,
            },
            {
                promptType: 'im_in_the_mood_for',
                promptQuery: 'What type of movies do you generally enjoy?',
                promptLabel: "I'm in the mood for",
                relatedPrompts: [{ promptType: 'action_adventure_genre', showResponse: true }, {promptType: 'comedy_genre'}, {promptType: 'sci_fi_genre'}, { promptType: 'restart' }],
                priority: 2,
                handleLocally: true,
            }, 
            ...ACTION_PROMPTS,
            ...COMEDY_PROMPTS,
            ...SCI_FI_PROMPTS, {
                promptType: 'holiday_season_movies',
                promptQuery: 'Can you suggest some recent holiday season <contentType>s?',
                promptQueryPayload: 'Can you suggest some recent holiday season <contentType>s?',
                promptLabel: 'Holiday season <contentType>s',
                relatedPrompts: [{ promptType: 'similar_movies', showResponse: true }, {promptType: 'free_prime_movies'}, {promptType: 'similar_recent_movies'}, {promptType: 'restart'}],
                priority: 2,
            },{
                promptType: 'similar_movies',
                promptQuery: 'Suggest <contentType>s similar to <strong><title></strong>?',
                promptQueryPayload: 'Suggest <contentType>s similar to <title>?',
                promptLabel: 'Suggest Similar <contentType>s',
                relatedPrompts: [{ promptType: 'similar_recent_movies', showResponse: true }, {promptType: 'free_prime_movies'}, {promptType: 'restart'}],
                priority: 2,
            }, {
                promptType: 'cast',
                promptLabel: 'View Cast',
                promptQuery: 'View Cast of <strong><title></strong>.',
                promptQueryPayload: 'View Cast of <title>.',
                relatedPrompts: [{ promptType: 'is_it_recommended'}, {promptType: 'similar_movies', showResponse: true }, {promptType: 'similar_recent_movies', showResponse: true }, {promptType: 'not_for_me'}],
                priority: 1,
            }, {
                promptType: 'similar_recent_movies',
                promptLabel: 'Similar Recent <contentType>s',
                promptQuery: `Can you suggest recent <contentType>'s similar to <strong><title></strong>?`,
                promptQueryPayload: 'Can you suggest recent <contentType>s similar to <title>?',
                relatedPrompts: [{promptType: 'not_for_me', showResponse: true }, {promptType: 'similar_movies'}, {promptType: 'free_prime_movies'}],
                priority: 1,
            }, {
                promptType: 'free_prime_movies',
                promptLabel: 'Free with Prime',
                promptQuery: 'Can you suggest free with Prime <contentType>s?',
                promptQueryPayload: 'Can you suggest recent <i>free with Prime</i> <contentType>s similar to <title>?',
                relatedPrompts: [{promptType: 'similar_movies'}, {promptType: 'similar_recent_movies'}, {promptType: 'holiday_season_movies_with_free_prime'}],
                priority: 2,
            }, {
                promptType: 'holiday_season_movies_with_free_prime',
                promptQuery: 'Can you suggest some recent holiday season <contentType>s?',
                promptQueryPayload: 'Can you suggest some recent holiday season <contentType>s free with Prime?',
                promptLabel: 'Holiday season <contentType>s',
                relatedPrompts: [{promptType: 'similar_recent_movies'}, {promptType: 'restart'}],
                priority: 2,
            }, {
                promptType: 'imdb_rating',
                promptLabel: '<svg style="height: 25px;" id="home_img" class="ipc-logo" xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg> IMDb Rating',
                promptQuery: 'What is the IMDb rating for <strong><title></strong>?',
                promptQueryPayload: 'What is the IMDb rating for <title>?',
                relatedPrompts: [],
                priority: 1,
            },
            {
                promptType: 'rotten_tomatoe',
                promptLabel: '<img src="http://localhost:8000/assets/images/tomatometer.svg" height="24px" width="24px" /> Tomatoemeter',
                promptQuery: 'What is the Rotten Tomatoe score <img src="http://localhost:8000/assets/images/tomatometer.svg" height="24px" width="24px" /> for <strong><title></strong>?',
                promptQueryPayload: 'What is the Rotten Tomatoe score for <strong><title></strong>?',
                relatedPrompts: [],
                priority: 1,
            }, {
                promptType: 'restart',
                promptLabel: 'Restart Review for me',
                promptQuery: 'Restart Review for me',
                handleLocally: true,
                relatedPrompts: [],
                priority: 2,
            }
        ];
    }

    styles = () => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.rel = 'stylesheet';
        styleElement.innerHTML = `
            .review-me-hidden {
                display: none !important;
            }

            .review-me-modal-container {
                position: fixed;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0,0,0,0.1);
                top: 0;
                left: 0;
                right: 0;
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                z-index: 1000;
            }

            .review-me-modal-header {
                flex: 1;
                text-align: center;
            }

            .review-me-modal-wrapper {
                max-width: 800px;
                max-height: 80vh;
                height: 80vh;
                background: white;
                padding: 1rem;
                box-shadow: 10px 24px 58px -4px grey;
                width: 70%;
                border-radius: 10px;
            }
            .review-me-modal-body {
                height: 99%;
            }
            .review-me-loader {
                display: flex;
                flex: 1;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
            }
            .review-me-result-container {
                height: 90%;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: end;
                overflow-y: scroll;
                border-bottom: 1px solid lightgrey;
            }

            .review-me-bot-msg-pill, .review-me-user-msg-pill {
                width: 100%;
                padding: 0.6rem;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: end;
            }
            .review-me-bot-msg-pill > span {
                width: 94%;
                background-color: lightblue;
                border-radius: 10px;
                display: inline-block;
                padding: 0.6rem;
                white-space: pre-line;
            }
            .review-me-user-msg-pill > span {
                width: 94%;
                background-color: #FFF6C7;
                border-radius: 10px;
                display: inline-block;
                padding: 0.6rem;
                white-space: pre-line;
            }
            .pv-bot-icon {
                width: 50px;
                height: 50px;
                border-radius: 50px;
                background-color: #4896F7;
                color: white;
                flex: 0;
                font-size: 1rem;
                padding: 1rem;
                text-align: center;
                line-height: 1rem;
                margin-right: 5px;
            }

            .pv-user-icon {
                width: 50px;
                height: 50px;
                border-radius: 50px;
                background-color: #ff9900;
                color: white;
                flex: 0;
                font-size: 1rem;
                padding: 1rem;
                text-align: center;
                line-height: 1rem;
                margin-right: 5px;
            }

            .review-me-input-group {
                flex: 1;
                flex-direction: row;
                justify-content: flex-end;
                display: flex;
            }
            .review-me-input-group button {
                background-color: #4896F7;
                padding: 1rem;
                height: 60px;
            }
            .review-me-input-group input {
                font-size: 1rem;
                line-height: 1.35rem;
                padding: 1rem;
                height: 60px;
                flex: 1;
            }
            .review-me-prompt-pill {
                padding: 10px 21px;
                background-color: antiquewhite;
                border-radius: 20px;
                margin-right: 1rem;
                cursor: pointer;
                font-size: 1.1rem;
                height: 38px;
            }
            .review-me-prompts {
                height: 10%;
                top: 3%;
                text-align: right;
                justify-content: center;
                overflow-x: scroll;
                width: 100%;
                display: block;
                white-space: nowrap;
                overflow-y: hidden;
                padding: 1rem;
                vertical-align: middle;
            }
            .review-me-prompt-pill:hover {
                background-color: #EFD031;
            }
            .review-me-prompt-pill > svg, .review-me-prompt-pill > img {
                position: relative;
                top: 5px;
            }
            .disable-click {
                pointer-events: none;
                opacity: 0.5;
            }
        
            .rocket-loader {
                text-align: center;
                height: 100px;
                width: 100%;
            }

            .mypopcorn {
                padding:20px;
            }
            
            .popcorn{
                margin: auto;
                width: 100px;
            }
            
            circle#popcrncirlce {
                fill: #FFCC66;
                transform-origin: 0 0;
                -webkit-transform-origin: 0 0;
                -webkit-animation: rotate 1s cubic-bezier(.49,.05,.32,1.04) infinite alternate;
                animation: rotate 1s cubic-bezier(.49,.05,.32,1.04) infinite alternate;
            }
    
            @-webkit-keyframes rotate {
                50% {
                -webkit-transform: translate(0px, 100px);
                }
            }
            
            @keyframes rotate {
                50% {
                transform: translate(0px, 100px);
                }
            }
        `;
        document.querySelector('head').append(styleElement);
    }

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

    renderPrompts = (priority = 1) => {
        this.currentPriority = priority;
        this.showPrompts();
    };

    displayPrompts = (prompts) => {
        try {
            document.querySelector('.review-me-prompts').innerHTML = '';
            const promptsContainer = document.querySelector('.review-me-prompts');
            prompts.forEach((prompt) => {
                const promptPill = document.createElement('span');
                promptPill.className = 'review-me-prompt-pill';
                promptPill.innerHTML = prompt.promptLabel.replace(/<contentType>/g, getContentType());
                promptsContainer.appendChild(promptPill);
                this.addPromptListener(promptPill, prompt);
            });
        } catch(err) {
            console.log(err);
        }
    }

    showPrompts = () => {
        if (!this.currentPrompt || (this.currentPrompt && this.currentPrompt.relatedPrompts.length === 0)) {
            this.displayPrompts(this.prompts.filter((prompt) => prompt.priority === this.currentPriority));
        } else {
            const relatedPrompts = this.currentPrompt.relatedPrompts;
            const extractPrompts = relatedPrompts.map((prompt) => {
                const pr = this.prompts.find((similarPrompt) => similarPrompt.promptType === prompt.promptType);
                if (pr) {
                    return pr;
                }
                return;
            }).filter((pr) => typeof pr !== 'undefiend');
            this.displayPrompts(extractPrompts);
        }
    }

    attachPromptInputToChat = (msg, msgType) => {
        updatePrompt(msg, msgType);
    }

     getWatchHistory = async () => {
        // get html text from reddit
        const response = await fetch('https://www.primevideo.com/region/eu/settings/watch-history/ref=aiv_DVAPI_getWatchHistorySettingsPage', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/text',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            }
        });
        // using await to ensure that the promise resolves
        const body = await response.text();

        this.titleList = await fetch('http://localhost:3000/getWatchHistory', {
            method: 'POST',
            body: JSON.stringify({ payload: `${body}`}),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8000,https://www.primevideo.com',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            }
        })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      };
      

    addPromptListener = async (promptPill, prompt) => {
        try {
            const title = await this.extractTitleName();
            promptPill.addEventListener('click', async (e) => {
                if (prompt.handler) {
                    prompt.handler.bind(this).call();
                }
                const query = prompt.promptQuery.replace(/<title>/g, title).replace(/<contentType>/g, getContentType()).replace(/<characterType>/g, this.characterType).replace(/<environmentType>/g, this.environment);
                let queryPayload;
                this.attachPromptInputToChat(query, MsgTypes.user);
                this.currentPrompt = prompt;
                if (prompt.promptType === 'restart') {
                    this.currentPriority = 1;
                    this.environment = undefined;
                    this.characterType = undefined;
                    this.currentPrompt = undefined;
                } else {
                    this.currentPriority = prompt.priority;
                }
                
                if (!prompt.handleLocally) {
                    this.addLoader();
                    scrollToBottom();
                    document.querySelector('.review-me-prompts').classList.add('disable-click');
                    queryPayload = prompt.promptQueryPayload.replace(/<title>/g, title).replace(/<movie_list>/g, this.titleList.join(', ')).replace(/<contentType>/g, getContentType()).replace(/<characterType>/g, this.characterType).replace(/<environmentType>/g, this.environment);
                    const result = await this.aiInstance.makeRequest({
                        payload: {
                            prompt: queryPayload,
                        }
                    });
                    this.attachPromptInputToChat(result.response, MsgTypes.bot);
                }
                this.removeLoader();
                document.querySelector('.review-me-prompts').classList.remove('disable-click');
                this.showPrompts();
            });
        } catch(err) {
            console.log(err);
        }
    }

    addLoader = () => {
        const loaderContainer = document.createElement('div');
        loaderContainer.className = 'rocket-loader';
        loaderContainer.innerHTML = `
        <div class="popcorn">
        <svg class="mypopcorn animated fadeIn" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 354.461 354.461" style="enable-background:new 0 0 354.461 354.461;" xml:space="preserve">
        <g id="XMLID_484_">
          
            <circle id="popcrncirlce" class="firstcirle" cx="260.426" cy="22.695" r="22.695"/>
          
          <circle id="popcrncirlce" class="firstcirle" cx="163.426" cy="-16.695" r="22.695"/>
          
          <circle id="popcrncirlce" class="firstcirle" cx="65.426" cy="22.695" r="22.695"/>
          
            <path id="XMLID_488_" style="fill:#FBB03B;" d="M278.375,128.664c-0.05,0-0.099,0.007-0.149,0.008
                c0.092-0.831,0.149-1.673,0.149-2.529c0-12.534-10.161-22.695-22.695-22.695c-0.05,0-0.099,0.007-0.149,0.008
                c0.092-0.831,0.149-1.673,0.149-2.529c0-12.534-10.161-22.695-22.695-22.695c-0.752,0-1.495,0.041-2.228,0.112
                c0.1-0.866,0.165-1.742,0.165-2.634c0-12.099-9.475-21.958-21.406-22.63C208.895,41.1,199.014,31.57,186.88,31.57
                c-12.136,0-22.018,9.533-22.635,21.515c-0.04-0.002-0.08-0.004-0.119-0.006C163.505,41.1,153.624,31.57,141.491,31.57
                c-12.136,0-22.018,9.533-22.635,21.515c-0.468-0.029-0.933-0.071-1.408-0.071c-12.534,0-22.695,10.161-22.695,22.695
                c0,0.887,0.064,1.757,0.162,2.618C83.272,79.295,74.12,89.034,74.12,100.926c0,0.856,0.057,1.698,0.149,2.529
                c-0.05,0-0.099-0.008-0.149-0.008c-12.534,0-22.695,10.161-22.695,22.695c0,0.856,0.057,1.698,0.149,2.529
                c-0.05,0-0.099-0.008-0.149-0.008c-12.534,0-22.695,10.161-22.695,22.695c0,12.534,10.161,22.695,22.695,22.695
                c12.534,0,22.695-10.161,22.695-22.695c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008
                c-0.092,0.831-0.149,1.673-0.149,2.529c0,12.534,10.161,22.695,22.695,22.695s22.695-10.161,22.695-22.695
                c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008c0.05,0,0.099-0.007,0.149-0.008
                c-0.092,0.831-0.149,1.673-0.149,2.529c0,12.534,10.161,22.695,22.695,22.695c12.534,0,22.695-10.161,22.695-22.695
                c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                c0,12.534,10.161,22.695,22.695,22.695c12.534,0,22.695-10.161,22.695-22.695c0-0.856-0.057-1.698-0.149-2.529
                c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                c0,12.534,10.161,22.695,22.695,22.695s22.695-10.161,22.695-22.695c0-0.856-0.057-1.698-0.149-2.529
                c0.05,0,0.099,0.008,0.149,0.008c0.05,0,0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                c0,12.534,10.161,22.695,22.695,22.695c12.534,0,22.695-10.161,22.695-22.695C301.07,138.825,290.909,128.664,278.375,128.664z
                 M185.473,76.889c0.04,0.002,0.08,0.004,0.119,0.006c0.025,0.48,0.048,0.96,0.103,1.432c-0.108,0.009-0.22,0.006-0.328,0.017
                C185.423,77.864,185.447,77.377,185.473,76.889z M140.083,76.889c0.04,0.002,0.08,0.004,0.119,0.006
                c0.025,0.48,0.048,0.96,0.103,1.432c-0.108,0.009-0.22,0.006-0.328,0.017C140.033,77.864,140.057,77.377,140.083,76.889z
                 M96.666,128.672c0.092-0.831,0.149-1.673,0.149-2.529c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008
                c0.05,0,0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529c0,0.856,0.057,1.698,0.149,2.529
                c-0.05,0-0.099-0.008-0.149-0.008C96.765,128.664,96.717,128.671,96.666,128.672z M119.361,103.455
                c0.092-0.831,0.149-1.673,0.149-2.529c0-0.887-0.064-1.757-0.162-2.618c0.108-0.009,0.22-0.006,0.328-0.017
                c-0.1,0.866-0.165,1.742-0.165,2.634c0,0.856,0.057,1.698,0.149,2.529c-0.05,0-0.099-0.008-0.149-0.008
                C119.46,103.448,119.412,103.455,119.361,103.455z M142.056,128.672c0.092-0.831,0.149-1.673,0.149-2.529
                c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                c0,0.856,0.057,1.698,0.149,2.529c-0.05,0-0.099-0.008-0.149-0.008S142.106,128.671,142.056,128.672z M164.751,103.455
                c0.092-0.831,0.149-1.673,0.149-2.529c0-0.887-0.064-1.757-0.162-2.618c0.108-0.009,0.22-0.006,0.328-0.017
                c-0.1,0.866-0.165,1.742-0.165,2.634c0,0.856,0.057,1.698,0.149,2.529c-0.05,0-0.099-0.008-0.149-0.008
                S164.802,103.455,164.751,103.455z M187.446,128.672c0.092-0.831,0.149-1.673,0.149-2.529c0-0.856-0.057-1.698-0.149-2.529
                c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529c0,0.856,0.057,1.698,0.149,2.529
                c-0.05,0-0.099-0.008-0.149-0.008S187.496,128.671,187.446,128.672z M210.141,103.455c0.092-0.831,0.149-1.673,0.149-2.529
                c0-0.887-0.064-1.757-0.162-2.618c0.108-0.009,0.22-0.006,0.328-0.017c-0.1,0.866-0.165,1.742-0.165,2.634
                c0,0.856,0.057,1.698,0.149,2.529c-0.05,0-0.099-0.008-0.149-0.008S210.191,103.455,210.141,103.455z M232.836,128.672
                c0.092-0.831,0.149-1.673,0.149-2.529c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008
                c-0.092,0.831-0.149,1.673-0.149,2.529c0,0.856,0.057,1.698,0.149,2.529c-0.05,0-0.099-0.008-0.149-0.008
                S232.886,128.671,232.836,128.672z"/>
            <path id="XMLID_44_" style="fill:#FF1D25;" d="M34.376,159.361c2.49-22.257,21.497-39.711,44.39-39.711h0
                c22.893,0,41.9,17.454,44.39,39.711h0.285v4.964v59.567v130.569H53.947L34.092,164.325v-4.964H34.376z"/>
            <path id="XMLID_501_" style="fill:#E6E6E6;" d="M209.291,159.361c-2.49-22.257-21.497-39.711-44.39-39.711h0
                c-22.893,0-41.9,17.454-44.39,39.711h-0.285v4.964v59.567v130.569h89.35V223.892v-59.567v-4.964H209.291z"/>
            <path id="XMLID_502_" style="fill:#FFCC66;" d="M278.375,128.664c-0.05,0-0.099,0.007-0.149,0.008
                c0.092-0.831,0.149-1.673,0.149-2.529c0-12.534-10.161-22.695-22.695-22.695c-0.05,0-0.099,0.007-0.149,0.008
                c0.092-0.831,0.149-1.673,0.149-2.529c0-12.534-10.161-22.695-22.695-22.695c-0.752,0-1.495,0.041-2.228,0.112
                c0.1-0.866,0.165-1.742,0.165-2.634c0-12.099-9.475-21.958-21.406-22.63C208.895,41.1,199.014,31.57,186.88,31.57
                c-10.615,0-19.505,7.294-21.98,17.14V98.3c0.055-0.002,0.111-0.003,0.165-0.008c-0.1,0.866-0.165,1.742-0.165,2.634
                c0,0.856,0.057,1.698,0.149,2.529c-0.05,0-0.099-0.008-0.149-0.008v45.39c0.05,0,0.099-0.007,0.149-0.008
                c-0.092,0.831-0.149,1.673-0.149,2.529c0,12.534,10.161,22.695,22.695,22.695c12.534,0,22.695-10.161,22.695-22.695
                c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                c0,12.534,10.161,22.695,22.695,22.695s22.695-10.161,22.695-22.695c0-0.856-0.057-1.698-0.149-2.529
                c0.05,0,0.099,0.008,0.149,0.008c0.05,0,0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                c0,12.534,10.161,22.695,22.695,22.695c12.534,0,22.695-10.161,22.695-22.695C301.07,138.825,290.909,128.664,278.375,128.664z
                 M185.367,78.344c0.055-0.479,0.08-0.966,0.105-1.454c0.04,0.002,0.08,0.004,0.119,0.006c0.025,0.48,0.048,0.96,0.103,1.432
                C185.586,78.336,185.475,78.333,185.367,78.344z M187.744,128.672c-0.05,0-0.099-0.008-0.149-0.008s-0.099,0.007-0.149,0.008
                c0.092-0.831,0.149-1.673,0.149-2.529c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008
                c-0.092,0.831-0.149,1.673-0.149,2.529C187.595,126.999,187.652,127.84,187.744,128.672z M210.439,103.455
                c-0.05,0-0.099-0.008-0.149-0.008s-0.099,0.007-0.149,0.008c0.092-0.831,0.149-1.673,0.149-2.529c0-0.887-0.064-1.757-0.162-2.618
                c0.108-0.009,0.22-0.006,0.328-0.017c-0.1,0.866-0.165,1.742-0.165,2.634C210.29,101.782,210.347,102.624,210.439,103.455z
                 M233.134,128.672c-0.05,0-0.099-0.008-0.149-0.008s-0.099,0.007-0.149,0.008c0.092-0.831,0.149-1.673,0.149-2.529
                c0-0.856-0.057-1.698-0.149-2.529c0.05,0,0.099,0.008,0.149,0.008s0.099-0.007,0.149-0.008c-0.092,0.831-0.149,1.673-0.149,2.529
                C232.985,126.999,233.042,127.84,233.134,128.672z"/>
            <path id="XMLID_510_" style="fill:#C9C7D7;" d="M209.291,159.361c-2.49-22.257-21.497-39.711-44.39-39.711h0v234.811h44.675
                V223.892v-59.567v-4.964H209.291z"/>
            <path id="XMLID_515_" style="fill:#FF1D25;" d="M295.424,159.361c-2.49-22.257-21.497-39.711-44.39-39.711h0
                c-22.893,0-41.9,17.454-44.39,39.711h-0.285v4.964v59.567v130.569h69.495l19.856-190.136v-4.964H295.424z"/>
        </svg>
          
        </div>
          
           
        `;
        document.querySelector('.review-me-result-container').appendChild(loaderContainer);
    }

    removeLoader = () => {
        const el = document.querySelector('.review-me-result-container .rocket-loader');
        if (!!el) {
            document.querySelector('.review-me-result-container .rocket-loader').remove();
        }
    }

    constructModal = () => {
        this._modalContainer.className = 'review-me-modal-container review-me-hidden';
        this._modalHeader.className = 'review-me-modal-header';
        this._modal.className = 'review-me-modal-wrapper';
        this._modalHeader.innerHTML = `
            <div>
                <h3>Welcome to Review for me</h3>
            </div>
        `;
        this._modalBody.className = 'review-me-modal-body';
        this._modalBody.innerHTML = `
            <section class='review-me-loader'>
                <img src="http://localhost:8000/assets/images/popcorn.png" style="
                    width: 50%;
                    height: auto;
                    margin-left: 10%;
                ">
                <p class='review-me-loader-text' style="font-size:1.25rem;">
                    Sit Back & Relax
                </p>
                <p class='review-me-loader-text'>
                    While we are generating a detailed review for you
                </>
            </section>
            <section class="review-me-result-container">
            </section>
            <section class="review-me-prompts">
            </section>
        `;
        this._modal.appendChild(this._modalHeader);
        this._modal.appendChild(this._modalBody);
        this._modalContainer.appendChild(this._modal);
    }

    addListeners = () => {
        this.closeModalOnOutsideClick();
    }

    cleanup = () => {
        document.querySelector('.review-me-prompts').innerHTML = '';
        document.querySelector('.review-me-prompts').classList.remove('disable-click');
        document.querySelector('.review-me-result-container').innerHTML = '';
        document.querySelector('.review-me-loader').classList.remove('review-me-hidden');
        this.currentPriority = 1;
        this.environment = undefined;
        this.characterType = undefined;
        this.currentPrompt = undefined;
    };

    closeModalOnOutsideClick = () => {
        this._modalContainer.addEventListener('click', (e) => {
            const modal = e.target.closest('.review-me-modal-wrapper');
            if (e.target.className === 'review-me-prompt-pill') {
                return true;
            }
            if (!modal) {
                this._modalContainer.classList.add('review-me-hidden');
                this.cleanup();
            }
        });
    }

    render = () => {
        this.styles();
        this.getWatchHistory();
        this.constructModal();
        this.addListeners();
        document.querySelector('body').appendChild(this._modalContainer);   
    }
}