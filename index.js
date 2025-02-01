import{a as L,i as h,S as b}from"./assets/vendor-hwdYKDic.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",$="48310758-fb94caf5d2a9d2c066442dfac";async function m(t,r=1,s=15){const a=`${S}?key=${$}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true`;try{const e=await L.get(a,{params:{per_page:s,page:r}});if(e.status!==200)throw new Error(`Error: ${e.status}`);return{totalHits:e.data.totalHits,hits:e.data.hits||[]}}catch(e){throw console.error("API Error:",e.message),new Error("Failed to fetch photos, please try again later.")}}function g(t){return t.map(({webformatURL:r,largeImageURL:s,tags:a,likes:e,views:o,comments:n,downloads:E})=>`<li class="gallery-card">
        <a href="${s}">
          <img class="gallery-img" width="360" height="152" src="${r}" alt="${a}" />
        </a>
        <ul class="card-stats">
            <li class="card-stats-item">
              <p>Likes</p>
              <p>${e}</p>
            </li>
            <li class="card-stats-item">
              <p>Views</p>
              <p>${o}</p>
            </li>
            <li class="card-stats-item">
              <p>Comments</p>
              <p>${n}</p>
            </li>
            <li class="card-stats-item">
              <p>Downloads</p>
              <p>${E}</p>
            </li>
        </ul>
    </li>`).join("")}const P=document.querySelector(".form"),d=document.querySelector(".js-gallery"),p=document.querySelector(".loader"),i=document.querySelector(".load");let l=1,c="";const u=15;let y=0,f;P.addEventListener("submit",M);i.addEventListener("click",q);i.style.display="none";async function M(t){t.preventDefault();const r=t.currentTarget;if(c=r.elements.user_query.value.trim(),c===""){h.show({title:"Error",message:"Input can't be empty!",position:"center",color:"red"});return}d.innerHTML="",l=1,y=0,i.style.display="none";try{p.style.display="flex";const s=await m(c,l,u);if(s.totalHits===0){h.show({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",color:"yellow"});return}y=Math.min(s.totalHits,60),d.innerHTML=g(s.hits),f=new b(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),f.refresh(),w(s.hits.length)}catch(s){console.error("Error fetching photos:",s)}finally{p.style.display="none",r.reset()}}async function q(){l+=1,i.style.display="none";try{p.style.display="flex";const t=await m(c,l,u);d.insertAdjacentHTML("beforeend",g(t.hits)),f.refresh(),H(),w(t.hits.length)}catch(t){console.error("Error fetching more photos:",t)}finally{p.style.display="none"}}function H(){const t=d.firstElementChild;if(!t)return;const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}function w(t){const r=Math.ceil(y/u);l>=r||t<u?(i.style.display="none",h.show({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"center",color:"blue"})):i.style.display="block"}
//# sourceMappingURL=index.js.map
