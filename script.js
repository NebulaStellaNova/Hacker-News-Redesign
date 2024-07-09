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
    function loadFile(filePath) {
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
          result = xmlhttp.responseText;
        }
        return result;
      }

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
                    <span class="post-desc">Hello, I am <span class="link" onclick="pickSection('user/jasontheone111')">Nebula S. Nova.</span><br>
                        I created this redesign as a way to get my knowledge/abilities on coding out there. With hopes that someone might hire me. I can code in various major languages; C++, HTML, JavaScript, Java, LUA, HaxeFlixel, Python, and more.<br><br>
                        Why doesn't the login/signup or work and/or why isn't there an upload button?<br>
                        This is not the real Hacker News website, I don't have access to user information. Nor do I have access to the post upload system. This also means that I have no access to the upvote system, the comment system, or the other user interaction systems.<br><br>
                        Why isn't the tabbing in the comment sections right?<br>
                        I don't exactly know. Making the tabbing correct requires alot of math, which I did wrong.
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

    function login() {

    }

    function signup() {

    }
    
    let curRecersive = 0;
    let offset = 0;
    let curParent = null;
    const formatter = new Intl.DateTimeFormat('en-US', { month: "2-digit", day: "2-digit", year: "2-digit", hour: '2-digit', minute: '2-digit' });
    function createPost(ids, index, commentmode, skipreset) {
        commentmode = commentmode == undefined ? false : commentmode;
        skipreset = skipreset == undefined ? false : skipreset;
        curSection = (20*index);
        if (!skipreset) {
            curRecersive = 0;
        }
        for (let i = curSection; i < curSection+20; i++) {
            if (ids[i] !== undefined) {
                console.log(curSection);    
                
                    let post = JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/item/" + ids[i] + ".json?print=pretty"))
                    let parentPost = null;
                    if (post.parent !== undefined || post.parent != null) {
                        parentPost = JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/item/" + post.parent + ".json?print=pretty"))
                    }
                    let url = ""
                    let url2 = ""
                    let desc = ""

                   

                    const formattedTime = formatter.format(new Date(post.time*1000));
                    if (post.url == undefined) {} else {
                        url = post.url;
                        url2 = post.url;
                        url2 = url2.replace("https://", "");
                        url2 = url2.replace("http://", "");
                        url2 = url2.slice(0, url2.indexOf("/"));
                    }
                    let commentCount = post.descendants !== undefined ? post.descendants : 0;
                    if (post.text == undefined) {} else {
                        desc = post.text;
                    }
                    let isReply = commentmode ? (parentPost.title !== undefined && parentPost.title != null) ? false : true : false;
                    var thePost = `
        <div class="post" style="margin-left: ${20*curRecersive}px; width: calc(calc(100% - 20px) - ${20*curRecersive}px - 20px)">
            <span class="rate">👍</span>
            <span class="post-title link" style="filter: grayscale(100%); color: white;" onclick="pickPost(${post.id})">${commentmode ? isReply ? "Reply to: " + parentPost.by : (parentPost != null ? "Comment On: " + (parentPost.title !== undefined ? parentPost.title : "(Another Comment)") : post.title) : (parentPost != null ? "Comment On: " + (parentPost.title !== undefined ? parentPost.title : "(Another Comment)") : post.title)}</span>
            <span class="post-date">
                ${parentPost != null ? '' : '<span id="points1209321">' + post.score + '</span> points'} by 
                <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);" onclick="pickSection('user/${post.by}')">${post.by}</span> | Date: ${formattedTime} | 
                <span class="rate">👁️</span> | 
                <span class="rate">❤️</span>${url2 != "" ? " |  Source:" : ""}
                <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);" onclick="window.open('${url}', '_blank')">${url2}</span> | 
                <span class="link" style="filter: grayscale(100%); color: rgba(255, 255, 255, 0.5);">Comments: ${commentCount}</span>
            </span><br>
            <span class="post-desc">${desc}</span>
        </div>`;
                if (post.title !== undefined || parentPost !== null) {
                    document.getElementById("thePoster").insertAdjacentHTML('beforeend', thePost);
                }
                if (commentmode) {
                    if (post.kids !== undefined && post.kids.length > 0) {
                        if (curParent != parentPost) {
                            curRecersive += 1;
                            curParent = parentPost;
                        }
                        createPost(post.kids, 0, true, true);
                    } else {
                        if (parentPost.title !== undefined || parentPost.title !== null) {
                            if (curParent != parentPost) {
                                curRecersive = 1;
                            }
                            
                        }
                    }
                    if ((parentPost.title !== undefined && parentPost.title !== null ? true : false)) {
                        curRecersive = 0;
                        offset = 0;
                    }
                }
                
            }
        }
        


        
    }
    
    let pager = JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"));
    createPost(JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")), 0);

    let pages = pager.length/20;
    console.log(pages);
    
    let curPage = 0;
    if (window.location.href.includes("?user=")) {
        pickSection("user/" + window.location.href.slice(window.location.href.lastIndexOf("?user=")+("?user=".length), window.location.href.length))
    }
    if (window.location.href.includes("?post=")) { 
        pickPost(window.location.href.slice(window.location.href.lastIndexOf("?post=")+("?post=".length), window.location.href.length))
    }
    function pickPost(postID) {
        if (!window.location.href.includes("?post=") && !window.location.href.includes("?user=")) {
            window.location.href += "?post=" + postID;
        } else {
            document.getElementById("thePoster").innerHTML = staticPost;
            createPost([postID], 0);
            document.getElementById("thePoster").insertAdjacentHTML('beforeend', `<span class="post-title fonter">Comments:</span>`);
            let comments = JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/item/" + postID + ".json?print=pretty")).kids
            createPost(comments, 0, true, false)
            console.log(comments)
            document.getElementById("thePoster").scrollTop = 0;
        }
    }
    function pickSection(sec) {
        
        currentSection = sec;
        pager = JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/" + sec + ".json?print=pretty"));
        pages = pager.length/20;
        if (sec.startsWith("user/")) {
            if (!window.location.href.includes("?user=") && !window.location.href.includes("?post=")) 
                window.location.href += "?user=" + pager.id;
            document.getElementById("thePoster").innerHTML = staticPost;
            console.log(pager.submitted)
            var thePost = `
                <div class="post">
                    <span class="post-title">${pager.id}</span>
                    <br>
                    <span class="post-desc">Karma: ${pager.karma}</span><br>
                    <span class="post-desc">Account Created: ${formatter.format(new Date(pager.created*1000))}</span><br>
                    ${pager.about !== undefined ? '<span class="post-desc">About: <br>' + pager.about + '</span>' : ""}
                    <span class="link" style="filter: grayscale(100%); color: white; font-weight: 700; font-size: 12px;" onclick="seeUserSubmit(${pager.submitted});">User's Submissions</span>
                </div>`;
            
                document.getElementById("thePoster").insertAdjacentHTML('beforeend', thePost);
        } else {
            if (window.location.href.includes("?user=")) {
                window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf("?user="))
            }
            if (window.location.href.includes("?post=")) {
                window.location.href = window.location.href.slice(0, window.location.href.lastIndexOf("?post="))
            }
            firstPage();
        }
        
    }

    function seeUserSubmit(list) {
        document.getElementById("thePoster").innerHTML = staticPost;
        createPost(pager.submitted, 0);
        //firstPage();
    }

    function addPageButtons() {
        let pageButton =  `<div id="leftright"><input type="button" value="<<" onclick="firstPage();" class="buttonTemplate"/><input type="button" value="<" onclick="previousPage();" class="buttonTemplate"/><span class="buttonTemplate2">${Math.ceil(curPage+1)}</span> <span class="buttonTemplate2">...</span> <span class="buttonTemplate2">${Math.ceil(pages)}</span><input type="button" value=">" onclick="nextPage();" class="buttonTemplate"/><input type="button" value=">>" onclick="lastPage();" class="buttonTemplate"/></div>`

        document.getElementById("thePoster").insertAdjacentHTML('beforeend', pageButton);

        console.log(curPage)
        document.getElementById("thePoster").scrollTop = 0;
        
    }
    if (!window.location.href.includes("?"))
        addPageButtons();
    function previousPage() {
        if (curPage - 1 >= 0) {
            document.getElementById("thePoster").innerHTML = staticPost;
            curPage -= 1;
            createPost(JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/" + currentSection + ".json?print=pretty")), curPage);
            addPageButtons();
        }
    }
    function nextPage() {
        if (curPage + 1 < pages) {
            document.getElementById("thePoster").innerHTML = "";
            curPage += 1;
            createPost(JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/" + currentSection + ".json?print=pretty")), curPage);
            addPageButtons();
        }
    }
    function lastPage() {
        document.getElementById("thePoster").innerHTML = "";
        curPage = pages-1;
        createPost(JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/" + currentSection + ".json?print=pretty")), curPage);
        addPageButtons();
    }
    function firstPage() {
        document.getElementById("thePoster").innerHTML = "";
        curPage = 0;
        createPost(JSON.parse(loadFile("https://hacker-news.firebaseio.com/v0/" + currentSection + ".json?print=pretty")), curPage);
        addPageButtons();
    }

   

    


}