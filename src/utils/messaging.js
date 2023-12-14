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

export const updatePrompt = (response, msgType) => {
    const botMsgPill = document.createElement('div');
    botMsgPill.className = `review-me-${MsgTypes[msgType]}-msg-pill`;

    const span = document.createElement('div');
    span.className = `pv-${MsgTypes[msgType]}-icon`;

    if (msgType === MsgTypes.user) {
        // span.textContent = document.querySelector('[data-automation-id="nav-active-profile-name"]').textContent.slice(0,2);
    } else {
        span.textContent = 'PV';
        botMsgPill.appendChild(span);
    }

    botMsgPill.innerHTML = botMsgPill.innerHTML + `
        <span>${response}</span>
    `;
    
    document.querySelector('.review-me-result-container').appendChild(botMsgPill);
    scrollToBottom();
};