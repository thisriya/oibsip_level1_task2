const h1=document.querySelector(".heading-primary");
console.log(h1);

const yearEl=document.querySelector(".year");
const currentYear=new Date().getFullYear();
yearEl.textContent=currentYear;


// make mobile navigation work
const btnNavEl=document.querySelector(".btn-mobile-nav");
const headerEl=document.querySelector(".header");

btnNavEl.addEventListener('click',function(){
    headerEl.classList.toggle("nav-open");
})

const alllinks=document.querySelectorAll('a:link');
alllinks.forEach(function(link){
    link.addEventListener('click',function(e){
        e.preventDefault();
        const href=link.getAttribute("href");

    //scroll to top
        if(href==="#") window.scrollTo({
            top:0,
            behavior:"smooth",
        });
        
    //scroll to other links
        if(href!== "#" && href.startsWith("#"))  {
            const sectionEl=document.querySelector(href);
            sectionEl.scrollIntoView ({behavior: "smooth"});
        }

    //close mobile navigation
        if(link.classList.contains('main-nav-link'))
        headerEl.classList.toggle("nav-open");
    })
})

const sectionHeroEl=document.querySelector(".section-hero");
const obs=new IntersectionObserver(function(entries){
    const ent=entries[0];
    if(ent.isIntersecting===false) {
      document.body.classList.add("sticky");
    }

    if(ent.isIntersecting===true) {
        document.body.classList.remove("sticky");
      }
},
{
    root:null,
    threshold:0,
    rootMargin:'-80px',
});
obs.observe(sectionHeroEl);
