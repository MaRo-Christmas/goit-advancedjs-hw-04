import{a as w,i as d,S as b}from"./assets/vendor-hwdYKDic.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const E="https://pixabay.com/api/",$="48310758-fb94caf5d2a9d2c066442dfac";async function y(t,r=1,s=15){const i=`${E}?key=${$}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true`;console.log(`Fetching photos for query: ${t}, page: ${r}, perPage: ${s}`);try{const e=await w.get(i,{params:{per_page:s,page:r}});if(e.status===200){const o=Math.min(e.data.totalHits,500);return console.log(`Total hits: ${e.data.totalHits}, Limited to: ${o}`),e.data}else throw new Error(`Error: ${e.status}`)}catch(e){throw console.error("Error in API request:",e),new Error("Failed to fetch photos")}}function m(t){return t.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:o,comments:c,downloads:g})=>`<li class="gallery-card">
        <a href="${s}">
          <img class="gallery-img" width="360" height="152" src="${r}" alt="${i}" />
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
              <p>${c}</p>
            </li>
            <li class="card-stats-item">
              <p>Downloads</p>
              <p>${g}</p>
            </li>
        </ul>
    </li>`).join("")}const L=document.querySelector(".form"),a=document.querySelector(".js-gallery"),p=document.querySelector(".loader"),n=document.querySelector(".load");let l=1,h="";const f=15;let u;L.addEventListener("submit",M);n.addEventListener("click",P);n.style.display="none";async function M(t){t.preventDefault();const r=t.currentTarget;if(h=r.elements.user_query.value.trim(),h===""){d.show({title:"Error",message:"Input can't be empty!",position:"center",color:"red"});return}a.innerHTML="",l=1,n.style.display="none";try{p.style.display="flex";const s=await y(h,l,f);if(s.total===0){d.show({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",position:"center",color:"yellow"});return}a.innerHTML=m(s.hits),u=new b(".js-gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),u.refresh(),s.hits.length>0&&u.refresh();const i=Math.ceil(Math.min(s.totalHits,500)/f);l<i?n.style.display="block":d.show({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"center",color:"blue"})}catch(s){console.error("Error fetching photos:",s)}finally{p.style.display="none",r.reset()}}async function P(){l+=1,n.style.display="none";try{p.style.display="flex";const t=await y(h,l,f);a.insertAdjacentHTML("beforeend",m(t.hits)),u.refresh();const r=Math.ceil(Math.min(t.totalHits,500)/f);l<r?n.style.display="block":d.show({title:"Info",message:"You have reached the end of the search results.",position:"center",color:"blue"}),S()}catch(t){console.error("Error fetching more photos:",t)}finally{p.style.display="none"}}function S(){const{height:t}=a.firstElementChild.getBoundingClientRect();if(window.scrollBy({top:t*4,behavior:"smooth"}),a.firstElementChild){const{height:r}=a.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*4,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
