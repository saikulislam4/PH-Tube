// get data from api using async function
const pHeroDataDisplay = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const category = data.data

    // Call the showDisplayData  function
    descendingSort = false;
    showDisplayData(category)

}

const showDisplayData = (category) => {
    // load category container 
    const categoryContainer = document.getElementById('button_Container');

    
    category.forEach(categoryItems => {
        const categoryItemId = categoryItems.category_id
       
        // create Category div and button
        const categoryDiv = document.createElement('div');
        const categoryButton = document.createElement("button")
        
        // set category button
        categoryButton.textContent = categoryItems.category
        
        // add class item inside the button
        categoryButton.classList.add('bg-[#25252533]', 'py-2', 'px-5', 'rounded', 'text-lg', 'font-semibold', 'text-[#252525B2]');
        
        // all button active 
        if(categoryItemId === "1000"){
            categoryButton.classList.add('btnActive')
        }

        // remove the class name 
        categoryButton.addEventListener('click', () => {
            const buttons = document.querySelectorAll('button');
            buttons.forEach((button) => {
                button.classList.remove('btnActive');
            })
        //    add active button 
            categoryButton.classList.add('btnActive');

            // call the sort and category item function
            descendingSort = true
            sortFunction()
            categoryId(categoryItemId)
        
        })
        
        // append categoryDiv and category Button
        categoryContainer.appendChild(categoryDiv);
        categoryDiv.appendChild(categoryButton);

    });

}
// Initialize active button and sort descending 
let descendingSort = true;

// sorting function 
const  sortFunction = () => {
    descendingSort = !descendingSort;
    categoryId(setId); 
}


// get category id element from API
const categoryId = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const singleItem = data.data;
    setId = id

    // item container load from dom
    const itemContainer = document.getElementById('singleItem_Container');
    const noContentContainer = document.getElementById('no_ContentContainer');

    // clear the content element
    itemContainer.innerHTML = ''

    // icon link
    const icon = `https://i.ibb.co/TMGpR7w/Check.Png`

    // add no content element
    if (singleItem.length === 0) {
        noContentContainer.classList.remove('hidden')
    } else {
        noContentContainer.classList.add('hidden')
    }

    // sorting element views
    singleItem.sort((a, b) => {
        const sortA = parseInt(a.others.views.replace("k", "000") || 0);
        const sortB = parseInt(b.others.views.replace("k", "000")) || 0;
        return descendingSort ? sortB - sortA : sortA - sortB;
    })

    // forEach function 
    singleItem.forEach((items) => {
        const setDate = parseInt(items.others ?.posted_date);
        // const postDate = document.getElementById('posted_date');
      

        // second to hour and time convert
        const hour = Math.floor((((items.others ?.posted_date) % (3600 * 24)) / 3600));
        const minute = Math.floor((((items.others ?.posted_date) % (3600 * 24))) / 3600);

        // create item div 
        const itemDiv = document.createElement('div');

        // set item element 
        itemDiv.innerHTML = `
        <div class="h-52 relative rounded-lg flex justify-center overflow-hidden">
        <img class=" object-fill w-full" src="${items.thumbnail} alt="">
        <h2 id="posted_date" class=" text-white  py-3 px-2 absolute right-[5%] ${setDate? "post_date":""} bottom-[2%]  z-10  text-sm">${hour? hour + " hrs":""} ${minute? minute + " nin ago":""}</h2>
        </div>
        <div class="mt-5">
        <div class="grid grid-cols-6 gap-3">
            <div class="h-10 w-10 grid-cols-1 rounded-full overflow-hidden">
                <img class="h-full w-full" src="${items?.authors[0]?.profile_picture} alt="picture">
        
            </div>
            <div class=" col-span-5">
                <h2 class="font-bold">${items.title}</h2>
                <div class="flex gap-3 items-center">
                    <h2 class="text-[#171717B2]  capitalize text-sm">${items.authors[0].profile_name}</h2>
                    
                    <img src="${items.authors[0].verified?icon:""}" alt="">
                   
                    
                </div>
                
                <h2 class="text-[#171717B2] capitalize text-sm">${items.others?.views? items.others.views:"No View"}</h2>
              
            </div>
        </div>
        </div>
    `
        // append item element div
        itemContainer.appendChild(itemDiv)

    });
}

// set event listener at sortButton
sortButton.addEventListener('click', () => {
    sortFunction()
    sortButton.classList.toggle('btnActive')
})

// load blog and close button  
const blogContainer = document.getElementById('addBlogBtn');
const blogBtn = document.getElementById('blogBtn');
const closeBlog = document.getElementById('closeBlog');

// blog show button 
blogBtn.addEventListener('click', () => {
    blogContainer.classList.remove('hidden')
})
// blog close button 
closeBlog.addEventListener('click', () => {
    blogContainer.classList.add('hidden')
})

// call the pHeroDataDisplay function
pHeroDataDisplay();

// call the categoryId and show all items

categoryId("1000")