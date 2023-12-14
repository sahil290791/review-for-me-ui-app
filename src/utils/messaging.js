export const MsgTypes = {
    bot: 'bot',
    user: 'user'
};

export const scrollToBottom = () => {
    const el = document.querySelector('.review-me-result-container');
    if (el) {
        el.scrollTop = el.scrollHeight;
    }
};

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function typeSentence(sentence, eleRef, delay = 2) {
    const letters = sentence.split("");
    let i = 0;
    while(i < letters.length) {
      await waitForMs(delay);
      eleRef.append(letters[i]);
      scrollToBottom();
      i++;
    }
    return;
}

export const updatePrompt = async (response, msgType) => {
    const botMsgPill = document.createElement('div');
    botMsgPill.className = `review-me-${MsgTypes[msgType]}-msg-pill`;

    const span = document.createElement('div');
    span.className = `pv-${MsgTypes[msgType]}-icon`;

    if (msgType !== MsgTypes.user) {
        span.textContent = 'PV';
        botMsgPill.appendChild(span);
        botMsgPill.innerHTML = botMsgPill.innerHTML + `
            <span></span>
        `;
        document.querySelector('.review-me-result-container').appendChild(botMsgPill);
        await typeSentence(response, botMsgPill.querySelector('span'));
    } else {
        botMsgPill.innerHTML = botMsgPill.innerHTML + `
            <span>${response}</span>
        `;
        document.querySelector('.review-me-result-container').appendChild(botMsgPill);
    }
    scrollToBottom();
};

let titleMetadata = undefined;

export const getContentType = () => {
    const data = JSON.parse(document.querySelector('body script[type="text/template"]').textContent);
    console.log('contentType', data.args.subPageType);
    return data.args.subPageType;
};

export const getTitleMetadata = async () => {
    return undefined;
};