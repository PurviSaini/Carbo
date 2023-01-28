//store the name of the car company which is clicked
$(".cars").click(function () {
  localStorage.setItem("name", this.name);
});

$("#titleOfCard").text(localStorage.getItem("name"));

$("#dropDownMenu").change(function () {
  $("#searchBtn").removeAttr("disabled");
});

// filling the dropdown with the models
$.ajax({
  url: "/fetch-model",
  type: "POST",
  data: `${localStorage.getItem("name")}`,
  dataType: "json",
  success: function (res) {
    res[Object.keys(res)].forEach((element) => {
      $("#dropDownMenu").append(
        '<option value="' +
          element[Object.keys(element)] +
          '">' +
          element[Object.keys(element)] +
          "</option>"
      );
    });
  },
});

//displaying the best options
$("#searchBtn").click(function () {
  $.ajax({
    url: "/getbest",
    type: "POST",
    data: `${dropDownMenu.value}`,
    dataType: "json",
    success: function (res) {
      let contentArr = res[Object.keys(res)];
      document.getElementById("displayBest").style.display = "block";
      document.getElementById("displayBest").innerHTML =
        "<b>Explore the best Options:</b> <br>";
      contentArr.forEach((element) => {
        document.getElementById("displayBest").innerHTML += element["Models"];
        document.getElementById("displayBest").innerHTML += "<br>";
      });
    },
  });
});

//displaying the model information
$("#searchBtn").click(function () {
  $.ajax({
    url: "/getInfo",
    type: "POST",
    data: `${dropDownMenu.value}`,
    dataType: "json",
    success: function (res) {
      let contentArr = res[Object.keys(res)][0];

      let co2Comment;
      let smogComment;
      if (
        parseInt(contentArr["CO2"]) >= 1 &&
        parseInt(contentArr["CO2"]) <= 3
      ) {
        co2Comment = "Poor";
      } else if (
        parseInt(contentArr["CO2"]) >= 4 &&
        parseInt(contentArr["CO2"]) <= 6
      ) {
        co2Comment = "Medium";
      } else {
        co2Comment = "Good";
      }
      if (
        parseInt(contentArr["Smog"]) >= 1 &&
        parseInt(contentArr["Smog"]) <= 3
      ) {
        smogComment = "Poor";
      } else if (
        parseInt(contentArr["Smog"]) >= 4 &&
        parseInt(contentArr["Smog"]) <= 6
      ) {
        smogComment = "Medium";
      } else {
        smogComment = "Good";
      }
      document.getElementById("addContent").style.display = "block";
      document.getElementById("addContent").innerHTML = `
         
          <strong> Model Name </strong> : ${contentArr["Models"]}<br>
          <strong> Vehicle Class</strong>: ${contentArr["Vehicle Class"]}<br>  <strong> Transmission</strong>: ${contentArr["Transmission"]}<br>
          <strong> Fuel Type</strong>:${contentArr["Fuel"]}<br> <strong> Average Fuel Consumption</strong>: ${contentArr["MyUnknownColumn_[0]"]}<br> 
          <strong> CO2 Emission</strong>: ${contentArr["CO2 Emissions"]}<br>  <strong>  CO2 Rating</strong>: ${contentArr["CO2"]}  (${co2Comment})<br>  <strong> Smog Rating</strong>: ${contentArr["Smog"]}  (${smogComment})<br>`;
    },
  });
});

//functionality added to faq
var ans = document.getElementsByClassName("question");
for (var i = 0; i < ans.length; i++) {
  ans[i].addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
