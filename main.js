var studentData = {};
var i;

function startForm() {
    document.getElementById("intro_text").style.display = "none";
    document.getElementById("exportCGPA").style.display = "none";
    document.getElementById("form").style.display = "block";
    console.log("Form activated");
    document.getElementById("about").style.display = "none";

}
function exportCGPA() {
    document.getElementById("intro_text").style.display = "none";
    document.getElementById("form").style.display = "none";
    document.getElementById("exportCGPA").style.display = "block";
    console.log("Export CGPA not currently available");
}
function submitName() {
    studentData.name = document.getElementById("name").value;
    studentData.department = document.getElementById("department").value;
    studentData.matricNo = document.getElementById("matric_no").value;
    if (!studentData.name || !studentData.department || !studentData.matricNo ) {
        alert("Please input all fields")
    } else{
    document.getElementById("form").style.display = "none";
    document.getElementById("inputScores").style.display = "block";
    console.log(`Data submitted: ${studentData.name}, ${studentData.department}, ${studentData.matricNo}`);
    }

}
function Scores() {
    studentData.noOfCourses = document.getElementById("noOfCourses").value;
    if (!studentData.noOfCourses) {
        alert("Please input all fields");
    } else{
    document.getElementById("Continuebtn").style.display = "none"
    console.log(`No of Courses submitted: ${studentData.noOfCourses}`);
    for (i = 0; i < studentData.noOfCourses; i++) {
        var html = `
<br>
<form onsubmit ="return false;>
 <div id="gradeAndScore">
<pre>Course ${i+1}</pre>
    <label for="credit${i + 1}" style"color:black" >Enter credit unit</label><br>
<input type="number" min="1" max="15" id="credit${i + 1}" value ="1"><br>
<label for="grade${i+1}">Enter grade</label><br>
<select id= "grade${i+1}" required>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
    </select><br id ="last">
</div></form>
`
        document.getElementById("inputScores").insertAdjacentHTML("beforeend", html);
        
    }
    var btn = document.createElement("button");
    btn.innerHTML = "Calculate CGPA"
    var btnEvent = document.createAttribute("onclick")
    var btnID = document.createAttribute("id");
    var btnType = document.createAttribute("type");
    btnEvent.value = "calculateCGPA()";
    btnID.value = "btnID";
    btnType.value = "submit";
    btn.setAttributeNode(btnEvent);
    btn.setAttributeNode(btnID);
    btn.setAttributeNode(btnType);
    document.getElementById("inputScores").appendChild(btn)
    }
}

function calculateCGPA() {
    var creditsArray = [];
    var gradesArray = [];
    var weightedArray = [];
    var WeightedSum = 0;
    var CreditSum = 0;
    for (i = 0; i < studentData.noOfCourses; i++) {
        creditsArray[i] = document.getElementById(`credit${i + 1}`).value;
        var grades = document.getElementById(`grade${i + 1}`).value;
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
    
    for (i = 0; i < studentData.noOfCourses; i++) {
        WeightedSum += weightedArray[i];
        CreditSum += creditsArray[i];
        
    }
    var CGPA = WeightedSum / CreditSum;
    CGPA = parseFloat(CGPA).toFixed(2);

    console.log(WeightedSum)
    console.log(CreditSum)
    console.log(`CGPA = ${CGPA}`);
    var cgpaClass = "";
    if (CGPA>=4.5) {
        cgpaClass = "First Class Division";
    } else if(CGPA>=3.5){
        cgpaClass = "Second Class Upper divison";
    }
    else if(CGPA>=2.4){
        cgpaClass = "Second Class Lower Division";
    }
    else {
        cgpaClass = "Third Class";

    }
    var result = `<div>
        Your CGPA is:<h1>${CGPA}</h1><h3>${cgpaClass}</h3></div>
    `
    document.getElementById("btnID").insertAdjacentHTML("afterend", result);
    document.getElementById("btnID").style.display = "none";

    
}
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
  console.log("BUtton clicked")
  
  const icon = hamburger.querySelector('i');
  if (menu.classList.contains('active')) {
    icon.classList.replace('fa-bars', 'fa-times');
  } else {
    icon.classList.replace('fa-times', 'fa-bars');
  }
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
    hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
  });
});
