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

async function typeSentence(sentence, eleRef, delay = 5) {
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
    const url = window.location.href;
    const titleId = url.replace('https://www.primevideo.com/region/eu/detail/').split('/')[0].replace('undefined', '');
    if (!titleMetadata) {
        const response = await fetch(`https://atv-ps-eu.primevideo.com/cdp/catalog/GetPlaybackResources?deviceID=e8df85a6-f260-4a46-ba23-a72b5eca4dad&deviceTypeID=AOAGZA014O5RE&gascEnabled=true&marketplaceID=A2MFUE2XK8ZSSY&uxLocale=en_US&firmware=1&playerType=xp&operatingSystemName=Mac%20OS%20X&operatingSystemVersion=10.15.7&deviceApplicationName=Chrome&asin=amzn1.dv.gti.22b56962-c47f-9cbd-32d6-5f0b5265da51&consumptionType=Streaming&desiredResources=PlaybackUrls%2CCuepointPlaylist%2CSubtitleUrls%2CForcedNarratives%2CTrickplayUrls%2CTransitionTimecodes%2CPlaybackSettings%2CCatalogMetadata%2CXRayMetadata&resourceUsage=CacheResources&videoMaterialType=Trailer&clientId=f22dbddb-ef2c-48c5-8876-bed0d47594fd&userWatchSessionId=87209f7d-2c85-410c-b89e-a8296c6c28e2&sitePageUrl=https%3A%2F%2Fwww.primevideo.com%2Fregion%2Feu%2Fdetail%2F${titleId}%2Fref%3Datv_sr_fle_c_Tn74RA_4_1_4%3Fsr%3D1-4%26pageTypeIdSource%3DASIN%26pageTypeId%3DB07S1L62VW%26qid%3D1702519160763&displayWidth=3024&displayHeight=1964&supportsVariableAspectRatio=false&deviceProtocolOverride=Https&vodStreamSupportOverride=Auxiliary&deviceStreamingTechnologyOverride=DASH&deviceDrmOverride=CENC&deviceAdInsertionTypeOverride=SSAI&deviceHdrFormatsOverride=None&deviceVideoCodecOverride=H264&deviceVideoQualityOverride=SD&deviceBitrateAdaptationsOverride=CVBR%2CCBR&audioTrackId=all&languageFeature=MLFv2&liveManifestType=patternTemplate%2Caccumulating%2Clive&supportedDRMKeyScheme=DUAL_KEY&supportsEmbeddedTrickplay=true&daiSupportsEmbeddedTrickplay=true&daiLiveManifestType=patternTemplate%2Caccumulating%2Clive&ssaiSegmentInfoSupport=Base&ssaiStitchType=MultiPeriod&gdprEnabled=false&subtitleFormat=TTMLv2&playbackSettingsFormatVersion=1.0.0&titleDecorationScheme=primary-content&xrayToken=XRAY_WEB_2023_V2&xrayPlaybackMode=playback&xrayDeviceClass=normal&playerAttributes=%7B%22middlewareName%22%3A%22Chrome%22%2C%22middlewareVersion%22%3A%22119.0.0.0%22%2C%22nativeApplicationName%22%3A%22Chrome%22%2C%22nativeApplicationVersion%22%3A%22119.0.0.0%22%2C%22supportedAudioCodecs%22%3A%22AAC%22%2C%22frameRate%22%3A%22SFR%22%2C%22H264.codecLevel%22%3A%222.2%22%2C%22H265.codecLevel%22%3A%220.0%22%2C%22AV1.codecLevel%22%3A%220.0%22%7D`, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"macOS\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://www.primevideo.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then((res) => res.json())
        .catch(e => console.log(err));
        console.log(response);
        titleMetadata = response.catalogMetadata;
        return undefined;
    } else {
        return undefined;
        return titleMetadata;
    }
};