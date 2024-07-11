//const { format } = require("express/lib/response");
//
{
    let currentSection = "topstories"
    let staticPost = `
    <div class="post" style="display: none;">
        <span class="rate">👍</span>
        <span class="post-title link" style="filter: grayscale(100%); color: white;" >I just redesigned Hacker News</span>
        <span class="post-date">
            <span id="points1209321">139</span> points by 
            <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);" onclick="window.open('https://www.youtube.com/@jasontheone111', '_blank')">Nebula S. Nova</span> | Date | 
            <span class="rate">👁️</span> | 
            <span class="rate">❤️</span> | Source: 
            <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);">github.com/...</span>
        </span><br>
        <span class="rate">👎</span>
        <span class="post-desc">Post Description</span>
    </div>
            `

    functions = {
        newest: () => {
            pickSection("newstories")
        },
        top: () => {
            pickSection("topstories")
        },
        best: () => {
            pickSection("beststories")
        },
        asks: () => {
            pickSection("askstories")
        },
        shows: () => {
            pickSection("showstories")
        },
        jobs : () => {
            pickSection("jobstories")
        },
        about: () => {
            document.getElementById("thePoster").innerHTML = staticPost;
            var thePost = `
                <div class="post">
                    <span class="post-title">About This Redesign.</span>
                    <br>
                    <span class="post-desc">Hello, I am <span class="link" onclick="pickUser('jasontheone111')">Nebula S. Nova.</span><br>
                        I created this redesign as a way to get my knowledge/abilities on coding out there. With hopes that someone might hire me. I can code in various major languages; C++, HTML, JavaScript, Java, LUA, HaxeFlixel, Python, and more.<br><br>
                        Why doesn't the login/signup or work and/or why isn't there an upload button?<br>
                        This is not the real Hacker News website, I don't have access to user information. Nor do I have access to the post upload system. This also means that I have no access to the upvote system, the comment system, or the other user interaction systems.<br><br>
                        Why isn't the tabbing in the comment sections right?<br>
                        I don't exactly know. Making the tabbing correct requires alot of math, which I did wrong.
                        <br><br>
                        If you want to buy the website it'll cost you $2,368 (I worked on this site for 37 hours, the average Website Programmer and Designer is $64/h)<br>
                        If you want me to keep updating it'll cost you an extra $64/h.
                    </span>
                </div>`;
            
            document.getElementById("thePoster").insertAdjacentHTML('beforeend', thePost);
        }
    }
    
    function activate(ele) {
        var list = Array.prototype.slice.call(document.getElementsByClassName("active"));
        //console.log(list);
        list.forEach(element => {
            element.classList.remove("active");
        });

        try {
        functions[ele.innerHTML.toLowerCase()]();
        } catch {
            console.log("Function not coded in yet");
        }
        ele.classList.add("active");
    }

    const formatter = new Intl.DateTimeFormat('en-US', { month: "2-digit", day: "2-digit", year: "2-digit", hour: '2-digit', minute: '2-digit' });

    let pages = 0;
    
    let curPage = 0;

    function addPageButtons() {
        let pageButton =  `<div id="leftright"><input type="button" value="<<" onclick="firstPage();" class="buttonTemplate"/><input type="button" value="<" onclick="previousPage();" class="buttonTemplate"/><span class="buttonTemplate2">${Math.ceil(curPage+1)}</span> <span class="buttonTemplate2">...</span> <span class="buttonTemplate2" id="pageCount">${Math.ceil(pages)}</span><input type="button" value=">" onclick="nextPage();" class="buttonTemplate"/><input type="button" value=">>" onclick="lastPage();" class="buttonTemplate"/></div>`

        document.getElementById("thePoster").insertAdjacentHTML('beforeend', pageButton);

        console.log(curPage)
        document.getElementById("thePoster").scrollTop = 0;
        
    }
    //if (!window.location.href.includes("?"))
        //addPageButtons();
    function previousPage() {
        if (curPage - 1 >= 0) {
            curPage -= 1;
            reloadPage();
        }
    }
    function nextPage() {
        if (curPage + 1 < pages) {
            curPage += 1;
            reloadPage();
        }
    }
    function lastPage() {
        curPage = pages-1;
        reloadPage();
    }
    function firstPage() {
        curPage = 0;
        reloadPage();
    }

    function formatUrl(url) {
        let urlFinal = url;
        urlFinal = urlFinal.replace("https://", "");
        urlFinal = urlFinal.replace("http://", "");
        urlFinal = urlFinal.slice(0, urlFinal.indexOf("/"));
        return urlFinal;
    }
    function getPostCode(postJSON, parentAuthor) {
        var has = {
            id:             postJSON.id             !== undefined ? true : false,
            deleted:        postJSON.deleted        !== undefined ? true : false,
            type:           postJSON.type           !== undefined ? true : false,
            by:             postJSON.by             !== undefined ? true : false,
            time:           postJSON.time           !== undefined ? true : false,
            text:           postJSON.text           !== undefined ? true : false,
            dead:           postJSON.dead           !== undefined ? true : false,
            parent:         postJSON.parent         !== undefined ? true : false,
            poll:           postJSON.poll           !== undefined ? true : false,
            kids:           postJSON.kids           !== undefined ? true : false,
            url:            postJSON.url            !== undefined ? true : false,
            score:          postJSON.score          !== undefined ? true : false,
            title:          postJSON.title          !== undefined ? true : false,
            parts:          postJSON.parts          !== undefined ? true : false,
            descendants:    postJSON.descendants    !== undefined ? true : false
        }
        let xPos = has.type ? (postJSON.type == "comment" ? 20*curRecersive : 0) : 0
        // let types = ["job", "story", "comment", "poll", "pollopt"]
        let title = "";
        let score = has.score ? postJSON.score : 0;
        let id = has.id ? postJSON.id : 0;
        let prefix = ""
        let clickFunction = postJSON.type == "comment" ? "console.log('You tried to click on a comment silly.');" : `pickPost(${id})`
        if (has.type) {
            switch (postJSON.type) {
                case "story":
                    if (has.title) {
                        title = postJSON.title;
                    } else {
                        title = "PLACEHOLDER";
                    }
                    prefix = "Post";
                    break;
                case "comment":
                    title = "Reply To " + parentAuthor + ":";
                    prefix = "Comment";
                    break;
                default:
                    title = "Placeholder title for type \"" + postJSON.type + "\"";
                    prefix = "Post";
            }
        }
        var lines = [
            `<div class="post" style="margin-left: ${xPos}px; width: calc(calc(100% - 20px) - ${xPos}px - 20px)">`,
            `<span class="rate">👍</span>`,
            `<span class="post-title link" style="filter: grayscale(100%); color: white;" onclick="${clickFunction}">${title}</span>`,
            `<span class="post-date">`,
            (has.type ? (postJSON.type == "comment" ? " " : `<span> ${score}</span> points | `) : "") +
            (has.by ? `${prefix} by: <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);" onclick="pickUser('${postJSON.by}')">${postJSON.by}</span> | ` : "") +
            (has.time ? `Posted: ${formatter.format(new Date(postJSON.time*1000))} | ` : ""),
            `<span class="rate">👁️</span> | `,
            `<span class="rate">❤️</span>`,
            (has.url ? ` | Source: <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);" onclick="window.open('${postJSON.url}', '_blank')">${formatUrl(postJSON.url)}</span>` : ""),
            (has.descendants ? ` | Comments: ${postJSON.descendants}` : "") + "</span>",
            (has.text ? `<br><span class="post-desc">${postJSON.text}</span>` : ''),
            "</span><br>",
            "</div>"
        ]
        let returnValue = "";
        lines.forEach((e)=>{
            returnValue += e;
        })
        if (has.deleted ? !postJSON.deleted : true) {
            return returnValue;
        } else {
            return ""
        }
    }
    let list = {
        entries: [],
        postDatas: [],
        section: "",
    }
    function setParameter(par, val) {
        window.location.href = "?" + par + "=" + val;
    }
    async function getData(url) {
        try {
            let json = [];
            if (list.section != currentSection) {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
            
                json = await response.json();
                list.entries = json;
            } else {
                json = list.entries;
            }
            
            await json.forEach(async (e, i) => {
                let json2 = {};
                if (list.postDatas[i] == null || list.section != currentSection) {
                    const response2 = await fetch("https://hacker-news.firebaseio.com/v0/item/" + e + ".json");
                    json2 = await response2.json();
                    list.postDatas[i] = json2;
                } else {
                    json2 = list.postDatas[i];
                }
                curSection = (20*curPage);
                if (i >= curSection && i < curSection+20) {
                    document.getElementById("thePoster").insertAdjacentHTML('beforeend', getPostCode(json2));
                }
                //console.log();
                pages = list.entries.length/20;
                try {
                document.getElementById('pageCount').innerHTML = Math.ceil(pages);
                } catch {
                    console.log("Page counter is not on screen.")
                }
            })

            if (list.section != currentSection)
                list.section = currentSection;
            //console.log(json); 
        } catch (error) {
            console.error(error.message);
        }
       return
    }
    async function getPost(id) {
        try {
            const response = await fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json");
            json = await response.json();
            console.log(json);
            document.getElementById("thePoster").insertAdjacentHTML('beforeend', getPostCode(json));
            document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">Comments: (${json.descendants})</span>`)
            getComments(id, false);
        } catch (error) {
            console.error(error.message);
        }
    }
    function changeCommentIndicator(id){
        if (document.getElementById(id + '-children').style.display != 'none') {
            document.getElementById(id + '-children').style.display = 'none';
            document.getElementById(id + '-indicator').innerHTML = 'Show Replies ▲';
        } else if (document.getElementById(id + '-children').style.display == 'none') {
            document.getElementById(id + '-children').style.display = 'block';
            document.getElementById(id + '-indicator').innerHTML = 'Hide Replies ▼';
        }
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }
    async function getComments(id, isChild = false) {
        console.log("adasd");
        try {
            const response = await fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json");
            json = await response.json();
            console.log(json.kids);
            json.kids.forEach(async (e) => {
                const response2 = await fetch("https://hacker-news.firebaseio.com/v0/item/" + e + ".json");
                const json2 = await response2.json();
                const parentResponse = await fetch("https://hacker-news.firebaseio.com/v0/item/" + json2.parent + ".json");
                const pJ = await parentResponse.json();
                let style = isChild ? "position: relative; left: 50px; width: 95%; box-sizing: border-box;" : "width: 100%; box-sizing: border-box;"
                let replyButton = json2.kids !== undefined ? (json2.kids.length > 0 ? `<span class="link" id="${e}-indicator" onclick="changeCommentIndicator(${e});">Hide Replies ▼</span>` : "") : ""
                console.log(pJ)
                var htmlCode = `
                <div id="${e}-object" style="${style}">
                <div id="${e}-body" class="post" style="${style}">${getPostCode(json2, pJ.by)}${replyButton}
                </div>
                <div id="${e}-children" class="comment" style="${style}">
                
                </div>
                </div>`
                if (isChild) {
                    if (getPostCode(json2) != "") {
                        document.getElementById(json2.parent + "-children").insertAdjacentHTML('beforeend', htmlCode);
                    }
                } else {
                    if (getPostCode(json2) != "") {
                        document.getElementById("thePoster").insertAdjacentHTML('beforeend', htmlCode);
                    }
                }
                if (json2.kids !== undefined) {
                    await getComments(e, true);
                }
            })
            
        } catch (error) {
            console.error(error.message);
        }
    }
    function pickPost(id, pass) {
        if (!pass || pass === undefined) {
            setParameter("post", id);
        } else {
            getPost(id)
        }
    }
    async function getUser(idList) {
        id = idList[0];
        type = idList[1] !== undefined ? idList[1] : "none";
        try {
            const response = await fetch("https://hacker-news.firebaseio.com/v0/user/" + id + ".json");
            json = await response.json();
            
            let has = {};
            if (json == null) {
                has = {
                    id: false
                }
            } else {
                has = {
                    id:         json.id         !== undefined ? true : false,
                    created:    json.created    !== undefined ? true : false,
                    karma:      json.karma      !== undefined ? true : false,
                    about:      json.about      !== undefined ? true : false,
                    submitted:  json.submitted  !== undefined ? true : false
                }
            }
            var lines = [];
            // let types = ["job", "story", "comment", "poll", "pollopt"]
            let comments =  [];
            let jobs =      [];
            let stories =   [];
            let polls =     [];
            let pollopts =  [];
            //json.about = txt1;
            if (has.id && type === "none") {
                lines = [
                    `<div class="post">`,
                    `<span class="post-title">${json.id}</span><br>`,
                    (has.karma ? `<span class="post-desc">Karma: ${json.karma}</span><br>` : ''),
                    (has.created ? `<span class="post-desc">Account Created: ${formatter.format(new Date(json.created*1000))}</span><br>` : ""),
                    (has.about ? `<span class="post-desc">About: <br>${json.about}</span><br>` : ""),
                    (has.submitted ? `<span class="post-desc link" style="font-weight: 700;" onclick="window.location.href += '-submissions'">See User's Submissions</span>` : ""),
                    `</div>`
                ]
            } else if (type == "submissions") {
                let occurrence = 0;
                document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span id="fetching" class="post-title fonter">Fetching User's Submissions</span>`)
                await json.submitted.forEach(async (e, i, arr) => {
                    const response2 = await fetch("https://hacker-news.firebaseio.com/v0/item/" + e + ".json");
                    var json2 = await response2.json();
                    switch (json2.type) {
                        case "comment":
                            comments.push(json2);
                            break;
                        case "job":
                            jobs.push(json2);
                            break;
                        case "story":
                            stories.push(json2);
                            break;
                        case "poll":
                            polls.push(json2);
                            break;
                        case "pollopt":
                            pollopts.push(json2);
                            break;
                    }
                    occurrence++;
                    if (occurrence == json.submitted.length) {
                        occurrence = 0;
                        document.getElementById("fetching").remove();
                        comments.length != 0 ? document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">${json.id}'s Comments: (${comments.length})</span><div id="users-comments"></div>`) : 0;
                        comments.forEach(async (a, m, c)=>{
                            const parentResponse = await fetch("https://hacker-news.firebaseio.com/v0/item/" + a.parent + ".json");
                            const pJ = await parentResponse.json();
                            document.getElementById("users-comments").insertAdjacentHTML('beforeend', getPostCode(a, pJ.by));
                        })
                        stories.length != 0 ? document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">${json.id}'s Stories: (${stories.length})</span><div id="users-stories"></div>`) : 0;
                        stories.forEach((a, m, c)=>{
                            document.getElementById("users-stories").insertAdjacentHTML('beforeend', getPostCode(a));
                        })
                        jobs.length != 0 ? document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">${json.id}'s Jobs: (${jobs.length})</span><div id="users-jobs"></div>`) : 0;
                        jobs.forEach((a, m, c)=>{
                            document.getElementById("users-jobs").insertAdjacentHTML('beforeend', getPostCode(a));
                        })
                        polls.length != 0 ? document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">${json.id}'s Polls: (${polls.length})</span><div id="users-polls"></div>`) : 0;
                        polls.forEach((a, m, c)=>{
                            document.getElementById("users-polls").insertAdjacentHTML('beforeend', getPostCode(a));
                        })
                        pollopts.length != 0 ? document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">${json.id}'s PollOpts: (${pollopts.length})</span><div id="users-pollopts"></div>`) : 0;
                        pollopts.forEach((a, m, c)=>{
                            document.getElementById("users-pollopts").insertAdjacentHTML('beforeend', getPostCode(a));
                        })
                        
                    }
                })
                
            } else {
                lines = [
                    `<div class="post">`,
                    `<span class="post-title">Invalid User/Page</span><br>`,
                    `<span class="post-desc">Please Go Back</span>`,
                    `</div>`
                ]
            }
            
    //        <div class="post">
    //                 <span class="post-title">${pager.id}</span>
    //                 <br>
    //                 <span class="post-desc">Karma: ${pager.karma}</span><br>
    //                 <span class="post-desc">Account Created: ${formatter.format(new Date(pager.created*1000))}</span><br>
    //                 ${pager.about !== undefined ? '<span class="post-desc">About: <br>' + pager.about + '</span>' : ""}
    //                 <span class="link" style="filter: grayscale(100%); color: white; font-weight: 700; font-size: 12px;" onclick="seeUserSubmit(${pager.submitted});">User's Submissions</span>
    //             </div>
            let returnValue = "";
            lines.forEach((e)=>{
                returnValue += e;
            })
            document.getElementById("thePoster").insertAdjacentHTML('beforeend', returnValue);
            console.log(json);
        } catch (error) {
            console.error(error.message);
        }
    }
    function pickSection(sec, pass) {
        pass = pass !== undefined ? pass : false;
        curPage = 0;
        currentSection = sec;
        if (!pass) {
            setParameter("section", sec)
        }
        //reloadPage();
    }
    function pickUser(user) {
        setParameter("user", user);
    }
    async function reloadPage() {
        
        document.getElementById("thePoster").innerHTML = "";
        let pass = false;
        if (window.location.href.includes("?")) {
            let baseURL = window.location.origin + window.location.pathname;
            let paramText = window.location.href.slice(baseURL.length, window.location.href.length);
            
            let urlParameters = paramText.split("?");
            try {
                urlParameters = urlParameters.filter(value => Object.keys(value).length !== 0);
            } catch (e) {
                console.log(e)
            }
            urlParameters.forEach((e, i)=>{
                urlParameters[i] = urlParameters[i].split("=");
            })
            let currentParam = urlParameters[urlParameters.length-1];
            console.log(currentParam[0])
            switch (currentParam[0]) {
                case "user":
                    getUser(currentParam[1].split("-"));
                    return;
                case "section":
                    if (currentSection != currentParam[1]) {
                        pickSection(currentParam[1], true)
                    }
                    pass = true;
                    break;
                case "post":
                    pickPost(currentParam[1], true)
                    break;
                }
        } else {
            pass = true;
        }
        if (pass) {
            addPageButtons();
            await getData("https://hacker-news.firebaseio.com/v0/" + currentSection + ".json?print=pretty");
        }
        document.getElementById(currentSection).classList.add("active");
        return
    }

    document.getElementById("thePoster").onscroll = function () {
        //;
        var poster = document.getElementById("thePoster");
        var posterRect = poster.getBoundingClientRect();
        if (poster.scrollHeight - poster.scrollTop < posterRect.y + posterRect.height) {
            document.getElementById("scrolltop").style.opacity = "1";
            document.getElementById("scrolltop").style.pointerEvents = "auto";
        } else {
            document.getElementById("scrolltop").style.opacity = "0";
            document.getElementById("scrolltop").style.pointerEvents = "none";
        }
        
    }
    
    reloadPage();
    
   

    


}