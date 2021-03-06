import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clickCounter: number = 0;
  name: string = '';
  htmlToAdd: string;
  numberOfEmployees: number = 0;
  constructor() { }
  isHQ: number = 0;
  companyKey: string;
  tableCode: string;
  keyStore = []
  storedKeyStore;

  ngOnInit() {
    if (localStorage.getItem("keyStore") != null) {
      this.storedKeyStore = JSON.parse(localStorage.getItem("keyStore"));
    }
    var tempKey = prompt("Please enter your company name", "Company Name");
    this.companyKey = tempKey.toLowerCase();
    if (this.companyKey == "headquarters"){
      this.HQDisplay();
      this.isHQ = 10;
    }else if (this.companyKey in localStorage){
    this.isHQ = 0;
    this.companyDisplay();
    }else {
      alert("Company does not exist, please create an entry or check if you spelt the name correctly")
    }
  }

companyDisplay(){
  var key = this.companyKey;
    let employList = JSON.parse(localStorage.getItem(key))
    let headers = ["Name", "Position", "Salary"];
  let tableCode: string = `
                                <thead>
                                  <tr>
                                    <th>Employee #</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Salary</th>
                                   </tr>
                                </thead>
                                <tbody>
                                `
    let tableEnd =`</tbody>`
    for (var i = 0; i < employList.length; i++) {
      var obj = employList[i];
      let oldTableCode = tableCode;
      let tableRowCode = `
        <tr>
          <td>`+i+`</td>
          <td>`+ obj.name +`</td>
          <td>`+ obj.position +`</td>
          <td>$`+ obj.salary +`</td>
        </tr>`;
      tableCode = oldTableCode + tableRowCode;
      this.numberOfEmployees++
    }
    this.htmlToAdd = tableCode + tableEnd; 
  }



  editHandlerCompany(cords){
    if (cords == 1){ //Edit
      var key = this.companyKey;
      var arrNumEmployees = this.numberOfEmployees - 1;
      let employList = JSON.parse(localStorage.getItem(key))
      var employeeNum = prompt("Please enter the number of the employee you whose like to edit", "0");
      var empName = employList[employeeNum].name
      var newSalary = prompt("Please enter the new salary for " + empName, "0");
      employList[employeeNum].salary = newSalary
      localStorage.setItem(key, JSON.stringify(employList));
    }
    if (cords == 2) { //Add
      var name = prompt("Please enter the name of the employee you are adding", "");
      var position = prompt("Please enter the position of the employee you would like to add", "");
      var salary = prompt("Please enter the new salary of the employee you would like to add", "0");
      var key = this.companyKey;
      var company = key
      let employList = JSON.parse(localStorage.getItem(key))
      var thirdArr = employList.concat({name,company,position,salary})
      localStorage.setItem(key, JSON.stringify(thirdArr));
    }
    if (cords == 3){//Delete
      var key = this.companyKey;
      let employList = JSON.parse(localStorage.getItem(key))
      var employeeNum = prompt("Please enter the number of the employee you would like to delete", "0");
      employList.splice(employeeNum, 1);
      localStorage.setItem(key, JSON.stringify(employList));
    }

  }

  HQDisplay(){
    var arib = []
    this.isHQ = 10;
    var storedKeyStore = JSON.parse(localStorage.getItem("keyStore"));
    this.htmlToAdd = storedKeyStore;
    if (localStorage.getItem("keyStore") != null) {
    for (let i = 0; i < storedKeyStore.length; i++) {
      var test = JSON.parse(localStorage.getItem(storedKeyStore[i]))
      for (let g = 0; g < test.length; g++){
        arib.push(test[g])
      }
    }
    let headers = ["Name", "Position", "Salary"];
    let tableCode: string = `<thead>
                                  <tr>
                                    <th>Company</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Salary</th>
                                   </tr>
                                </thead>
                                <tbody>
                                `
    let tableEnd = `</tbody>`
    for (var i = 0; i < arib.length; i++) {
      var obj = arib[i];
      let oldTableCode = tableCode;
      let tableRowCode = `
        <tr>
          <td><b>`+ obj.company + `</b></td>
          <td>`+ obj.name + `</td>
          <td>`+ obj.position + `</td>
          <td>$`+ obj.salary + `</td>
        </tr>`;
      tableCode = oldTableCode + tableRowCode;
      this.numberOfEmployees++
    }
    this.htmlToAdd = tableCode + tableEnd;
  }
  }

  editHandlerHQ(cords) {
    if (cords == 1) { //Edit -- create
      var newKey = prompt("Please enter the name of the new company", "");
      var name = prompt("Please enter the name of the first employee you are adding", "");
      var position = prompt("Please enter the position of the first employee you are adding", "");
      var salary = prompt("Please enter the new salary of the first employee you are adding", "0");
      var company = newKey
      var newCompanyArray = [{name,company,position,salary}];
      this.keyStore.push(newKey)
      localStorage.setItem(newKey, JSON.stringify(newCompanyArray));
      localStorage.setItem("keyStore", JSON.stringify(this.keyStore));
      var storedKeyStore = JSON.parse(localStorage.getItem("keyStore"));
      this.HQDisplay();
    }
      if (cords == 2) { //Add --edit a company
      var newKey = prompt("Please enter the name of the company you would like to edit", "");
      this.companyKey = newKey.toLowerCase();
      this.isHQ = 0;
      this.companyDisplay();
      alert(this.isHQ)
    }
    if (cords == 3) {//Delete
      var newKey = prompt("Please enter the name of the company you would like to delete", "");
      localStorage.removeItem(newKey);
      this.keyStore.splice(this.keyStore.indexOf(newKey), 1);
      localStorage.setItem("keyStore", JSON.stringify(this.keyStore));
    }

  }


}
