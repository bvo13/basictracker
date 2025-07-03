const mealName = document.getElementById("mealname");
const calories = document.getElementById("calories");
const protein = document.getElementById("protein");
const carbs = document.getElementById("carbohydrates");
const fats = document.getElementById("fats");
const addMealsButton = document.getElementById("addmeal");
const submitMealsButton = document.getElementById("mealsubmission");
const mealList = document.getElementById("mealList");
const errorMessage = document.getElementById("errormessage");

const mealTotals = document.getElementById("mealtotals");

function updateTotals(){

    const totals = mealArray.reduce((accumulator,meal)=>{
        accumulator.calorie+=meal.calorie;
        accumulator.proteinAmt+=meal.proteinAmt;
        accumulator.carbAmt+=meal.carbAmt;
        accumulator.fatAmt+=meal.fatAmt;
        return accumulator;
    },{calorie:0, proteinAmt:0, carbAmt:0, fatAmt:0});

    mealTotals.textContent = `Calorie Total: ${totals.calorie},     Protein Total: ${totals.proteinAmt},        
     Carbohydrate Total: ${totals.carbAmt},      Fat Total: ${totals.fatAmt}`
}

let mealArray=[];
addMealsButton.addEventListener("click", ()=> {
    let meal = {
        name: mealName.value.trim(),
        calorie: parseInt(calories.value.trim()),
        proteinAmt: parseInt(protein.value.trim()),
        carbAmt: parseInt(carbs.value.trim()),
        fatAmt: parseInt(fats.value.trim())
    }
    if(meal.name.trim()===""||isNaN(meal.calorie)||isNaN(meal.proteinAmt)||isNaN(meal.carbAmt)||isNaN(meal.fatAmt)){
        errorMessage.textContent = "One or more components of your meal is missing."
        return;
    }
    errorMessage.textContent="";

    mealArray.push(meal);
    updateTotals();


    const li = document.createElement("li");
    li.textContent = `${meal.name}: ${meal.calorie} calories, ${meal.proteinAmt} g protein, ${meal.carbAmt} g carbs, ${meal.fatAmt} g fat`;
    mealList.appendChild(li);

    const deleteButton = document.createElement("button");
    li.appendChild(deleteButton);
    const editButton = document.createElement("button");
    li.appendChild(editButton);

    deleteButton.textContent="Delete Meal";
    deleteButton.addEventListener("click",()=> {
        mealList.removeChild(li);
        let index = mealArray.indexOf(meal);
        mealArray.splice(index,1);

        updateTotals();


        console.log(mealArray);
    })

    editButton.textContent="Edit Meal";
    editButton.addEventListener("click", ()=>{
        li.textContent ="";
        const mealNameInput = document.createElement("input");
        mealNameInput.type="text";
        mealNameInput.value=meal.name;

        const calorieInput = document.createElement("input");
        calorieInput.type="number";
        calorieInput.value=meal.calorie;

        const proteinInput = document.createElement("input");
        proteinInput.type="number";
        proteinInput.value=meal.proteinAmt;

        const carbInput = document.createElement("input");
        carbInput.type="number";
        carbInput.value=meal.carbAmt;

        const fatInput = document.createElement("input");
        fatInput.type="number";
        fatInput.value=meal.fatAmt;

        li.appendChild(mealNameInput);
        li.appendChild(calorieInput);
        li.appendChild(proteinInput);
        li.appendChild(carbInput);
        li.appendChild(fatInput);


        const saveButton = document.createElement("button");
        saveButton.textContent="Save Changes";
        li.appendChild(saveButton);
        const cancelButton = document.createElement("button");
        li.appendChild(cancelButton);
        cancelButton.textContent = "Cancel";
        cancelButton.addEventListener("click", ()=>{
            li.textContent = `${meal.name}: ${meal.calorie} calories, ${meal.proteinAmt} g protein, ${meal.carbAmt} g carbs, ${meal.fatAmt} g fat`;
            li.appendChild(deleteButton);
            li.appendChild(editButton);
        })
        saveButton.addEventListener("click",()=> {
            meal.name = mealNameInput.value.trim();
            meal.calorie = parseInt(calorieInput.value.trim());
            meal.proteinAmt = parseInt(proteinInput.value.trim());
            meal.carbAmt = parseInt(carbInput.value.trim());
            meal.fatAmt = parseInt(fatInput.value.trim());
            li.textContent = `${meal.name}: ${meal.calorie} calories, ${meal.proteinAmt} g protein, ${meal.carbAmt} g carbs, ${meal.fatAmt} g fat`;

            updateTotals();
            li.appendChild(deleteButton);
            li.appendChild(editButton);
        });
    })

    mealName.value="";
    calories.value="";
    protein.value="";
    carbs.value="";
    fats.value="";
})

