const categories={}
let activeList=[]
const toDoForm = document.getElementById('do-form')
const toDoList = document.getElementById('do-list')

// form functions
toDoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = getFormData()
  categoryAssign(formData)
  activeList=document.getElementsByTagName('li')
  console.log(activeList)    
})

function getFormData(){
  let todoEntry = document.getElementById('do-item')
  let categoryEntry = document.getElementById('do-category')
  return {
    todo : `${todoEntry.value}`,
    category : `${categoryEntry.value}`
  }
}

// category assignment
function titleCase(catName){
  let output=''
  const namos = catName.split(' ')
  for (const namo of namos){
      output+= namo[0].toUpperCase() + namo.substring(1) + ' '
  }
  return output.trim(' ')
}

function categoryAssign({todo,category}){
  if (category === ''){
    postToList(todo,'Uncategorized')
  } else if (categories.hasOwnProperty(titleCase(category))){
    postToList(todo,titleCase(category))
  } else {
    titleCategory = titleCase(category)
    categories[titleCategory]=1
    console.log(categories)    
    createCategoryList(titleCategory)
    postToList(todo,titleCategory)
  }
}

function createCategoryList(category){
  const categoryHeader = document.createElement('h3')
  categoryHeader.innerText = `${category}`
  const categoryList = document.createElement('ul')
  categoryList.setAttribute('id',`${category}`)
  toDoList.append(categoryHeader,categoryList)  
}

// posting to-do
function postToList(todo,category){
  listParent = document.getElementById(`${category}`)
  todoItem = document.createElement('li')
  todoItem.setAttribute("onclick","toggleDone(this)")
  todoItem.setAttribute("onmouseover","resize(this,'110%')")
  todoItem.setAttribute("onmouseout","resize(this,'100%')")
  todoItem.innerText=todo
  listParent.append(todoItem)
}

// to-do done
function toggleDone(line){
  if (line.style.textDecoration=='line-through'){
    line.style.textDecoration='none'
    line.style.color='white'
  } else {
    line.style.textDecoration='line-through'
    line.style.color='gray'
  }
}

function resize(text,size){
  text.style.fontSize=size
}
