function startForm(){
    document.getElementById("intro_text").style.display = "none";
    document.getElementById("form").style.display = "block";
    console.log("Form activated");
}
var studentData ={};
var i;
function submitName(){
    studentData.name = document.getElementById("name").value;
    studentData.department = document.getElementById("department").value;
    studentData.matricNo = document.getElementById("matric_no").value;
    document.getElementById("form").style.display = "none";
    document.getElementById("inputScores").style.display = "block";
    console.log(`Data submitted: ${studentData.name}, ${studentData.department}, ${studentData.matricNo}`);
    
}
function Scores(){
    studentData.noOfCourses = document.getElementById("noOfCourses").value;
    document.getElementById("Continuebtn").style.display = "none"
    console.log(`No of Courses submitted: ${studentData.noOfCourses}`);
for ( i = 0; i < studentData.noOfCourses; i++) {
    var html =`
   <br><div><legend><em>Course ${i+1}</em></legend><label for="credit${i+1}" style"color:black" >Enter credit unit</label><br>
<input type="number" min="1" max="15" id="credit${i+1}"><br>
<label for="grade${i+1}">Enter grade</label><br>
<input type="text" id="grade${i+1}"><br id ="last">
</div>`
   document.getElementById("inputScores").insertAdjacentHTML("beforeend", html);  
}
    var btn = document.createElement("button");
    btn.innerHTML = "Calculate CGPA"
    var btnEvent = document.createAttribute("onclick")
    btnEvent.value ="calculateCGPA()"
    btn.setAttributeNode(btnEvent);
    document.getElementById("inputScores").appendChild(btn)
    
}

function calculateCGPA() {
    var creditsArray = [];
    var gradesArray = [];
    var weightedArray =[];
    var WeightedSum = 0;
    var CreditSum =0;
    for (i = 0; i < studentData.noOfCourses; i++) {
    creditsArray[i] = document.getElementById(`credit${i+1}`).value;
    var grades = document.getElementById(`grade${i+1}`).value;
    grades = grades.toUpperCase();

    switch (grades) {
        case 'A':
            gradesArray[i] = 5;
            break;
        case 'B':
            gradesArray[i] = 4;
            break;
        case 'C':
            gradesArray[i] = 3;
            break;
        case 'D':
            gradesArray[i] = 2;
            break;
        case 'E':
            gradesArray[i] = 1;
            break;
        case 'F':
            gradesArray[i] = 0              
    
        default:
            alert("Please input grades")
            break;
    }
    creditsArray = creditsArray.map(Number)

    weightedArray[i] = creditsArray[i] * gradesArray[i];
    
    }
    console.log(creditsArray);
    console.log(gradesArray);
    console.log(weightedArray);
    for ( i = 0; i < studentData.noOfCourses; i++) {
    WeightedSum += weightedArray[i]; 
    CreditSum += creditsArray[i];
    }
   console.log(WeightedSum)
   console.log(CreditSum)
   console.log(`CGPA = ${WeightedSum/CreditSum}`);
   document.write(`Your CGPA is ${WeightedSum/CreditSum}`);
}

