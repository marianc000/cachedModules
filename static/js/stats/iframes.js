//iframes.js
function addHtml(html) {
    document.body.insertAdjacentHTML('beforeend', html);
}

function waitForMessage(params) {
    console.log(">waitForMessage",new Date());
    return new Promise(resolve => {

        function handler({ data }) {
            console.log(">handle",new Date());
            removeEventListener("message", handler);
            params.durations.push(data);
            setTimeout(()=>resolve(params),10000);// 10 seconds to avoid memory cache
        }

        addEventListener("message", handler);
        addHtml(params.html);
    });
}

function addAverage({ durations }, indexFile) {
    const average = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    addHtml(`<div>${indexFile} - ${average} ms</div>`);
}


function measure(indexFile) {
    const html = `<iframe src='${indexFile}'></iframe>`;

    let p = Promise.resolve({ html, durations: [] });

    for (let i = 0; i < 10; i++) {
        p = p.then(waitForMessage);
    }

    return p.then(data => addAverage(data, indexFile));
}

Promise.resolve()
    .then(() => measure("manyModules.html"));
    // .then(() => measure("manyModulesBundled.html"));



